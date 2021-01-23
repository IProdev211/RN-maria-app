import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import styles from './styles';
import { CheckBox } from 'react-native-elements';
import shortid from 'shortid';
import golbalConstants from '../../Common/GlobalStyles/constants';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { duckOperations } from '../../../redux/Main/duck';

class DashBoardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedCityText: '東京',
      selectedCityNumber: 1,
      openModal: false,
    };
  }

  backButtonAction = () => {
    if (this.props.customNavigation) {
      this.props.customNavigation();
    } else {
      this.props.navigation.goBack();
    }
  };
  getUnreadNotification = () => {
    let number = this.props.allNotification ? this.props.allNotification.filter(x => x.status == 'unread') : [];
    return number.length;
  };

  render() {
    return (
      <View>
        <StatusBar
          backgroundColor={golbalConstants.statusBar}
          barStyle={golbalConstants.barStyle}
        />
        {this.props.headerOff ?
          null
          :
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              {this.props.title ?
                this.props.backNavigation ?
                  <TouchableOpacity onPress={() => this.backButtonAction()}>
                    <View style={styles.titleStyleContainer1}>
                      <Icon1 name="angle-left" size={35} color="#fff" />
                      <Text style={styles.titleStyleWithBack}>
                        {this.props.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  :
                  <View style={styles.titleStyleContainer}>
                    <Text style={styles.titleStyle}>{this.props.title}</Text>
                  </View>
                :
                this.props.SearchPage ?
                  <TouchableOpacity
                    style={styles.citySelector}
                    onPress={() => this.props.navigation.navigate('SearchFilter')}
                  >
                    <Text style={styles.citySelectorText}>キャストを検索</Text>
                    <View style={styles.citySelectorIcon}>
                      <Icon1
                        name="search"
                        size={20}
                        color={golbalConstants.secondaryColor}
                      />
                    </View>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    style={styles.citySelector}
                    onPress={() => this.setState({ openModal: !this.state.openModal })}
                  >
                    <Text style={styles.citySelectorText}>
                      {this.state.selectedCityText}
                    </Text>
                    <View style={styles.citySelectorIcon}>
                      <Icon1
                        name="angle-down"
                        size={25}
                        color={golbalConstants.secondaryColor}
                      />
                    </View>
                  </TouchableOpacity>
              }
              <View style={{ flexDirection: 'row' }}>
                {!this.props.notificationHide &&
                  <TouchableOpacity
                    style={styles.marginLeft20}
                    onPress={() => this.props.navigation.navigate('Notification')}
                  >
                    <Icon1 name="bell-o" size={25} color="#fff" />
                    {this.getUnreadNotification() > 0 &&
                      <Text style={styles.notificationNumber}>
                        {this.getUnreadNotification()}
                      </Text>
                    }
                  </TouchableOpacity>
                }
                {this.props.Refferal &&
                  <TouchableOpacity
                    style={styles.marginLeft20}
                    onPress={() => this.props.navigation.navigate('ReferralQrCodeView')}
                  >
                    <Icon1 name="qrcode" size={25} color="#fff" />
                  </TouchableOpacity>
                }
                {this.props.settingMenu &&
                  <TouchableOpacity
                    style={styles.marginLeft20}
                    onPress={() => this.props.navigation.navigate('Settings')}
                  >
                    <AntDesign name="setting" size={25} color="#fff" />
                  </TouchableOpacity>
                }
                {this.props.addTweet &&
                  <TouchableOpacity
                    style={styles.marginLeft20}
                    onPress={() => this.props.navigation.navigate('AddTweet')}
                  >
                    <Entypo name="feather" size={25} color="#fff" />
                  </TouchableOpacity>
                }
                {this.props.rightButton &&
                  <TouchableOpacity
                    style={styles.marginLeft20}
                    onPress={() => this.props.rightButtonAction()}
                  >
                    <Text style={styles.titleStyleWithBackRight}>{this.props.rightButton}</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
          </View>
        }

        {this.props.scrollingOff ?
          <View>{this.props.children}</View>
          :
          <ScrollView>{this.props.children}</ScrollView>
        }

        <Modal
          testID={'modal'}
          isVisible={this.state.openModal}
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          onBackdropPress={() => this.setState({ openModal: false })}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}>
          <View style={styles.content}>
            <View style={{ paddingVertical: 20 }}>
              <Text>下から都市を選択してください</Text>
            </View>
            <ScrollView>
              <TouchableHighlight>
                <TouchableWithoutFeedback>
                  <View style={styles.conatinerModal}>
                    {this.props.allCity.map(x => (
                      <CheckBox
                        key={shortid.generate()}
                        title={x.city_name}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={
                          this.state.selectedCityNumber == x.id ? 1 : 0
                        }
                        style={styles.NonSelected}
                        onPress={() => {
                          this.props.locationPicker(x.id);
                          this.setState({
                            selectedCityText: x.city_name,
                            selectedCityNumber: x.id,
                          });
                        }}
                      />
                    )
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </TouchableHighlight>
            </ScrollView>
            <View style={{ justifyContent: 'flex-end' }}>
              <TouchableWithoutFeedback
                onPress={() => this.setState({ openModal: false })}>
                <View style={styles.okButton}>
                  <Text>オーケー</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    allNotification: state.mainReducers.main.allNotification,
    allCity: state.mainReducers.main.allCity
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(duckOperations, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashBoardHeader);
