import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderAfterLogin from '../../../components/DashBoardHeader';
import styles from './styles';
import {GoogleSignin} from '@react-native-community/google-signin';
import CustomCard from '../../../components/CustomCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {default as MetarialIcon} from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  getUserDetails,
  GetPostHourlyRate,
  getDepositeAndCouponBalance,
  WithdrawResquest,
} from '../../../../services/AuthService';
import Modal from 'react-native-modal';
import golbalConstants from '../../../Common/GlobalStyles/constants';

//redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {duckOperations} from '../../../../redux/Main/duck';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userInfo: null,
      profileImage: null,
      userName: '',
      isVisible: false,
      hourlyRate: '',
      hourlyRateget: null,
      cardBalance: null,
      couponBalance: null,
      WithdrawMoney: false,
      bankName: '',
      bankBranch: '',
      bankAccount: '',
      withdrawBlance: '',
      loading: false,
    };
    this.getUserInformation = this.getUserInformation.bind(this);
  }
  componentDidMount() {
    this.getUserInformation();
    this.getUserHR();
    this.depositeAndCouponBalance();
  }
  componentDidUpdate() {
    // this.getUserInformation();
  }
  componentWillUnmount() {
    // this.getUserInformation();
  }
  getUserInformation = async () => {
    let user = this.props.userInfo;
    let profileImage = user.is_profile_pic
      ? user.is_profile_pic
      : user.usr_profile_photo[0].picture_url;
    this.setState({
      userInfo: user,
      userName: user.usr_nickname,
      profileImage,
    });
    console.log(user);
  };
  LogingOut = async () => {
    Alert.alert(
      'ログアウト',
      '本当にログアウトしますか？',
      [
        {text: 'はい', onPress: () => this.loggingOutDataRemove()},
        {
          text: 'キャンセル',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  loggingOutDataRemove = async () => {
    this.setState({loading: true});
    try {
      const response = await AsyncStorage.clear();
      if (this.props.signInMethodType === 'google') {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      setTimeout(x => {
        this.setState({loading: false});
        this.props.navigation.navigate('Registration');
      }, 4000);
    } catch (error) {
      console.log(error);
      this.setState({loading: false});
    }
  };

  postHourlyRate = async () => {
    try {
      const data = {usr_hourly_rate: this.state.hourlyRate};
      console.log(data, 'hourly rate data');
      const response = await GetPostHourlyRate(data);
      this.setState({isVisible: false});
      this.getUserHR();
    } catch (ex) {}
  };

  getUserHR = async () => {
    try {
      const response = await getUserDetails();
      console.log(response, 'Response');
      if (response.result.success) {
        this.setState({hourlyRateget: response.result.success.usr_hourly_rate});
      }
    } catch (ex) {}
  };

  //need to fix deposite api
  depositeAndCouponBalance = async () => {
    const response = await getDepositeAndCouponBalance();
    let deposite = response.result.deposit_balance;
    // this.setState({
    //   cardBalance: deposite.card_balance ? deposite.card_balance : 0,
    //   couponBalance: deposite.coupon_balance ? deposite.coupon_balance : 0,
    // });
  };
  WithdrawMoney = () => {
    if (this.props.userInfo.points < 10000) {
      Alert.alert(
        '警告',
        '残高が不足しています。 ポイントを追加してください。',
        [{text: 'オーケー', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      this.setState({
        WithdrawMoney: true,
        withdrawBlance: this.props.userInfo.points.toString(),
      });
    }
  };
  withdrawBlance = async () => {
    if (this.state.withdrawBlance < 10000) {
      Alert.alert(
        '警告',
        '最少10000まで出金できますので、出金額を増やしてください。',
        [{text: 'オーケー', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      return;
    }
    if (
      !this.state.bankName ||
      !this.state.bankBranch ||
      !this.state.bankAccount
    ) {
      Alert.alert(
        '警告',
        'このすべてのフィールドは必須です。銀行名、銀行支店、銀行口座に入力する必要があります。',
        [{text: 'オーケー', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      return;
    } else {
      this.setState({WithdrawMoney: false});
      let data = {
        amount: this.state.withdrawBlance,
        account_name: this.state.bankBranch,
        account_number: this.state.bankAccount,
        bank_name: this.state.bankName,
      };
      try {
        const response = await WithdrawResquest(data);
        if (response.isSuccess) {
          Alert.alert(
            '成功',
            'リクエストが正常に追加されました。確認をお待ちください。',
            [{text: 'オーケー', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
      } catch {}
    }
  };

  render() {
    console.log('User Info', this.state.hourlyRateget);
    const {userInfo, isVisible} = this.state;
    return (
      <HeaderAfterLogin
        title="マイページ"
        navigation={this.props.navigation}
        NotificationHide={false}
        Refferal={true}
        settingMenu={true}>
        <View style={{backgroundColor: '#FEF6E1'}}>
          <View style={styles.ProfileContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('UserDataUpdate')}>
              {this.state.profileImage ? (
                <Image
                  style={styles.profilePicImage}
                  source={{
                    uri: this.props.userInfo.is_profile_pic
                      ? this.props.userInfo.is_profile_pic
                      : this.state.profileImage,
                  }}
                />
              ) : (
                <Image
                  style={styles.profilePicImage}
                  source={require('../../../../assets/panda.png')}
                />
              )}

              <View style={styles.editIcon}>
                <Icon name="pencil" size={18} color="#fff" />
              </View>
            </TouchableOpacity>

            <Text style={styles.UserNameText}>{this.state.userName}</Text>
          </View>

          {userInfo && Number(userInfo.usr_type) === 1 ? (
            <View>
              <View style={styles.coinContainerTop}>
                <TouchableOpacity
                  style={styles.topOptionsContainer}
                  onPress={() => {
                    this.props.navigation.navigate('Message');
                  }}>
                  <View style={styles.topOptions}>
                    <MetarialIcon name="email-outline" size={50} color="#fff" />
                  </View>
                  <Text style={styles.topOptionsText}>メッセージ</Text>
                </TouchableOpacity>
                <View style={styles.topOptionsContainer}>
                  <View style={styles.topOptions}>
                    <MetarialIcon
                      onPress={() => this.WithdrawMoney()}
                      name="bank"
                      size={48}
                      color="#fff"
                    />
                  </View>
                  <Text style={styles.topOptionsText}>ポイント残高</Text>
                </View>
                {/* <View style={styles.topOptionsContainer}>
                  <View style={styles.topOptions}>
                    <MetarialIcon
                      onPress={() => {
                        this.props.navigation.navigate('UserCoupon');
                      }}
                      name="ticket"
                      size={50}
                      color="#fff"
                    />
                  </View>
                  <Text style={styles.topOptionsText}>クーポン残高</Text>
                </View> */}
              </View>
              <View style={(styles.profileData, {width: '100%'})}>
                <View style={styles.pointContainter}>
                  <View style={styles.pointColumn}>
                    <Text style={{marginBottom: 10, textAlign: 'center'}}>
                      時給
                    </Text>
                    <Text style={styles.pointColumnHeaderNumber}>
                      {this.state.hourlyRateget ? this.state.hourlyRateget : 0}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({isVisible: true});
                      }}>
                      <Text style={styles.addButtonPoints}>
                        編集{'  '}
                        <Icon
                          name="edit"
                          size={15}
                          color={golbalConstants.mainColor}
                        />
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.pointColumn}>
                    <Text style={{marginBottom: 10, textAlign: 'center'}}>
                      {' '}
                      ポイント{' '}
                    </Text>
                    <Text style={styles.pointColumnHeaderNumber}>
                      {this.props.userInfo ? this.props.userInfo.points : 0}
                    </Text>
                    <TouchableOpacity onPress={() => this.WithdrawMoney()}>
                      <Text style={styles.addButtonPoints}>
                        撤退{'  '}
                        <Icon
                          name="money"
                          size={15}
                          color={golbalConstants.mainColor}
                        />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.coinContainerTop}>
                <TouchableOpacity
                  style={styles.topOptionsContainer}
                  onPress={() => {
                    this.props.navigation.navigate('Message');
                  }}>
                  <View style={styles.topOptions}>
                    <MetarialIcon name="email-outline" size={30} color="#fff" />
                  </View>
                  <Text style={styles.topOptionsText}>メッセージ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.topOptionsContainer}
                  onPress={() =>
                    this.props.navigation.navigate('UserDeposite')
                  }>
                  <View style={styles.topOptions}>
                    <MetarialIcon
                      name="credit-card-plus"
                      size={30}
                      color="#fff"
                    />
                  </View>
                  <Text style={styles.topOptionsText}>ポイントを追加</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.pointContainter}>
                <View style={styles.pointColumn}>
                  <Text style={{marginBottom: 10, textAlign: 'center'}}>
                    {' '}
                    ポイント{' '}
                  </Text>
                  <Text style={styles.pointColumnHeaderNumber}>
                    {this.props.userInfo ? this.props.userInfo.points : 0}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('UserDeposite')
                    }>
                    <Text style={styles.addButtonPoints}>
                      Add{' '}
                      <Icon
                        name="money"
                        size={15}
                        color={golbalConstants.mainColor}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: '#aaa',
                  }}>
                  <View
                    style={{
                      ...styles.balanceSection,
                      borderRightColor: '#aaa',
                      borderRightWidth: 1,
                      width: '100%',
                    }}>
                    <Text style={{ marginBottom: 10, textAlign: 'center' }}>
                      時給
                  </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 25,
                      }}>
                      {this.state.hourlyRateget ? this.state.hourlyRateget : 0}
                    </Text>
                    <Text
                      onPress={() => {
                        this.setState({ isVisible: true });
                      }}
                      style={{
                        marginTop: 10,
                        color: golbalConstants.mainColor,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      Edit <Icon name="edit" size={15} color={golbalConstants.mainColor} />
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.balanceSection,
                      borderRightColor: '#aaa',
                      borderRightWidth: 1,
                      width: '100%',
                    }}>
                    <Text style={{ marginBottom: 10, textAlign: 'center' }}>
                      時給
                  </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 25,
                      }}>
                      {this.state.hourlyRateget ? this.state.hourlyRateget : 0}
                    </Text>
                    <Text
                      onPress={() => {
                        this.setState({ isVisible: true });
                      }}
                      style={{
                        marginTop: 10,
                        color: golbalConstants.mainColor,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      Edit <Icon name="edit" size={15} color={golbalConstants.mainColor} />
                    </Text>
                  </View>
                </View> */}
              <Modal
                onBackdropPress={() => this.setState({isVisible: false})}
                isVisible={isVisible}>
                <View style={styles.hourlyRate}>
                  <Text
                    style={{
                      marginBottom: 25,
                      fontSize: 25,
                      fontWeight: 'bold',
                      color: golbalConstants.mainColor,
                    }}>
                    時給を更新する
                  </Text>
                  <TextInput
                    style={styles.comments}
                    placeholder="時給を入力してください..."
                    onChangeText={text => {
                      this.setState({hourlyRate: text});
                    }}
                  />
                  <View style={styles.optionHolder}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        this.setState({isVisible: false});
                      }}>
                      <View style={styles.options}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#941700',
                          }}>
                          キャンセル
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.postHourlyRate}>
                      <View
                        style={{
                          ...styles.options,
                          marginLeft: 10,
                          backgroundColor: golbalConstants.mainColor,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold',
                          }}>
                          新しいレートを送信
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </Modal>
            </View>
          )}
        </View>
        <View style={{marginTop: -10, paddingBottom: 50}}>
          <CustomCard>
            <TouchableOpacity
              style={[styles.SpaceBetweenContainer, {borderBottomWidth: 0.5}]}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="wpforms" size={25} color="#000" />
                <Text style={styles.OnClikText}>ポイント履歴</Text>
              </View>
              <Icon name="angle-right" size={25} color="#000" />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => this.props.navigation.navigate('UserReview')}
              style={[styles.SpaceBetweenContainer, {borderBottomWidth: 0.5}]}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="comment-o" size={25} color="#000" />
                <Text style={styles.OnClikText}>ユーザーレビュー</Text>
              </View>
              <Icon name="angle-right" size={25} color="#000" />
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => this.props.navigation.navigate('UserDeposite')}
              style={[styles.SpaceBetweenContainer, { borderBottomWidth: 0.5 }]}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="question-circle-o" size={25} color="#000" />
                <Text style={styles.OnClikText}>Add Points</Text>
              </View>
              <Icon name="angle-right" size={25} color="#000" />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Helps')}
              style={[styles.SpaceBetweenContainer, {borderBottomWidth: 0.5}]}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="question-circle-o" size={25} color="#000" />
                <Text style={styles.OnClikText}>ヘルプ</Text>
              </View>
              <Icon name="angle-right" size={25} color="#000" />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ReferralQrCode')}
              style={[styles.SpaceBetweenContainer, {borderBottomWidth: 0.5}]}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="share-alt" size={25} color="#000" />
                <Text style={styles.OnClikText}>アフィリエイト追加</Text>
              </View>
              <Icon name="angle-right" size={25} color="#000" />
            </TouchableOpacity> */}
          </CustomCard>
          <View style={{marginTop: 30, backgroundColor: '#fff'}}>
            <TouchableOpacity
              style={styles.SpaceBetweenContainer}
              onPress={() => this.LogingOut()}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="sign-out" size={25} color="#000" />
                <Text style={styles.OnClikText}>ログアウト</Text>
              </View>
              <Icon name="angle-right" size={25} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={{paddingBottom: 100}} />
        </View>
        <Modal
          onBackdropPress={() => this.setState({WithdrawMoney: false})}
          isVisible={this.state.WithdrawMoney}>
          <View style={styles.withdrawMonent}>
            <Text style={styles.withdrawMonentTitle}>出金のリクエスト</Text>
            <TextInput
              style={styles.withdrawMonentInput}
              placeholder="銀行名"
              onChangeText={text => {
                this.setState({bankName: text});
              }}
            />
            <TextInput
              style={styles.withdrawMonentInput}
              placeholder="銀行支店名"
              onChangeText={text => {
                this.setState({bankBranch: text});
              }}
            />
            <TextInput
              style={styles.withdrawMonentInput}
              placeholder="銀行口座番号"
              onChangeText={text => {
                this.setState({bankAccount: text});
              }}
            />
            <TextInput
              style={styles.withdrawMonentInput}
              placeholder="残高を引き出す"
              value={this.state.withdrawBlance}
              onChangeText={text => {
                this.setState({withdrawBlance: text});
              }}
            />
            <View style={styles.optionHolder}>
              <TouchableWithoutFeedback
                onPress={() => this.setState({WithdrawMoney: false})}>
                <View style={styles.withdrawMonentButton}>
                  <Text>キャンセル</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.withdrawBlance()}>
                <View style={[styles.options, styles.withdrawMonentButtonMain]}>
                  <Text style={styles.withdrawMonentButtonColor}>
                    出金リクエスト
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>
        <Spinner
          visible={this.state.loading}
          textContent={'読み込み中...。'}
          textStyle={styles.spinnerTextStyle}
        />
      </HeaderAfterLogin>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    userInfo: state.mainReducers.main.userInfo,
    signInMethodType: state.mainReducers.main.signInMethodType,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(duckOperations, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);
