import React, { Component } from 'react';
import { View, Text, TextInput, SafeAreaView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { CreditCardInput } from 'react-native-credit-card-input';
import { showMessage } from 'react-native-flash-message';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  getUserDetails,
  getDepositeAll,
  PostDeposite,
  orderPointsToBuy,
  confirmOrderPayment,
  createOrderInGmo,
  paymentOrderInGmo,
} from '../../../../services/AuthService';
import DashBoardHeader from '../../../components/DashBoardHeader';
import { returnErrorMessage } from '../../../Common/utilies/error_codes';
import styles from './style';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { duckOperations } from '../../../../redux/Main/duck';


class UserDeposite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['日付', 'デポジットポイント'],
      tableData: [],
      cardNumber: '',
      cardName: '',
      amount: '',
      pointsAmount: '',
      orderAmount: null,
      loading: false,
      buyingStage: 0,
      cardInfo: null,
      AccessID: null,
      AccessPass: null,
      OrderId: null,
    };
  }

  componentDidMount() {
    this.getAllDeposite();
  }

  getAllDeposite = async () => {
    let arr = [];
    var data = await getDepositeAll();
    console.log(data, 37);
    if (data.result.deposit_card_list.length > 0) {
      data.result.deposit_card_list.forEach(item => {
        console.log(item);
        arr = [
          ...arr,
          [item.deposit_time, item.point ? item.point.toString() : 0],
        ];
      });
      console.log(arr, 'table data');
      this.setState({ tableData: arr });
    }
  };

  onChangeHandler = (val, name) => {
    this.setState({ [name]: val });
  };
  onSubmit = async () => {
    const { cardNumber, cardName, amount } = this.state;
    const data = {
      deposit_amount: amount,
      depositor_card_name: cardName,
      depositor_card_number: cardNumber,
    };
    this.setState({ amount: '', cardName: '', cardNumber: '' });
    const res = await PostDeposite(data);
    console.log(res, 'response from deposite');
  };

  orderPoints = async () => {
    if (this.state.pointsAmount.length !== 0) {
      let data = {
        points: this.state.pointsAmount,
      };
      this.setState({ loading: true });
      try {
        const response = await orderPointsToBuy(data);
        if (response.isSuccess) {
          this.creatOrderInGMO(response.result[0]);
        }
      } catch {
        this.setState({ loading: false });
      }
    }
  };

  creatOrderInGMO = async order => {
    let data = {
      // ShopID: 'tshop00046068',
      // ShopPass: 'ra6kgbu1',
      ShopID: '9200002623974',
      ShopPass: 'sw9hz7sy',
      SiteID: 'mst2000023566',
      SitePass: '2y6rybnn',
      OrderID: order.order_id,
      JobCd: 'CAPTURE',
      Amount: Math.ceil(order.amount),
    };
    try {
      const response = await createOrderInGmo(data);
      if (response.isSuccess) {
        let result = response.result;
        if (result.ErrInfo && result.ErrCode) {
          showMessage({
            message: returnErrorMessage(result.ErrInfo),
            type: 'error',
          });
          this.setState({ loading: false });
        } else {
          this.setState({
            loading: false,
            buyingStage: 1,
            orderAmount: Math.ceil(order.amount),
            AccessID: result.AccessID,
            AccessPass: result.AccessPass,
            OrderId: order.order_id,
          });
        }
      }
    } catch {
      showMessage({
        message: 'Network error',
        type: 'error',
      });
      this.setState({ loading: false });
    }
  };

  _onChange = form => this.setState({ cardInfo: form });

  makePayment = async () => {
    if (!this.state.cardInfo || !this.state.cardInfo.valid) {
      if (this.state.cardInfo == null) {
        showMessage({
          message: 'カード情報が正しくない',
          type: 'error',
        });
      } else if (this.state.cardInfo.status.number != 'valid') {
        showMessage({
          message: 'カード番号が無効です',
          type: 'error',
        });
      }
    } else {
      let data = {
        AccessID: this.state.AccessID,
        AccessPass: this.state.AccessPass,
        OrderID: this.state.OrderId,
        Method: '1',
        CardNo: this.removeStringSpace(this.state.cardInfo.values.number),
        Expire: this.expiryDateFormat(this.state.cardInfo.values.expiry),
        HttpAccept: '*/*',
        HttpUserAgent: 'Maria App Client',
      };
      this.setState({ loading: true });
      try {
        const response = await paymentOrderInGmo(data);
        if (response.isSuccess) {
          let result = response.result;
          if (result.ErrInfo && result.ErrCode) {
            showMessage({
              message: returnErrorMessage(result.ErrInfo),
              type: 'error',
            });
            this.setState({ loading: false });
          } else {
            if (result.Approve) {
              let info = {
                order_id: this.state.OrderId,
                approve: result.Approve,
                transection_id: result.TranID,
                transection_date: result.TranDate,
                check_string: result.CheckString,
                coupon: false,
                status: true,
              };
              try {
                const response = await confirmOrderPayment(info);
                if (response.isSuccess) {
                  this.getUserInfo();
                }
                this.setState({ loading: false, buyingStage: 3 });
              } catch {
                this.setState({ loading: false });
              }
            } else {
              showMessage({
                message: "支払いが承認されていません。カード情報をご確認ください。",
                type: 'error',
              });
              this.setState({ loading: false });
            }
          }
        }
      } catch {
        showMessage({
          message: 'Network error',
          type: 'error',
        });
        this.setState({ loading: false });
      }
    }
  };

  removeStringSpace = string => {
    return string.replace(/\s/g, '');
  };

  expiryDateFormat = string => {
    let dataArray = string.split('/');
    return dataArray[1] + dataArray[0];
  };

  getUserInfo = async () => {
    try {
      const response = await getUserDetails();
      if (response.isSuccess) {
        this.props.addUserInfo(response.result.success);
        this.forceUpdate();
      }
    } catch { }
  };
  render() {
    return (
      <SafeAreaView>
        <DashBoardHeader
          navigation={this.props.navigation}
          backNavigation={true}
          title={'お支払い情報の登録'}
        >
          <View style={styles.mainContainer}>
            {this.state.buyingStage == 0 &&
              <View>
                <Text style={styles.PointsInputText}>
                  購入したいポイント数を入力してください。
              </Text>
                <Text style={styles.PointsInputText}>
                  クレジットカードのみ登録したい場合には０を入力してください。
              </Text>
                <TextInput
                  style={styles.cardNumber}
                  placeholder="ポイント"
                  onChangeText={text => this.setState({ pointsAmount: text })}
                  value={this.state.pointsAmount}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.pointCalculation}
                  onPress={() => this.orderPoints()}>
                  <Text style={styles.pointCalculationText}> ポイントを購入</Text>
                </TouchableOpacity>
              </View>
            }
            {this.state.buyingStage == 1 &&
              <View>
                <Text style={styles.PointsInputText}>
                  ポイントの購入リクエストが承認されました。
                {this.state.pointsAmount}ポイントは{this.state.orderAmount}¥です。
              </Text>
                <TouchableOpacity
                  style={styles.pointCalculation}
                  onPress={() => this.setState({ buyingStage: 2 })}
                >
                  <Text style={styles.pointCalculationText}>
                    購入を確認します
                </Text>
                </TouchableOpacity>
              </View>
            }
            {this.state.buyingStage == 2 &&
              <View>
                <Text style={styles.PointsInputText}>
                  支払いを行うには、すべてのクレジットカード情報を入力してください。
              </Text>
                <View style={{ padding: 20 }}>
                  <CreditCardInput requiresName onChange={this._onChange} />
                </View>
                <TouchableOpacity
                  style={styles.pointCalculation}
                  onPress={() => this.makePayment()}
                >
                  <Text style={styles.pointCalculationText}>支払</Text>
                </TouchableOpacity>
              </View>
            }
            {this.state.buyingStage == 3 &&
              <View>
                <Text style={styles.PointsInputText}>
                  {this.state.pointsAmount}
                ポイントの購入に成功しました。キャストゲストのMariaアプリをご利用いただき、ありがとうございます。
              </Text>
                {/* <View style={{ padding: 20 }}>
                  <CreditCardInput onChange={this._onChange} />
                </View> */}
                <TouchableOpacity
                  style={styles.pointCalculation}
                  onPress={() => this.props.navigation.goBack()}>
                  <Text style={styles.pointCalculationText}>支払う</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
          {/* <View style={{padding: 25, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginRight: 15}}>
              <Text style={{marginBottom: 5}}>預金者カード名</Text>
              <TextInput
                style={styles.horizontalTextField}
                placeholder="カード名"
                onChangeText={text => {
                  this.onChangeHandler(text, 'cardName');
                }}
                value={this.state.cardName}
              />
            </View>
            <View>
              <Text style={{marginBottom: 5}}>入金額</Text>
              <TextInput
                style={styles.horizontalTextField}
                placeholder="入金額"
                onChangeText={text => {
                  this.onChangeHandler(text, 'amount');
                }}
                value={this.state.amount}
              />
            </View>
          </View>
          <View>
            <Text style={{marginLeft: 30, marginBottom: 10}}>
              デポジットカード番号
            </Text>
            <TextInput
              style={styles.cardNumber}
              placeholder="カード番号"
              onChangeText={text => {
                this.onChangeHandler(text, 'cardNumber');
              }}
              value={this.state.cardNumber}
            />
          </View>
          <View style={{marginLeft: 30, marginTop: 20}}>
            <Text>*支払いにはGMO PAYMENTサービスを使用します</Text>
          </View>
          <View style={styles.optionHolder}>
            <TouchableOpacity
              style={{
                ...styles.options,
                backgroundColor: '#F3B91D',
              }}>
              <View>
                <Text
                  onPress={this.onSubmit}
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  たす
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{margin: 20}}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row
                data={this.state.tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows data={this.state.tableData} textStyle={styles.text} />
            </Table>
          </View> */}
          <Spinner
            visible={this.state.loading}
            textContent={'注文処理'}
            textStyle={styles.spinnerTextStyle}
          />
        </DashBoardHeader>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    userInfo: state.mainReducers.main.userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(duckOperations, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDeposite);
