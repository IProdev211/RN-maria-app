import React, { Component } from 'react';
import { View, Text, TextInput, SafeAreaView } from 'react-native';
import { postCoupon, getDepositeAll } from '../../../../services/AuthService';
import { Table, Row, Rows } from 'react-native-table-component';
import DashBoardHeader from '../../../components/DashBoardHeader';
import styles from './styles';

//redux
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

class UserCoupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Date', 'Coupon Code'],
      tableData: [],
      CouponValue: '',
    };
  }

  componentDidMount() {
    this.getAllDeposite();
  }

  getAllDeposite = async () => {
    let arr = [];
    var data = await getDepositeAll();
    if (data.result.deposit_coupon_list.length > 0) {
      data.result.deposit_coupon_list.forEach(data => {
        arr = [
          ...arr,
          [
            data.deposit_time,
            data.coupon_code ? data.coupon_code.toString() : 0,
          ],
        ];
      });
      this.setState({ tableData: arr });
    }
  };

  onChangeHandler = (val, name) => {
    this.setState({ [name]: val });
  };
  onSubmit = async () => {
    const data = { coupon_code: this.state.CouponValue };
    this.setState({ CouponValue: '' });
    const res = await postCoupon(data);
  };

  render() {
    return (
      <SafeAreaView>
        <DashBoardHeader
          navigation={this.props.navigation}
          backNavigation={true}
          title={'Coupon'}
        >
          <View>
            <View style={{ padding: 20, marginBottom: 0 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 10 }}>
                Coupon Code
              </Text>
              <TextInput
                style={{ backgroundColor: '#fffafa', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, fontSize: 16 }}
                placeholder="Card Name"
                onChangeText={text => this.onChangeHandler(text, 'CouponValue')}
                value={this.state.CouponValue}
              />
            </View>
            <View>
              <View style={styles.optionHolder}>
                <TouchableOpacity style={{ ...styles.options, marginLeft: 10, backgroundColor: '#F3B91D' }}>
                  <View>
                    <Text
                      onPress={this.onSubmit}
                      style={{ textAlign: 'center', color: 'white', fontSize: 15, fontWeight: 'bold' }}
                    >
                      Add Coupon
                  </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ margin: 26 }}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
              <Row
                data={this.state.tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows data={this.state.tableData} textStyle={styles.text} />
            </Table>
          </View>
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

export default connect(
  mapStateToProps,
  null,
)(UserCoupon);
