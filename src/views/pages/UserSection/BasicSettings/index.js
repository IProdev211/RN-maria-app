import React, {Component} from 'react';
import {View, TextInput, TouchableWithoutFeedback, Text} from 'react-native';
import Modal from 'react-native-modal';
import {Divider, CheckBox, Button} from 'react-native-elements';
import HeaderAfterLogin from '../../../components/DashBoardHeader';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showMessage} from 'react-native-flash-message';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {updateBasicInfo} from '../../../../services/AuthService';
import {
  getAllBasicShow,
  getAllBasicInfo,
} from '../../../../services/AuthService';

class BasicSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '基本情報を更新する',
      field: null,
      basic_info: null,
      meta_data: null,
      modalView: false,
      ModalTitle: '',
      ModalData: null,
      target: '',
      height: '',
    };
  }
  componentDidMount() {
    this.getAllBasicInfo();
    this.getAllBasicInfoMeta();
  }
  componentDidUpdate() {}
  componentWillUnmount() {}
  changeOnText = () => {};
  getAllBasicInfo = async () => {
    try {
      const response = await getAllBasicShow();
      if (response.isSuccess) {
        let basic_info = response.result.success;
        this.setState({basic_info, height: basic_info.height});
      }
    } catch {}
  };
  getAllBasicInfoMeta = async () => {
    try {
      const response = await getAllBasicInfo();
      console.log(response);
      if (response.isSuccess) {
        let meta_data = response.result;
        this.setState({meta_data});
      }
    } catch {}
  };

  updateAllDataBasicSettings = async () => {
    console.log(this.state.basic_info);
    try {
      let response = await updateBasicInfo(this.state.basic_info);
      if (response.isSuccess) {
        this.setState({loading: false});
        console.log(response);
        this.props.navigation.push('UserDataUpdate');
        showMessage({
          message: '基本情報を更新しました',
          type: 'success',
        });
      } else {
        this.setState({loading: false});
        showMessage({
          message: '問題が発生しました。',
          type: 'error',
        });
      }
    } catch (errors) {
      console.log('profile Update error', errors);
      showMessage({
        message: 'インターネット接続を確認してください！',
        type: 'error',
      });
    }
  };
  getValue = param => {
    let value =
      this.state.basic_info && this.state.basic_info[param] != 0
        ? this.state.basic_info[param]
        : '定義されていません';
    return value;
  };
  closeModal = () => {
    let data = this.state.height;
    console.log(data);
    this.changeCheckedButton('height', this.state.height.toString());
    this.setState({modalView: false});
  };
  ischeckedMOdal = (field, item) => {
    if (this.state.basic_info[field] == item) {
      return true;
    } else {
      return false;
    }
  };
  changeCheckedButton = (field, item) => {
    let data = this.state.basic_info;
    data[field] = item;
    this.setState({basic_info: data});
  };
  showModalView = TARGET => {
    if (TARGET == 'annual_income') {
      this.setState({ModalTitle: '年収'});
    } else if (TARGET == 'educational_background') {
      this.setState({ModalTitle: '学歴'});
    } else if (TARGET == 'hair_color') {
      this.setState({ModalTitle: '髪の色'});
    } else if (TARGET == 'hair_style') {
      this.setState({ModalTitle: '髪型'});
    } else if (TARGET == 'height') {
      this.setState({ModalTitle: '身長'});
    } else if (TARGET == 'location') {
      this.setState({ModalTitle: 'ロケーション'});
    } else if (TARGET == 'place_of_birth') {
      this.setState({ModalTitle: '出生地'});
    } else if (TARGET == 'sake_drink') {
      this.setState({ModalTitle: '日本酒'});
    } else if (TARGET == 'smoking') {
      this.setState({ModalTitle: '喫煙'});
    } else if (TARGET == 'work') {
      this.setState({ModalTitle: '職業'});
    }
    this.setState({modalView: true});
    this.setState({
      ModalData: this.state.meta_data ? this.state.meta_data[TARGET] : null,
      target: TARGET,
    });
    console.log(this.state.meta_data[TARGET]);
  };
  changeHeight = height => {
    this.setState({height});
  };
  render() {
    return (
      <HeaderAfterLogin
        title={this.state.title}
        navigation={this.props.navigation}
        notificationHide={true}
        rightButton="更新"
        rightButtonAction={() => this.updateAllDataBasicSettings()}
        backNavigation={true}>
        <View style={{paddingBottom: 20}}>
          <View style={styles.subTextInfo}>
            <Text>今日のひとこと</Text>
          </View>
          <TouchableOpacity
            key={'hair'}
            style={styles.oNpressEvent}
            onPress={() => this.showModalView('height')}>
            <Text>身長</Text>
            <View style={styles.onPressEventRight}>
              <Text style={styles.onPressEventRightText}>
                {this.getValue('height')}
              </Text>
              <Icon name="angle-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            key={'annual Income'}
            style={styles.oNpressEvent}
            onPress={() => this.showModalView('location')}>
            <Text>居住地</Text>
            <View style={styles.onPressEventRight}>
              <Text style={styles.onPressEventRightText}>
                {this.getValue('location')}
              </Text>
              <Icon name="angle-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.oNpressEvent}
            onPress={() => this.showModalView('annual_income')}>
            <Text>年収</Text>
            <View style={styles.onPressEventRight}>
              <Text style={styles.onPressEventRightText}>
                {this.getValue('annual_income')}
              </Text>
              <Icon name="angle-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.oNpressEvent}
            onPress={() => this.showModalView('place_of_birth')}>
            <Text>出生地</Text>
            <View style={styles.onPressEventRight}>
              <Text style={styles.onPressEventRightText}>
                {this.getValue('place_of_birth')}
              </Text>
              <Icon name="angle-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.oNpressEvent}
            onPress={() => this.showModalView('educational_background')}>
            <Text>学歴</Text>
            <View style={styles.onPressEventRight}>
              <Text style={styles.onPressEventRightText}>
                {this.getValue('educational_background')}
              </Text>
              <Icon name="angle-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.oNpressEvent}
            onPress={() => this.showModalView('work')}>
            <Text>職業</Text>
            <View style={styles.onPressEventRight}>
              <Text style={styles.onPressEventRightText}>
                {this.getValue('work')}
              </Text>
              <Icon name="angle-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.oNpressEvent}
            onPress={() => this.showModalView('sake_drink')}>
            <Text>飲酒</Text>
            <View style={styles.onPressEventRight}>
              <Text style={styles.onPressEventRightText}>
                {this.getValue('sake_drink')}
              </Text>
              <Icon name="angle-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.oNpressEvent}
            onPress={() => this.showModalView('smoking')}>
            <Text>喫煙</Text>
            <View style={styles.onPressEventRight}>
              <Text style={styles.onPressEventRightText}>
                {this.getValue('smoking')}
              </Text>
              <Icon name="angle-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.oNpressEvent}
            onPress={() => this.showModalView('hair_style')}>
            <Text>髪型</Text>
            <View style={styles.onPressEventRight}>
              <Text style={styles.onPressEventRightText}>
                {this.getValue('hair_style')}
              </Text>
              <Icon name="angle-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.oNpressEvent}
            onPress={() => this.showModalView('hair_color')}>
            <Text>髪の色</Text>
            <View style={styles.onPressEventRight}>
              <Text style={styles.onPressEventRightText}>
                {this.getValue('hair_color')}
              </Text>
              <Icon name="angle-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <Modal testID={'modal'} isVisible={this.state.modalView}>
            <TouchableWithoutFeedback onPress={() => this.closeModal()}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.content}>
              <Text style={styles.contentTitle}>{this.state.ModalTitle}</Text>
              <Divider style={styles.DividerStyle} />
              {this.state.target == 'height' ? (
                <View>
                  <TextInput
                    keyboardType="numeric"
                    value={this.state.height}
                    onChangeText={environment => this.changeHeight(environment)}
                    placeholder={'身長'}
                    placeholderTextColor="#202020"
                    style={styles.input}
                    underlineColorAndroid="gray"
                  />
                  <Text style={styles.cmStyle}>cm</Text>
                </View>
              ) : this.state.ModalData ? (
                this.state.ModalData.map((x, index) => {
                  return (
                    <CheckBox
                      title={x.value}
                      key={index}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      checked={this.ischeckedMOdal(x.field_name, x.value)}
                      onPress={() =>
                        this.changeCheckedButton(x.field_name, x.value)
                      }
                    />
                  );
                })
              ) : null}

              <View style={{paddingTop: 20}} />
              <Button
                large
                rightIcon={{name: 'code'}}
                title="はい"
                onPress={() => this.closeModal()}
              />
            </View>
          </Modal>
        </View>
      </HeaderAfterLogin>
    );
  }
}

export default BasicSettings;
