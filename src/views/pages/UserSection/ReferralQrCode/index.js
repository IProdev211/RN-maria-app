import React, { Component } from 'react';
import { Text, Alert } from 'react-native';
import HeaderAfterLogin from '../../../components/DashBoardHeader';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { refferalUser } from '../../../../services/AuthService';
import Spinner from 'react-native-loading-spinner-overlay';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { duckOperations } from '../../../../redux/Main/duck';

import QRCodeScanner from 'react-native-qrcode-scanner';

class ReferralQrCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      profileImage: null,
      userName: '',
      loading: false,
    };
  }
  onSuccess = async e => {
    console.log(e);
    this.setState({ loading: true });
    try {
      let Apidata = {
        referral_by: e.data,
      };
      const response = await refferalUser(Apidata);
      if (response.isSuccess) {
        this.setState({ loading: false });
        this.refferalAddedNotic();
      }
    } catch { }
  };

  refferalAddedNotic = () => {
    Alert.alert(
      'Referral Added Successfully',
      'Your requested Referral has been added successfully. Both of you get reward option please check !',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.navigation.goBack();
          },
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    return (
      <HeaderAfterLogin
        title="紹介QRコードをスキャンする"
        navigation={this.props.navigation}
        notificationHide={true}
        backNavigation={true}
        settingMenu={true}>
        <QRCodeScanner
          onRead={this.onSuccess}
          // flashMode={QRCodeScanner.Constants.FlashMode.torch}
          topContent={
            <Text style={styles.centerText}>
              Please check add you Referral Qr Code
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText} />
            </TouchableOpacity>
          }
        />
        <Spinner
          visible={this.state.loading}
          textContent={'Adding Refferal...'}
          textStyle={styles.spinnerTextStyle}
        />
      </HeaderAfterLogin>
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
)(ReferralQrCode);
