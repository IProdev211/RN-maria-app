import React, {Component} from 'react';
import {View, TextInput, Image} from 'react-native';
import HeaderAfterLogin from '../../../components/DashBoardHeader';
import styles from './styles';
import {showMessage} from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import {updateUserInfo} from '../../../../services/AuthService';

class UserDataUpdateField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      field: null,
      usr_name: '',
      todays_message: '',
      self_introduction: '',
      loading: false,
      usr_nickname: '',
    };
  }
  componentDidMount() {
    this.setState({
      title: this.props.route.params.title,
      field: this.props.route.params.field,
      [this.props.route.params.field]: this.props.route.params.value,
    });
    console.log(this.props.route.params.field, this.props.route.params.value);
  }
  componentDidUpdate() {}
  componentWillUnmount() {}
  changeOnText = () => {};
  updateProfileInformation = async () => {
    this.setState({loading: true});
    try {
      let data = {
        [this.state.field]: this.state[this.state.field],
      };
      let response = await updateUserInfo(data);
      this.setState({loading: false});
      if (response.isSuccess) {
        this.setState({loading: false});
        console.log(response);
        this.props.navigation.push('UserDataUpdate');
        showMessage({
          message: '4桁のコードが携帯電話に送信されました。',
          type: 'success',
        });
      } else {
        this.setState({loading: false});
        showMessage({
          message: '問題が発生しました。電話番号を確認してください！',
          type: 'error',
        });
      }
    } catch (errors) {
      this.setState({loading: false});
      showMessage({
        message: 'インターネット接続を確認してください！',
        type: 'error',
      });
    }
  };
  render() {
    return (
      <HeaderAfterLogin
        title={this.state.title}
        navigation={this.props.navigation}
        notificationHide={true}
        rightButton="更新"
        rightButtonAction={() => this.updateProfileInformation()}
        backNavigation={true}>
        <View
          style={{
            backgroundColor: '#fff',
            paddingBottom: 20,
            paddingTop: 15,
          }}>
          {this.state.field == 'usr_nickname' ? (
            <TextInput
              style={styles.TextInputStyle}
              onChangeText={text => this.setState({usr_nickname: text})}
              value={this.state.usr_nickname}
              placeholder="ユーザー名を更新"
            />
          ) : null}
          {this.state.field == 'todays_message' ? (
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="今日の朝の状態を更新する"
              placeholderTextColor="grey"
              numberOfLines={4}
              multiline={true}
              onChangeText={text => this.setState({todays_message: text})}
              value={this.state.todays_message}
            />
          ) : null}
          {this.state.field == 'self_introduction' ? (
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="今日の朝の状態を更新する"
              placeholderTextColor="grey"
              numberOfLines={6}
              multiline={true}
              onChangeText={text => this.setState({self_introduction: text})}
              value={this.state.self_introduction}
            />
          ) : null}
        </View>
        <Spinner
          visible={this.state.loading}
          textContent={'保管中···'}
          textStyle={styles.spinnerTextStyle}
        />
      </HeaderAfterLogin>
    );
  }
}

export default UserDataUpdateField;
