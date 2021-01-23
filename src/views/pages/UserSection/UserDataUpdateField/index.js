import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import DashBoardHeader from '../../../components/DashBoardHeader';
import { updateUserInfo, getUserDetails } from '../../../../services/AuthService';
import styles from './styles';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { duckOperations } from '../../../../redux/Main/duck';

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
  }

  updateProfileInformation = async () => {
    this.setState({ loading: true });
    try {
      let data = {
        [this.state.field]: this.state[this.state.field],
      };
      let response = await updateUserInfo(data);
      this.setState({ loading: false });
      if (response.isSuccess) {
        let response = await getUserDetails();

        if (response.isSuccess) {
          let user = response.result.success;
          this.props.addUserInfo(user);
        }

        this.props.navigation.goBack();
        showMessage({
          message: '成功しました。',
          type: 'success',
        });
      } else {
        showMessage({
          message: '問題が発生しました。',
          type: 'error',
        });
      }
    } catch (errors) {
      this.setState({ loading: false });
      showMessage({
        message: 'インターネット接続を確認してください！',
        type: 'error',
      });
    }
  };

  render() {
    return (
      <DashBoardHeader
        title={this.state.title}
        navigation={this.props.navigation}
        notificationHide={true}
        rightButton="更新"
        rightButtonAction={() => this.updateProfileInformation()}
        backNavigation={true}
      >
        <View style={{ backgroundColor: '#fff', paddingBottom: 20, paddingTop: 15 }}>
          {this.state.field == 'usr_nickname' &&
            <TextInput
              style={styles.TextInputStyle}
              onChangeText={text => this.setState({ usr_nickname: text })}
              value={this.state.usr_nickname}
              placeholder="ニックネームを更新"
            />
          }
          {this.state.field == 'todays_message' &&
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="今日の朝の状態を更新"
              placeholderTextColor="grey"
              numberOfLines={4}
              multiline={true}
              onChangeText={text => this.setState({ todays_message: text })}
              value={this.state.todays_message}
            />
          }
          {this.state.field == 'self_introduction' &&
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="自己紹介を更新"
              placeholderTextColor="grey"
              numberOfLines={6}
              multiline={true}
              onChangeText={text => this.setState({ self_introduction: text })}
              value={this.state.self_introduction}
            />
          }
        </View>

        <Spinner
          visible={this.state.loading}
          textContent={'保管中···'}
          textStyle={styles.spinnerTextStyle}
        />
      </DashBoardHeader>
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
)(UserDataUpdateField);
