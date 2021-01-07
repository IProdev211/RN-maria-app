import React, {Component} from 'react';
import {View, Image, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderAfterLogin from '../../../components/DashBoardHeader';
import styles from './styles';
import CustomCardWithTitle from '../../../components/CustomCardWithTitle';
import CustomCard from '../../../components/CustomCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getUserDetails} from '../../../../services/AuthService';

//redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {duckOperations} from '../../../../redux/Main/duck';

import QRCodeScanner from 'react-native-qrcode-scanner';

class ReferralQrCodeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      profileImage: null,
      userName: '',
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };

  render() {
    return (
      <HeaderAfterLogin
        title="あなたの紹介コード"
        navigation={this.props.navigation}
        notificationHide={true}
        backNavigation={true}
        settingMenu={true}>
        <View style={styles.container}>
          <Image
            style={styles.qrImage}
            source={{
              uri: this.props.userInfo ? this.props.userInfo.qr_code : null,
            }}
          />
        </View>
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
)(ReferralQrCodeView);
