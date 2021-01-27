import React, { Component } from 'react';
import { View, TextInput, TouchableWithoutFeedback, Text, ScrollView, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import { Divider, CheckBox, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showMessage } from 'react-native-flash-message';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { getUserDetails, updateBasicInfo, getAllBasicInfo } from '../../../../services/AuthService';
import DashBoardHeader from '../../../components/DashBoardHeader';
import styles from './styles';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { duckOperations } from '../../../../redux/Main/duck';

const menus = [
  {
    text: '身長',
    target: 'height'
  },
  {
    text: '居住地',
    target: 'location'
  },
  {
    text: '年収',
    target: 'annual_income'
  },
  {
    text: '出生地',
    target: 'place_of_birth'
  },
  {
    text: '学歴',
    target: 'educational_background'
  },
  {
    text: '職業',
    target: 'work'
  },
  {
    text: '飲酒',
    target: 'sake_drink'
  },
  {
    text: '喫煙',
    target: 'smoking'
  },
  {
    text: '髪型',
    target: 'hair_style'
  },
  {
    text: '髪の色',
    target: 'hair_color'
  },
];

class BasicSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '詳細プロフィール',
      field: null,
      basic_info: null,
      meta_data: null,
      openModal: false,
      ModalTitle: '',
      ModalData: null,
      target: '',
      height: '0',
      loading: false
    };
  }

  componentDidMount() {
    this.getAllBasicInfoMeta();
    this.setState({ basic_info: this.props.userInfo.basic_info, height: this.props.userInfo.basic_info.height });
  }

  getAllBasicInfoMeta = async () => {
    try {
      const response = await getAllBasicInfo();
      if (response.isSuccess) {
        let meta_data = response.result;
        this.setState({ meta_data });
      }
    } catch { }
  };

  updateAllDataBasicSettings = async () => {
    this.setState({ loading: true });
    try {
      let response = await updateBasicInfo(this.state.basic_info);
      if (response.isSuccess) {
        let response = await getUserDetails();
        if (response.isSuccess) {
          this.props.addUserInfo(response.result.success);
        }

        this.props.navigation.goBack();
        showMessage({
          message: '基本情報を更新しました。',
          type: 'success',
        });
      } else {
        showMessage({
          message: '問題が発生しました。',
          type: 'error',
        });
      }
      this.setState({ loading: false });
    } catch (errors) {
      this.setState({ loading: false });
      showMessage({
        message: 'インターネット接続を確認してください！',
        type: 'error',
      });
    }
  };

  getValue = param => {
    return this.state.basic_info && this.state.basic_info[param] != 0 ? this.state.basic_info[param] : '定義されていません';
  };

  closeModal = () => {
    this.changeCheckedButton('height', this.state.height);
    this.setState({ openModal: false });
  };

  isCheckedModal = (field, item) => {
    if (this.state.basic_info[field] == item) {
      return true;
    } else {
      return false;
    }
  };

  changeCheckedButton = (field, item) => {
    let basic_info = this.state.basic_info;
    if (basic_info) {
      basic_info[field] = item;
      this.setState({ basic_info });
    }
  };

  showModalView = TARGET => {
    if (TARGET == 'annual_income') {
      this.setState({ ModalTitle: '年収' });
    } else if (TARGET == 'educational_background') {
      this.setState({ ModalTitle: '学歴' });
    } else if (TARGET == 'hair_color') {
      this.setState({ ModalTitle: '髪の色' });
    } else if (TARGET == 'hair_style') {
      this.setState({ ModalTitle: '髪型' });
    } else if (TARGET == 'height') {
      this.setState({ ModalTitle: '身長' });
    } else if (TARGET == 'location') {
      this.setState({ ModalTitle: '居住地' });
    } else if (TARGET == 'place_of_birth') {
      this.setState({ ModalTitle: '出生地' });
    } else if (TARGET == 'sake_drink') {
      this.setState({ ModalTitle: '日本酒' });
    } else if (TARGET == 'smoking') {
      this.setState({ ModalTitle: '喫煙' });
    } else if (TARGET == 'work') {
      this.setState({ ModalTitle: '職業' });
    }
    this.setState({
      ModalData: this.state.meta_data ? this.state.meta_data[TARGET] : null,
      target: TARGET,
    });
    this.setState({ openModal: true });
  };

  changeHeight = height => {
    this.setState({ height });
  };

  render() {
    return (
      <SafeAreaView>
        <DashBoardHeader
          title={this.state.title}
          navigation={this.props.navigation}
          notificationHide={true}
          rightButton="更新"
          rightButtonAction={() => this.updateAllDataBasicSettings()}
          backNavigation={true}
        >
          <View style={{ paddingBottom: 70 }}>
            <View style={styles.subTextInfo}>
              <Text>基本情報</Text>
            </View>

            {menus.map((menu, key) => (
              <TouchableOpacity
                key={key}
                style={styles.menuList}
                onPress={() => this.showModalView(menu.target)}
              >
                <Text>{menu.text}</Text>
                <View style={styles.onPressEventRight}>
                  <Text style={styles.onPressEventRightText}>
                    {this.getValue(menu.target)}
                  </Text>
                  <Icon name="angle-right" size={25} color="#000" />
                </View>
              </TouchableOpacity>
            ))}

            <View style={{ paddingBottom: 30 }} />
          </View>

          <Modal testID={'modal'} isVisible={this.state.openModal}>
            <TouchableWithoutFeedback onPress={() => this.closeModal()}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.content}>
              <Text style={styles.contentTitle}>{this.state.ModalTitle}</Text>
              <Divider style={styles.DividerStyle} />
              <ScrollView style={{ maxHeight: 200 }}>
                {this.state.target == 'height' ?
                  <View>
                    <TextInput
                      keyboardType="numeric"
                      value={this.state.height}
                      onChangeText={height => this.changeHeight(height)}
                      placeholder={'身長'}
                      placeholderTextColor="#202020"
                      style={styles.input}
                      underlineColorAndroid="gray"
                    />
                    <Text style={styles.cmStyle}>cm</Text>
                  </View>
                  :
                  this.state.ModalData && this.state.ModalData.map((x, index) => (
                    <CheckBox
                      key={index}
                      title={x.value}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      checked={this.isCheckedModal(x.field_name, x.value)}
                      onPress={() => this.changeCheckedButton(x.field_name, x.value)}
                    />
                  ))
                }
              </ScrollView>
              <View style={{ paddingTop: 20 }} />
              <Button
                large
                title="はい"
                onPress={() => this.closeModal()}
              />
            </View>
          </Modal>

          <Spinner
            visible={this.state.loading}
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
)(BasicSettings);
