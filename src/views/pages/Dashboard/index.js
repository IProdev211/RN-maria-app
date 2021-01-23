import React, { Component } from 'react';
import {
  View,
  Text,
  BackHandler,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  TouchableHighlight,
  Image,
} from 'react-native';
import shortid from 'shortid';
import Geolocation from '@react-native-community/geolocation';
import { showMessage } from 'react-native-flash-message';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TagSelect } from 'react-native-tag-select';
import Pusher from 'pusher-js/react-native';
import { Col, Grid } from 'react-native-easy-grid';
import DashBoardHeader from '../../components/DashBoardHeader';
import CustomCard from '../../components/CustomCard';
import SetpByStepProcess from '../../components/SetpByStepProcess';
import ProfileGirdElementOnlyImage from '../../components/profileGirdElementOnlyImage';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { duckOperations } from '../../../redux/Main/duck';

import {
  wantInterView,
  castGetInfoValue,
  getUserDetails,
  singleUserUpdatedMessage,
  GetAllUsersByLatLong,
  GetAllUsersByLocation,
  getNotification,
} from '../../../services/AuthService';

import ButtonCustom from '../../components/ButtonCustom';

import { sliderWidth, sliderItemWidth } from './styles';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      castTimeModale: false,
      locationSearch: false,
      openModalTitle: '',
      openModalData: [],
      selected_cast_type: '',
      TemCastData: {
        when_call: '',
        cast_location: '',
        people_per_cast: 2,
        cast_time: '',
        cast_type: '',
      },
      FinalCastData: {
        when_call: '',
        cast_location: '',
        people_per_cast: 2,
        cast_time: '',
        cast_type: '',
      },
      FinalCastDataValue: {
        when_call: '',
        cast_location: '',
        people_per_cast: 2,
        cast_time: '',
        cast_type: '',
      },
      selectedSate: null,
      SelectedcallTime: [],
      allUser: [],
      loading: false,
      modalStatus: false,
      selectedCity: {},
      changeSateModal: false,
      CastPackage: [
        {
          id: 1,
          package: 'スタンダード価格',
          price: '5000P / 30分',
        },
        {
          id: 2,
          package: 'VIP価格',
          price: '8000P / 30分',
        },
        {
          id: 3,
          package: 'ロイヤルVIP',
          price: '12000P / 30分',
        },
      ],
      selectedPackage: 2,
      showOtherAddCity: false,
      AddedCityName: '',
      defaultLocation: [
        {
          id: 1,
          name: '東京23区',
        },
        {
          id: 2,
          name: '名古屋市',
        },
        {
          id: 3,
          name: '大阪市',
        },
      ],
      callNotification: false,
      callerName: '',
      callerChannel: '',
      callId: null,
    };

    Pusher.logToConsole = true;

    this.pusher = new Pusher('5bd4d2b90613efca174f', {
      cluster: 'ap2',
      forceTLS: true,
    });
  }

  componentDidMount() {
    if (!this.state.locationSearch) {
      this.getUserInfo();
    }
    this.getCastInfoValue();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getAllUsers();
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getAllUsers = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = position;
        let data = {
          lat: initialPosition.coords.latitude,
          log: initialPosition.coords.longitude,
        };
        this.getGetAllUsersByLatLong(data);
      },
      error => console.log('Error', JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  getGetAllUsersByLatLong = async data => {
    const response = await GetAllUsersByLatLong(data);
    if (
      response.isSuccess &&
      (response.result.search_result &&
        response.result.search_result.length > 0)
    ) {
      this.setState({ allUser: response.result.search_result });
    }
  };

  getCastInfoValue = async () => {
    try {
      const response = await castGetInfoValue();
      if (response.isSuccess) {
        let castInfo = response.result.cast_all_info_values;
        let Value = {
          when_call: castInfo.when_call[0].value,
          cast_location: this.state.defaultLocation[0].name,
          people_per_cast: 2,
          cast_time: castInfo.cast_time[0].value,
          cast_type: '',
        };
        let data = {
          when_call: castInfo.when_call[0].value,
          cast_location: this.state.defaultLocation[0].name,
          people_per_cast: 2,
          cast_time: castInfo.cast_time[0].value,
          cast_type: '',
        };
        this.setState({
          FinalCastDataValue: Value,
          FinalCastData: data,
          TemCastData: data,
        });
        this.props.addNewCastInfo(castInfo);
      }
    } catch { }
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    if ((this.props.route, this.props.navigation.isFocused())) {
      Alert.alert(
        'アプリ終了',
        'アプリを本当に終了しますか？',
        [
          {
            text: 'キャンセル',
            style: 'cancel',
          },
          { text: 'はい', onPress: () => BackHandler.exitApp() },
        ],
      );
      return true;
    } else {
      return false;
    }
  };

  getUserInfo = async () => {
    try {
      const response = await getUserDetails();
      if (response.isSuccess) {
        this.props.addUserInfo(response.result.success);
        var channel = this.pusher.subscribe(
          `maria-channel_${response.result.success.id}`,
        );
        channel.bind('message', data => {
          let message = data.message;
          let to = message.me_id;
          let from = message.message_with;
          this.updateMessage(message.data, to, from);
          this.forceUpdate();
        });
        channel.bind('user-notification', data => {
          let notifications = data.notification.data;
          this.getAllNotification();
        });
        channel.bind('call', data => {
          console.log('call', data);
          this.setState({
            callNotification: true,
            callerName: data.message.user.usr_name,
            callId: data.message.user.userid,
            callerChannel: data.message.channel,
          });
        });
      }
    } catch { }
  };

  closeCallNotification = () => {
    this.setState({ callNotification: false });
  };
  openCallNotification = () => {
    this.setState({ callNotification: false });
    this.props.navigation.navigate('videoSession', {
      channel: this.state.callerChannel,
      type: 'guest',
      userId: this.state.callId,
    });
  };
  getAllNotification = async () => {
    const response = await getNotification();
    if (response.isSuccess) {
      this.props.allNotifications(response.result.notification_list);
      this.forceUpdate();
    }
  };

  updateMessage = async (message, to, from) => {
    try {
      const response = await singleUserUpdatedMessage(to);
      this.props.updateCurrentMessage(response.result.message);
    } catch { }
  };

  openModal = entityName => {
    this.getTitleOfModal(entityName);
    this.getDataOfMOdal(entityName);
    this.setState({
      selected_cast_type: entityName,
      modalStatus: true,
    });
  };

  changeStateValue = () => {
    this.setState({ changeSateModal: !this.state.changeSateModal });
  };

  UpdateStateValue = x => {
    this.setState({ selectedSate: x });
  };

  getDataOfMOdal = entityName => {
    let MainDat = this.props.castTypeInformations
      ? this.props.castTypeInformations
      : null;

    if (entityName == 'when_call') {
      this.setState({
        openModalData: MainDat.when_call,
      });
    } else if (entityName == 'cast_location') {
      this.setState({
        openModalData: MainDat.all_cast_location,
      });
    } else if (entityName == 'cast_time') {
      this.setState({
        openModalData: MainDat.cast_time,
      });
    } else if (entityName == 'cast_type') {
      this.setState({
        openModalData: MainDat.cast_type,
      });
    }
  };

  getTitleOfModal = entityName => {
    if (entityName == 'when_call') {
      this.setState({ openModalTitle: 'いつ呼びますか ?' });
    } else if (entityName == 'cast_location') {
      this.setState({ openModalTitle: '' });
    } else if (entityName == 'cast_time') {
      this.setState({ openModalTitle: '何時間呼びますか ?' });
    } else if (entityName == 'cast_type') {
      this.setState({ openModalTitle: 'キャストユーザータイプを選択' });
    } else if (entityName == 'people_per_cast') {
      this.setState({ openModalTitle: 'キャストの人数を決める。' });
    }
  };

  renderListComponent = ({ item }) => {
    let imageUrl = item.usr_profile_photo
      ? item.usr_profile_photo
        ? item.usr_profile_photo.picture_url
        : null
      : null;
    return (
      <TouchableWithoutFeedback onPress={() => this.gotoUserDetailsPage(item)}>
        <View style={{ height: 255 }}>
          <ProfileGirdElementOnlyImage
            userClass={item.user_class}
            name={item.usr_nickname}
            userData={item}
            imageURI={imageUrl}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  gotoUserDetailsPage = item => {
    this.props.navigation.navigate('UserDetails', { userData: item });
  };

  getSelectedStateStatus = x => {
    if (x == this.state.selectedSate) {
      return true;
    } else {
      return false;
    }
  };

  changeCastPerPerson = value => {
    let data = this.state.TemCastData;
    let valueData = this.state.FinalCastDataValue;
    if (this.state.TemCastData.people_per_cast <= 2 && value == -1) {
      return;
    } else {
      if (value == 1) {
        data.people_per_cast = data.people_per_cast + 1;
      } else {
        data.people_per_cast = data.people_per_cast - 1;
      }
    }
    valueData.people_per_cast = data.people_per_cast;
    this.setState({ TemCastData: data, FinalCastDataValue: valueData });
  };

  closeModal = () => {
    this.setState({ modalStatus: false });
  };

  updateCastData = value => {
    let data = this.state.TemCastData;
    let valueData = this.state.FinalCastDataValue;
    if (
      this.state.selected_cast_type == 'when_call' ||
      this.state.selected_cast_type == 'cast_time'
    ) {
      data[`${this.state.selected_cast_type}`] = value.value;
      valueData[`${this.state.selected_cast_type}`] = value.value;
    }
    this.setState({ TemCastData: data, FinalCastDataValue: valueData });
  };

  getLocationData = () => {
    let data =
      this.props.castTypeInformations &&
        this.props.castTypeInformations.all_cast_location
        ? this.props.castTypeInformations.all_cast_location
        : [];
    let selectedState = this.state.selectedSate
      ? this.state.selectedSate
      : data[0];
    return selectedState ? selectedState.cities : [];
  };

  isSlectedValue = (entityName, Value) => {
    let data = this.state.TemCastData;
    if (data[entityName] == Value) {
      return true;
    } else {
      return false;
    }
  };

  saveCastInfo = () => {
    if (this.state.selected_cast_type == 'cast_location') {
      if (this.state.AddedCityName) {
        let selects = {
          id: shortid.generate(),
          name: this.state.AddedCityName,
        };
        let defaultLocation = this.state.defaultLocation;
        defaultLocation.push(selects);
        let finalData = this.state.FinalCastData;
        finalData[this.state.selected_cast_type] = selects.name;
        let finaDataValue = this.state.FinalCastDataValue;
        finaDataValue[this.state.selected_cast_type] = selects.name;
        this.setState({
          FinalCastData: finalData,
          FinalCastDataValue: finaDataValue,
          defaultLocation,
        });
      } else if (this.tag.itemsSelected) {
        let selects = this.tag.itemsSelected[0];
        let finalData = this.state.FinalCastData;
        if (!selects) {
          selects = {
            id: shortid.generate(),
            name: finalData[this.state.selected_cast_type],
          };
        }
        finalData[this.state.selected_cast_type] = selects.name;
        let finaDataValue = this.state.FinalCastDataValue;
        finaDataValue[this.state.selected_cast_type] = selects.name;
        this.setState({
          FinalCastData: finalData,
          FinalCastDataValue: finaDataValue,
        });
      }
      this.setState({ modalStatus: false });
    } else {
      let tempData = this.state.TemCastData;
      let finalData = this.state.FinalCastData;
      finalData[this.state.selected_cast_type] =
        tempData[this.state.selected_cast_type];
      this.setState({ modalStatus: false, FinalCastData: finalData });
    }
  };

  submitCastCreatepage = () => {
    let veiwData = this.state.FinalCastData;
    let Value = this.state.FinalCastDataValue;
    veiwData.cast_type = this.getPackageInfo();
    Value.cast_type = this.state.selectedPackage;
    Value.cast_location = this.state.FinalCastData.cast_location;
    this.props.navigation.navigate('CastPostPage', {
      data: this.state.FinalCastDataValue,
      showData: this.state.FinalCastData,
    });
  };

  requestForInterView = () => {
    Alert.alert(
      'キャストインタビューリクエスト',
      'キャストインタビューリクエストを管理者に送信して確認してもよろしいですか？',
      [
        { text: 'はい', onPress: () => this.sendInterViewRquest() },
        {
          text: 'キャンセル',
          style: 'cancel',
        },
      ],
    );
  };

  sendInterViewRquest = async () => {
    try {
      let data = {
        want_interview: 1,
      };
      const response = await wantInterView(data);
      if (response.isSuccess) {
        showMessage({
          message: 'リクエストは正常に送信されました',
          type: 'success',
        });
      }
    } catch { }
  };

  locationPicker = loc => {
    this.setState(
      {
        locationSearch: true,
      },
      () => {
        this.getAllUsersByLocation(loc);
      },
    );
  };

  getAllUsersByLocation = async loc => {
    const { userLet, userLong } = this.state;
    try {
      const data = {
        location: loc,
      };
      const response = await GetAllUsersByLocation(data);
      if (response.isSuccess && response.result.users.length > 0) {
        this.setState({ allUser: response.result.users });
      }
    } catch (err) { }
  };

  getPackageInfo = () => {
    let data = this.state.CastPackage.filter(
      x => x.id == this.state.selectedPackage,
    );
    return data[0].package;
  };
  addNewCity = () => {
    if (!this.state.AddedCityName) {
      return;
    }
    let data = this.state.selectedSate;
    let NewCity = {
      city_name: this.state.AddedCityName,
      id: shortid.generate(),
    };
    data.cities.push(NewCity);
    this.setState({
      selectedCity: data,
      AddedCityName: '',
      showOtherAddCity: false,
    });
  };
  updateSateCity = () => {
    let name = this.state.selectedSate.state_name
      ? this.state.selectedSate.state_name
      : this.state.selectedSate.city_name;

    let Selected = {
      id: shortid.generate(),
      name: name,
    };
    let defaultLocation = this.state.defaultLocation;
    defaultLocation.push(Selected);
    let finalData = this.state.FinalCastData;
    finalData[this.state.selected_cast_type] = Selected.name;
    let finaDataValue = this.state.FinalCastDataValue;
    finaDataValue[this.state.selected_cast_type] = Selected.name;
    this.setState({
      FinalCastData: finalData,
      FinalCastDataValue: finaDataValue,
      defaultLocation,
      changeSateModal: false,
    });
  };

  openModalChooseCity = () => {
    console.log('updatd ');
    this.setState({ changeSateModal: true });
  };

  render() {
    return (
      <DashBoardHeader
        navigation={this.props.navigation}
        locationPicker={this.locationPicker}>
        <View style={{ paddingBottom: 40 }}>
          <CustomCard>
            <View style={styles.searchConatiner}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.headerText}>キャストを呼ぶー条件設定</Text>
                {this.state.allUser.length > 0 ? (
                  <Text>近くのキャスト {this.state.allUser.length}人</Text>
                ) : null}
              </View>
              <View style={styles.inputSection}>
                <Grid>
                  <Col>
                    <TouchableOpacity
                      onPress={() => this.openModal('when_call')}
                      style={[styles.InputContainer, styles.marginRight4]}>
                      <View style={styles.InputIcon}>
                        <Icon name="timetable" color="#000" size={20} />
                      </View>
                      <View style={styles.InputTextConatiner}>
                        <Text>{this.state.FinalCastData.when_call}</Text>
                      </View>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity
                      onPress={() => this.openModal('cast_location')}
                      style={[styles.InputContainer, styles.marginLeft4]}>
                      <View style={styles.InputIcon}>
                        <Icon
                          name="map-marker-outline"
                          color="#000"
                          size={20}
                        />
                      </View>
                      <View style={styles.InputTextConatiner}>
                        <Text>{this.state.FinalCastData.cast_location}</Text>
                      </View>
                    </TouchableOpacity>
                  </Col>
                </Grid>
                <Grid style={{ marginTop: 8 }}>
                  <Col>
                    <TouchableOpacity
                      onPress={() => this.openModal('people_per_cast')}
                      style={[styles.InputContainer, styles.marginRight4]}>
                      <View style={styles.InputIcon}>
                        <Icon name="account" color="#000" size={20} />
                      </View>
                      <View style={styles.InputTextConatiner}>
                        <Text>
                          {this.state.FinalCastData.people_per_cast}人
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity
                      onPress={() => this.openModal('cast_time')}
                      style={[styles.InputContainer, styles.marginLeft4]}>
                      <View style={styles.InputIcon}>
                        <Icon name="glass-cocktail" color="#000" size={20} />
                      </View>
                      <View style={styles.InputTextConatiner}>
                        <Text>{this.state.FinalCastData.cast_time}</Text>
                      </View>
                    </TouchableOpacity>
                  </Col>
                </Grid>
                <Grid style={{ marginTop: 8 }}>
                  <Col>
                    <TouchableOpacity
                      onPress={() => this.openModal('cast_type')}
                      style={styles.InputContainer}>
                      <View style={styles.InputIcon}>
                        <Icon name="diamond-stone" color="#000" size={20} />
                      </View>
                      <View style={styles.InputTextConatiner}>
                        <Text>{this.getPackageInfo()}</Text>
                      </View>
                    </TouchableOpacity>
                  </Col>
                </Grid>
              </View>
              <View style={{ flex: 1, paddingTop: 55 }}>
                <SetpByStepProcess
                  title="次に進む (1/4)"
                  action={() => this.submitCastCreatepage()}
                />
              </View>
            </View>
          </CustomCard>

          {this.state.allUser.length > 0 ? (
            <CustomCard>
              <Carousel
                containerCustomStyle={{ backgroundColor: 'pink' }}
                contentContainerCustomStyle={{
                  backgroundColor: '#fff',
                  height: 250,
                }}
                data={this.state.allUser}
                renderItem={this.renderListComponent}
                sliderWidth={sliderWidth}
                itemWidth={sliderItemWidth}
                activeSlideAlignment={'start'}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
              />
            </CustomCard>
          ) : null}

          <CustomCard>
            <View style={styles.addCastContainer}>
              <Text style={styles.addCastContainerMainText}>
                キャストを希望しているユーザーはこちらからリクエストを送信します
              </Text>
              {/* <Text style={styles.addCastContainerSubText}>
                まず、こちらからご応募ください。
              </Text> */}
              <ButtonCustom
                title="面接リクエスト"
                onPress={() => this.requestForInterView()}
              />
            </View>
          </CustomCard>
        </View>
        <Spinner
          visible={this.state.loading}
          textContent={'読み込み中'}
          textStyle={styles.spinnerTextStyle}
        />
        <Modal
          testID={'castTimeModale'}
          isVisible={this.state.modalStatus}
          onSwipeComplete={() => this.closeModal('castTimeModale')}
          swipeDirection={['up', 'left', 'right', 'down']}
          style={styles.ModalView}>
          <TouchableWithoutFeedback
            onPress={() => this.closeModal('castTimeModale')}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.content}>
            {/* <View style={styles.mainRow}>
              <Text style={styles.rowTitle}>{this.state.openModalTitle}</Text> 
              {this.state.selected_cast_type == 'cast_location' ? (
                <TouchableWithoutFeedback
                  onPress={() => this.changeStateValue()}>
                  <Text>
                    状態を変える(
                    {this.state.selectedSate
                      ? this.state.selectedSate.state_name
                      : this.props.castTypeInformations &&
                        this.props.castTypeInformations.all_cast_location
                      ? this.props.castTypeInformations.all_cast_location
                      : [].state_name}
                    )
                  </Text>
                </TouchableWithoutFeedback>
              ) : null}
            </View> */}
            <View>
              <View style={{ flexDirection: 'column' }}>
                {this.state.selected_cast_type == 'cast_type' ? (
                  <View>
                    <View>
                      <Text style={styles.tileView}>
                        表示もカタカナに変更します。
                      </Text>
                    </View>
                    {this.state.CastPackage.map(x => {
                      return (
                        <View key={shortid.generate()}>
                          <TouchableWithoutFeedback
                            onPress={() =>
                              this.setState({ selectedPackage: x.id })
                            }>
                            <View
                              style={
                                this.state.selectedPackage == x.id
                                  ? styles.packageButtonS
                                  : styles.packageButton
                              }>
                              <Text
                                style={
                                  this.state.selectedPackage == x.id
                                    ? styles.packageButtonTextS
                                    : styles.packageButtonText
                                }>
                                {x.package}
                              </Text>
                              <Text
                                style={
                                  this.state.selectedPackage == x.id
                                    ? styles.packageButtonTextS
                                    : styles.packageButtonText
                                }>
                                {x.price}
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      );
                    })}
                  </View>
                ) : null}
              </View>
            </View>
            {this.state.selected_cast_type == 'people_per_cast' ? (
              <View>
                <View style={styles.mainRow}>
                  <Text style={styles.rowTitle}>何人呼びますか？</Text>
                  {/* <TouchableOpacity style={styles.SubRow}>
                    <Icon name="information" size={20} color="#000" />
                    <Text style={styles.paddingLeft10}>最低人数のお願い</Text>
                  </TouchableOpacity> */}
                </View>
                <View style={styles.mainRow}>
                  <View style={styles.SubRow}>
                    <Text style={styles.CastPeopleSelect}>キャスト人数</Text>
                    <Text style={styles.CastPeopleSelectNumber}>
                      {this.state.TemCastData.people_per_cast}
                    </Text>
                    <Text style={styles.CastPeopleSelect}>人</Text>
                  </View>
                  <View style={styles.SubRow}>
                    <TouchableWithoutFeedback
                      onPress={() => this.changeCastPerPerson(-1)}>
                      <AntDesign name="minuscircleo" size={30} color={this.state.TemCastData.people_per_cast === 2 ? "#aaa" : "#000"} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() => this.changeCastPerPerson(1)}>
                      <View style={{ paddingLeft: 30 }}>
                        <AntDesign name="pluscircleo" size={30} color="#000" />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            ) : null}
            {this.state.selected_cast_type == 'cast_location' ? (
              <View>
                <View style={styles.SubRow}>
                  <TagSelect
                    data={this.state.defaultLocation}
                    max={1}
                    labelAttr="name"
                    itemStyle={styles.item}
                    itemLabelStyle={styles.label}
                    itemStyleSelected={styles.itemSelected}
                    itemLabelStyleSelected={styles.labelSelected}
                    ref={tag => {
                      this.tag = tag;
                    }}
                    onItemPress={item => {
                      this.setState({
                        selectedCity: item,
                        showOtherAddCity: false,
                      });
                    }}
                    onMaxError={() => {
                      Alert.alert(
                        'ウォーニング',
                        '以前の都市を破棄して新しい都市を選択してください。',
                      );
                    }}
                  />
                  <TouchableWithoutFeedback
                    onPress={() => this.openModalChooseCity()}>
                    <View style={styles.itemSelectedOthers}>
                      <Text style={styles.label}>その他</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View>
                  <View style={styles.verfiedTokenCenter}>
                    <Text style={styles.questionColor}>
                      ここに都市が含まれていない場合は追加してください
                    </Text>
                  </View>
                  <View style={styles.addCity}>
                    <TextInput
                      placeholder={'都市名を入力してください'}
                      style={styles.addCityInput}
                      value={this.state.AddedCityName}
                      onChangeText={AddedCityName =>
                        this.setState({ AddedCityName })
                      }
                    />
                    {/* <TouchableWithoutFeedback
                        onPress={() => this.addNewCity()}>
                        <View style={styles.addCityutton}>
                          <Text style={styles.addCityuttonText}>Add</Text>
                        </View>
                      </TouchableWithoutFeedback> */}
                  </View>
                </View>
              </View>
            ) : null}
            {this.state.selected_cast_type == 'when_call' ||
              this.state.selected_cast_type == 'cast_time' ? (
                <View style={styles.SubRow}>
                  {this.state.openModalData.map((x, index) => {
                    return (
                      <TouchableWithoutFeedback
                        key={shortid.generate()}
                        onPress={() => this.updateCastData(x)}>
                        <View
                          style={
                            this.isSlectedValue(
                              this.state.selected_cast_type,
                              x.value,
                            )
                              ? styles.CallTimeButtonSelected
                              : styles.CallTimeButton
                          }>
                          <Text
                            style={
                              this.isSlectedValue(
                                this.state.selected_cast_type,
                                x.value,
                              )
                                ? styles.CallTimeButtonTextSelected
                                : styles.CallTimeButtonText
                            }>
                            {x.value}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </View>
              ) : null}

            <View style={{ flex: 1, marginTop: 55 }}>
              <SetpByStepProcess
                hideIcon={true}
                title="保存する"
                action={() => this.saveCastInfo()}
              />
            </View>
          </View>
          <Modal
            testID={'castTimeModale2'}
            isVisible={this.state.changeSateModal}
            onSwipeComplete={() => this.changeStateValue()}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={styles.ModalView2}>
            <TouchableWithoutFeedback onPress={() => this.changeStateValue()}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.content2}>
              <View style={styles.mainRow}>
                <Text style={styles.rowTitle}>状態を変える</Text>
              </View>
              <ScrollView>
                <TouchableHighlight>
                  <TouchableWithoutFeedback>
                    <View>
                      {this.props.castTypeInformations &&
                        this.props.castTypeInformations.all_cast_location
                        ? this.props.castTypeInformations.all_cast_location.map(
                          x => {
                            return (
                              <View
                                key={shortid.generate}
                                style={{
                                  flexDirection: 'column',
                                  alignItems: 'flex-end',
                                }}>
                                <TouchableWithoutFeedback
                                  key={x.id}
                                  onPress={() => this.UpdateStateValue(x)}>
                                  <View
                                    style={
                                      this.getSelectedStateStatus(x)
                                        ? styles.Selected
                                        : styles.NonSelected
                                    }>
                                    <Text>{x.state_name}</Text>
                                  </View>
                                </TouchableWithoutFeedback>
                                {x.cities &&
                                  x.cities.map(y => {
                                    return (
                                      <TouchableWithoutFeedback
                                        key={y.id}
                                        onPress={() =>
                                          this.UpdateStateValue(y)
                                        }>
                                        <View
                                          style={
                                            this.getSelectedStateStatus(y)
                                              ? styles.SelectedCity
                                              : styles.NonSelectedCity
                                          }>
                                          <Text
                                            style={{
                                              alignSelf: 'flex-end',
                                              paddingRight: 15,
                                            }}>
                                            {y.city_name}
                                          </Text>
                                        </View>
                                      </TouchableWithoutFeedback>
                                    );
                                  })}
                              </View>
                            );
                          },
                        )
                        : null}
                    </View>
                  </TouchableWithoutFeedback>
                </TouchableHighlight>
              </ScrollView>

              <View style={{ flex: 1, marginTop: 55 }}>
                <SetpByStepProcess
                  hideIcon={true}
                  title="保存する"
                  action={() => this.updateSateCity()}
                />
              </View>
            </View>
          </Modal>
        </Modal>
        <Modal
          testID={'castTimeModale'}
          isVisible={this.state.callNotification}
          onSwipeComplete={() => this.closeCallNotification()}
          swipeDirection={['up', 'left', 'right', 'down']}
          style={styles.callModalView}>
          <TouchableWithoutFeedback
            onPress={() => this.closeCallNotification()}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.content}>
            <View style={styles.centerImage}>
              <Image
                style={{ width: 200, height: 140 }}
                source={require('../../../assets/profile/maria_logo.png')}
              />
            </View>
            <View style={styles.thanksConatiner}>
              <Text style={{ textAlign: 'center', fontSize: 12 }}>
                {this.state.callerName}{' '}
                があなたをキャストするためのコミュニケーションを求めています
              </Text>
            </View>
            <View style={{ marginTop: 55, paddingTop: 30 }}>
              <SetpByStepProcess
                hideIcon={true}
                title="通話を受け入れる"
                action={() => this.openCallNotification()}
              />
            </View>
          </View>
        </Modal>
      </DashBoardHeader>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    castTypeInformations: state.mainReducers.main.castTypeInformations,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(duckOperations, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
