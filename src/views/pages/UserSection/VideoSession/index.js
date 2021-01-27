import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert,
  TextInput,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import Modal from 'react-native-modal';
import requestCameraAndAudioPermission from './permission';
import { Icon, Card, Avatar, Button, CheckBox } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import Pusher from 'pusher-js/react-native';
import {
  startVideoSession,
  acceptVideoSession,
  endVideoSession,
  extendVideoSession,
  getSignleUserInfo,
} from '../../../../services/AuthService';
import StepByStepProcess from '../../../components/StepByStepProcess';
import golbalConstants from '../../../Common/GlobalStyles/constants';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { duckOperations } from '../../../../redux/Main/duck';

import styles from './style';
import shortid from 'shortid';
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appId: '2469928ad98c45efa5623bc2591cad91',
      channelName: 'channel-x',
      joinSucceed: false,
      peerIds: [],
      micOnOff: true,
      videoOnOff: true,
      callSettingModal: false,
      callSettingModalGuest: false,
      startStage: 0,
      GuestDetailsName: 'Unknown',
      GuestDetailsPhoto: null,
      GuestId: null,
      GuestHourlyRate: 1000,
      package: [],
      selectedPackage: null,
      hourlyRate: 10000,
      loading: false,
      loadingText: '',
      userType: 'host',
      acceptSessionNotification: false,
      sessionStatusGuest: {
        status: false,
        startTime: null,
        total_time: 0,
        earning: 0,
      },
      sessionTimer: null,
      sessionActualTime: 0,
      sessionTimerAlert: false,
      startCallHeaderTitle:
        'ビデオコールを始める前に、預り金の支払いをお願いいたします。ビデオコール終了後に実費との精算をいたします。',
      extendTimePoint: {
        id: shortid.generate(),
        title: '0 分 0P + 0P',
        time: 0,
        points: 0,
        hourly_rate: 0,
      },
      video_Session: [],
      killTimer: false,
      session_status: false,
    };
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
    Pusher.logToConsole = true;
    this.pusher = new Pusher('5bd4d2b90613efca174f', {
      cluster: 'ap2',
      forceTLS: true,
    });
  }
  componentDidMount() {
    this.init();
    this.pusherSubscription();
  }

  pusherSubscription = () => {
    var channel = this.pusher.subscribe(
      `maria-channel_${this.props.userInfo.id}`,
    );
    channel.bind('start-session', data => {
      let main = data.message;
      let session = {
        status: false,
        startTime: new Date(),
        endTime: null,
        guest_id: main.guest_id,
        host_id: main.host_id,
        hourly_rate: main.hourly_rate,
        total_cost: main.total_cost,
        total_time: main.total_time,
        video_id: main.id,
      };
      this.setState({
        sessionStatusGuest: session,
        acceptSessionNotification: true,
      });
      console.log('UserNotification', data.message);
    });
    channel.bind('accept-session', data => {
      let main = data.message;
      this.cancelTimerAndRestart(0, main.total_time);
      showMessage({
        message: 'キャストがセッション要求を受け入れます。',
        type: 'success',
      });
      let session = {
        status: false,
        startTime: new Date(),
        endTime: null,
        guest_id: main.guest_id,
        host_id: main.host_id,
        hourly_rate: main.hourly_rate,
        total_cost: main.total_cost,
        total_time: main.total_time,
        video_id: main.video_session_id,
      };
      console.log(session, main);
      this.setState({
        sessionStatusGuest: session,
        startStage: 4,
        startCallHeaderTitle: `現在のセッションの推定時間は${main.total_time
          }分、推定コストは${main.total_cost}ポイント、残り${this.state.sessionActualTime
          }分です`,
        session_status: true,
      });
    });
    channel.bind('extend-session', data => {
      let main = data.message;
      let session = this.state.sessionStatusGuest;
      session.total_time = main.total_time;
      let total_cost = this.getPrice(main.hourly_rate, main.total_time);
      session.total_cost = total_cost.points;
      session.video_id = main.video_session_id;
      let totalTimeLeft =
        this.state.sessionActualTime + Number(main.time_extend);
      this.setState({
        sessionStatusGuest: session,
      });
      this.cancelTimerAndRestart(0, totalTimeLeft);
    });

    //d":72,"guest_id":"3","host_id":"8","total_time":"30","actual_calling_time":"1","hourly_rate":"100","total_cost":"50","session_end_by":"8","is_accepted":"1","created_at":"2020-09-26T21:38:05.000000Z","updated_at":"2020-09-26T21:39:04.000000Z"},"for_user_id":"8"}}]
    channel.bind('end-session', data => {
      this.endCall();
      let main = data.message;
      if (main.session_end_by === this.props.userInfo.id) {
      } else {
        Alert.alert(
          'セッション終了',
          'ユーザーがセッションを終了しました。フィードバックがある場合は、レビューであなたの考えを共有します。',
          [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.navigate('UserReviewCast', {
                  data: main,
                });
              },
            },
          ],
          { cancelable: false },
        );
      }
      console.log('ExtendSessionNotification', data);
    });
  };

  loadingMessage = (state, text) => {
    this.setState({ loading: state, loadingText: text });
  };

  getTiles = () => {
    let host =
      'キャストに通話通知を送信して通話に参加します。今すぐ通話を開始してもよろしいですか？';
    let guest =
      '以下のユーザーからのビデオセッションリクエストがあります。セッションを開始するには、通話に参加してください。';
    return this.state.userType === 'host' ? host : guest;
  };

  getTitleForSessionModal = () => {
    switch (this.state.startStage) {
      case 0:
        return '次';
      case 1:
        return '送る';
      case 2:
        return '入金ポイント';
      case 3:
        return 'OK';
      case 4:
        return 'Extend Time';
      case 6:
        return 'Next';
      case 7:
        return 'Next';
      default:
        break;
    }
  };

  init = async () => {
    const { appId } = this.state;
    let channel = this.props.route.params.channel;
    let userType = this.props.route.params.type;
    this.getSingleUserData(this.props.route.params.userId);
    this.setState({
      channelName: channel ? channel : 'admin',
      userType: userType,
    });
    this._engine = await RtcEngine.create(appId);
    await this._engine.enableVideo();
    this._engine.addListener('Warning', warn => {
      console.log('Warning', warn);
    });

    this._engine.addListener('Error', err => {
      console.log('Error', err);
    });

    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      const { peerIds } = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
        });
      }
    });

    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const { peerIds } = this.state;
      this.setState({
        peerIds: peerIds.filter(id => id !== uid),
      });
    });

    // If Local user joins RTC channel
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      // Set state variable to true
      this.setState({
        joinSucceed: true,
      });
    });
  };
  getSingleUserData = async userId => {
    this.setState({ loading: true, loadingText: 'Preparing Video Session....' });
    try {
      const response = await getSignleUserInfo(userId);
      console.log('----------------------', response);
      this.setState({ loading: false });
      if (response.isSuccess) {
        if (response.result.success) {
          let url =
            response.result.success.is_profile_pic == 'null' ||
              !response.result.success.is_profile_pic
              ? 'https://avatar.amuniversal.com/user_avatars/avatars_gocomicsver3/3147000/3147996/8A0811EE-F63A-4561-A936-67F91B168274.png'
              : response.result.success.is_profile_pic;
          //usr_hourly_rate
          let hourly_rate = response.result.success.usr_hourly_rate
            ? parseInt(response.result.success.usr_hourly_rate)
            : 10000;
          this.setState({
            GuestDetailsPhoto: url,
            GuestDetailsName: response.result.success.usr_nickname,
            GuestId: response.result.success.id,
            GuestHourlyRate: hourly_rate,
          });

          this.setState({ hourlyRate: hourly_rate });
          const packageData = [
            this.getPrice(hourly_rate, 30),
            this.getPrice(hourly_rate, 60),
            this.getPrice(hourly_rate, 90),
            this.getPrice(hourly_rate, 120),
            {
              id: shortid.generate(),
              title: '0 分 0P + 0P',
              time: 0,
              points: 0,
              hourly_rate: hourly_rate,
            },
          ];

          this.setState({
            package: packageData,
            selectedPackage: packageData[0].id,
          });
        }
      }
    } catch (error) {
      console.log('----------------------', error);
      this.setState({ loading: false });
    }
  };

  changeSelectedPackage = id => {
    this.setState({ selectedPackage: id });
  };

  getPrice = (data, time) => {
    console.log(data, time);
    let chargePerMin = data / 60;
    let point = parseInt(chargePerMin * time);
    let charge = point * 0.01;
    return {
      id: shortid.generate(),
      title: `${time} 分 ${point}P + ${charge}P`,
      time: time,
      points: point + charge,
      hourly_rate: data,
    };
  };

  cancelTimerAndRestart = (type, time) => {
    let newTime = Number(time);
    if (type === 0) {
      this.setState({ killTimer: true });
      setTimeout(x => {
        this.setState({ killTimer: false });
        this.timeCountDown(newTime);
      }, 2000);
    } else if (type === 1) {
      let previousTime = Number(this.state.sessionActualTime);
      let extendTime = newTime + previousTime;
      this.setState({ killTimer: true });
      setTimeout(x => {
        this.setState({ killTimer: false });
        this.timeCountDown(extendTime);
      }, 2000);
    }
  };

  //Session Setting Change
  startCall = async () => {
    let channel = this.props.route.params.channel;
    await this._engine?.joinChannel(null, channel, null, 0);
  };
  endCall = async () => {
    await this._engine?.leaveChannel();
    this.setState({ peerIds: [], joinSucceed: false });
  };
  micOnOff = async () => {
    let status = !this.state.micOnOff;
    this.setState({ micOnOff: status });
    if (status) {
      await this._engine?.enableAudio();
    } else {
      await this._engine?.disableAudio();
    }
  };
  videoOnOff = async () => {
    let status = !this.state.videoOnOff;
    this.setState({ videoOnOff: status });
    if (status) {
      await this._engine?.enableVideo();
    } else {
      await this._engine?.disableVideo();
    }
  };
  switchCamera = async () => {
    await this._engine?.switchCamera();
  };
  //Session Setting Change

  OpenHideSettingPanel = () => {
    if (this.state.userType === 'host') {
      this.setState({ callSettingModal: !this.state.callSettingModal });
    } else if (this.state.userType === 'guest') {
      if (this.state.session_status) {
        this.setState({
          callSettingModalGuest: true,
          startCallHeaderTitle: 'セッションは進行中です',
        });
      }
      showMessage({
        message:
          'セッションはまだ開始されていません。ホストにセッションの開始を依頼してください。セッションの開始後に詳細が表示されます。',
        type: 'warning',
      });
    } else {
    }
  };

  startStageNext = () => {
    switch (this.state.startStage) {
      case 0:
        let selectedPackage = this.state.package.find(
          x => x.id == this.state.selectedPackage,
        );
        if (selectedPackage.time == 0) {
          showMessage({
            message: "Selected Time Can't be 0",
            type: 'warning',
          });
          return;
        }
        if (this.props.userInfo.points < selectedPackage.points) {
          showMessage({
            message:
              'アカウントに十分なポイントがありません。ビデオセッションをホストするためにポイントを入金してください。',
            type: 'warning',
          });
          this.setState({
            startStage: 2,
            startCallHeaderTitle: `アカウントに十分なポイントがありません。入金してください。この${selectedPackage.time
              }分のビデオセッションには${selectedPackage.points
              }ポイントが必要です。`,
          });
        } else {
          this.setState({
            startStage: 1,
            startCallHeaderTitle: `このビデオセッションでは、${selectedPackage.time
              }分間${selectedPackage.points}ポイントが課金されます`,
          });
        }
        break;
      case 1:
        showMessage({
          message: 'リクエストの送信に成功',
          type: 'success',
        });
        this.sendCallRequest();
        break;
      case 2:
        this.setState({
          callSettingModal: false,
          startStage: 0,
          startCallHeaderTitle:
            'ビデオセッションを始める前に、ポイントの支払いをお願いいたします。ビデオコール終了後に精算をいたします。',
        });
        this.props.navigation.navigate('UserDeposite');
        break;
      case 3:
        this.setState({ callSettingModal: false });
        showMessage({
          message:
            '私たちはあなたのキャストにあなたのリクエストを送りました、あなたは彼がそれを受け入れた後に通知を受け取ります',
          type: 'success',
        });
        break;
      case 4:
        this.extendTime();
        break;
      case 6:
        return 'Next';
      case 7:
        return 'Next';
      default:
        break;
    }
  };
  rejectCall = () => {
    this.endCall();
    this.props.navigation.goBack();
  };
  sendCallRequest = async () => {
    let selectedPackage = this.state.package.find(
      x => x.id == this.state.selectedPackage,
    );
    let data = {
      guest_id: this.state.GuestId,
      host_id: this.props.userInfo.id,
      hourly_rate: selectedPackage.hourly_rate,
      total_time: selectedPackage.time,
    };
    this.setState({
      loading: true,
      loadingText: 'リクエストの送信 ..',
    });
    try {
      let response = await startVideoSession(data);
      console.log(response);
      if (response && response.isSuccess && response.status === 201) {
        this.setState({
          startStage: 3,
          callSettingModal: false,
          startCallHeaderTitle:
            '私たちはあなたのキャストにあなたのリクエストを送りました、彼/彼女がセッションリクエストを受け入れるまで待ってください',
        });
        showMessage({
          message: 'リクエストの送信に成功',
          type: 'success',
        });
      } else {
        showMessage({
          message:
            'アカウントに十分なポイントがないため、ビデオセッションリクエストを送信できません',
          type: 'warning',
        });
      }
      this.setState({ loading: false });
    } catch (errors) {
      this.setState({ loading: false });
      showMessage({
        message: '間違ったコードを入力しました',
        type: 'error',
      });
    }
  };
  closeNotification = v => {
    this.setState({ [v]: false });
  };
  acceptSessionCall = async () => {
    this.loadingMessage(true, 'リクエストを処理しています ...');
    let stateData = this.state.sessionStatusGuest;
    let data = {
      guest_id: stateData.guest_id,
      host_id: stateData.host_id,
      hourly_rate: stateData.hourly_rate,
      total_time: stateData.total_time,
      video_id: stateData.video_id,
    };
    try {
      const response = await acceptVideoSession(data);
      this.loadingMessage(false, 'リクエストを処理しています ...');
      if (response.isSuccess) {
        this.setState({ acceptSessionNotification: false, session_status: true });
        this.startCall();
        this.cancelTimerAndRestart(0, data.total_time);
        showMessage({
          message: 'セッションが正常に受け入れられました',
          type: 'success',
        });
      }
    } catch { }
  };
  timeCountDown = total_time => {
    var countDownDate = this.addMinutes(new Date(), total_time).getTime();
    exitCounting();
    var x = setInterval(() => {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      let text =
        (hours ? hours + 'h ' : null) + minutes + 'm ' + seconds + 's ';
      let actualTimeHourLeft = hours ? Number(hours) * 60 : 0;
      let actualMinuteLeft = minutes > 0 ? Number(minutes) : 0;
      let totalMinuteLeft = actualTimeHourLeft + actualMinuteLeft;
      if (distance <= 600000) {
        this.setState({ sessionTimerAlert: true });
      }
      if (distance < 1000) {
        exitCounting();
        this.setState({ joinSucceed: false });
        this.endSessionApi();
      }

      if (this.state.killTimer) {
        exitCounting();
      }

      this.setState({
        sessionTimer: text,
        sessionActualTime: totalMinuteLeft,
      });
    }, 1000);

    function exitCounting() {
      clearInterval(x);
    }
  };
  addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
  };
  onChangePackagePointText = text => {
    let data = this.state.package;
    data[4].time = Number(text);
    let chargePerMin = data[4].hourly_rate / 60;
    let point = parseInt(chargePerMin * Number(text));
    let charge = point * 0.01;
    data[4].points = charge + point;
    data[4].title = `${Number(text)} Mins ${point}P + ${charge}P`;
    this.setState({ package: data });
    this.changeSelectedPackage(data[4].id);
  };
  onExtendTimePointText = text => {
    let data = this.state.extendTimePoint;
    data.time = Number(text);
    let chargePerMin = Number(this.state.hourlyRate) / 60;
    let point = parseInt(chargePerMin * Number(text));
    let charge = point * 0.01;
    data.points = charge + point;
    data.title = `${Number(text)} 分 ${point}P + ${charge}P`;
    this.setState({ extendTimePoint: data });
  };
  extendTime = async () => {
    if (Number(this.state.extendTimePoint.time) < 1) {
      showMessage({
        message:
          '最短で1分延長する必要があり、延長時間を0にすることはできません。',
        type: 'warning',
      });
    }
    let data = {
      video_id: this.state.sessionStatusGuest.video_id,
      time_extend: Number(this.state.extendTimePoint.time),
    };
    try {
      const response = await extendVideoSession(data);
      console.log(response);
      this.setState({ callSettingModal: false });
      if (response && response.isSuccess) {
        showMessage({
          message: '時間が正常に延長されました',
          type: 'success',
        });
      } else {
        showMessage({
          message: 'この通話を延長するのに十分なポイントがありません',
          type: 'success',
        });
      }
    } catch (error) {
      this.setState({ callSettingModal: false });
    }
  };

  endThisVideoSession = () => {
    Alert.alert(
      'セッション終了 ?',
      'このセッションを終了しますか？ 私たちはあなたがセッションにいる実際の時間のポイントをカットします。 続行する場合は、「キャンセル」または「OK」を押してセッションを終了します',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.endCall();
            if (this.state.session_status) {
              this.endSessionApi();
            } else {
              this.props.navigation.goBack();
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  endSessionApi = async () => {
    console.log(
      '---------->',
      this.state.sessionStatusGuest,
      this.state.sessionActualTime,
    );
    let timeLeft =
      Number(this.state.sessionStatusGuest.total_time) -
      this.state.sessionActualTime;
    let data = {
      actual_calling_time: timeLeft,
      video_id: this.state.sessionStatusGuest.video_id,
      session_end_by: this.props.userInfo.id,
    };
    try {
      const response = await endVideoSession(data);
      console.log(response);
      showMessage({
        message: 'ビデオセッション終了',
        type: 'success',
      });
      if (response && response.isSuccess) {
        this.props.navigation.navigate('UserReviewCast', {
          data: response.end_session,
        });
      }
    } catch (error) { }
  };

  render() {
    return (
      <View style={styles.max}>
        {this.state.joinSucceed ? this._renderVideos() : null}
        {!this.state.joinSucceed ? (
          <View style={styles.startCallSection}>
            <Card>
              <View>
                <Text style={styles.callText}>{this.getTiles()}</Text>
              </View>
              <View style={styles.photoContainer}>
                <Avatar
                  rounded
                  source={{
                    uri: this.state.GuestDetailsPhoto,
                  }}
                  size="xlarge"
                  title="PF"
                />
                <Text style={styles.profileName}>
                  {this.state.GuestDetailsName}
                </Text>
              </View>
              <View style={styles.callButtonContainer}>
                <Button
                  title="Reject"
                  type="outline"
                  onPress={this.rejectCall}
                  buttonStyle={styles.buttonAccept}
                />
                <Button
                  title="Join Call"
                  type="outline"
                  onPress={this.startCall}
                  buttonStyle={styles.buttonAccept}
                />
              </View>
            </Card>
          </View>
        ) : null}
        {this.state.joinSucceed ? (
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <View style={styles.buttonHolder}>
                <TouchableOpacity
                  onPress={this.micOnOff}
                  style={styles.buttonMain}>
                  <Icon
                    type="material-community"
                    name={this.state.micOnOff ? 'microphone' : 'microphone-off'}
                    size={30}
                    color={golbalConstants.mainColor}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.videoOnOff}
                  style={styles.buttonMain}>
                  <Icon
                    type="feather"
                    name={this.state.videoOnOff ? 'video' : 'video-off'}
                    size={30}
                    color={golbalConstants.mainColor}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.endThisVideoSession}
                  style={styles.stopButtonContainer}>
                  <View style={styles.stopButton}>
                    <Icon name={'circle'} type="font-awesome" color="red" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.switchCamera()}
                  style={styles.buttonMain}>
                  <Icon
                    name="autorenew"
                    type="material"
                    size={30}
                    color={golbalConstants.mainColor}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.OpenHideSettingPanel}
                  style={
                    this.state.sessionTimerAlert
                      ? styles.buttonMainDanger
                      : styles.buttonMain
                  }>
                  <Text style={styles.countdownTimer}>
                    {this.state.sessionTimer}
                  </Text>
                  <Icon
                    name="watch"
                    type="material"
                    size={30}
                    color={
                      this.state.sessionTimerAlert
                        ? '#fff'
                        : golbalConstants.mainColor
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
        <Modal
          testID={'modalViewData'}
          isVisible={this.state.callSettingModal}
          style={styles.ModalView}>
          <TouchableWithoutFeedback
            onPress={() => this.closeNotification('callSettingModal')}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.content2}>
            <View style={styles.mainRow}>
              <Text style={styles.rowTitle}>
                {this.state.startCallHeaderTitle}
              </Text>
            </View>
            <ScrollView>
              <TouchableHighlight>
                <View>
                  {this.state.startStage === 0 ? (
                    <View>
                      {this.state.package.map((x, index) => {
                        return index < 4 ? (
                          <CheckBox
                            key={x.id}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            title={x.title}
                            checked={
                              x.id === this.state.selectedPackage ? true : false
                            }
                            onPress={() => this.changeSelectedPackage(x.id)}
                          />
                        ) : (
                            <View style={styles.customInputContainer} key={x.id}>
                              <TextInput
                                style={styles.customInputStartCall}
                                onChangeText={text =>
                                  this.onChangePackagePointText(text)
                                }
                                value={String(x.time)}
                                keyboardType={'number-pad'}
                                textAlign={'center'}
                              />
                              <Text style={styles.customInputStartText}>
                                {x.title}
                              </Text>
                            </View>
                          );
                      })}
                    </View>
                  ) : null}
                  {this.state.startStage === 1 ? (
                    <View>
                      <Text style={{ paddingBottom: 20 }}>
                        Please Press send Button if your agree.
                      </Text>
                      <Button
                        type="outline"
                        title="Change Package"
                        onPress={() =>
                          this.setState({
                            startStage: 0,
                            startCallHeaderTitle:
                              'ビデオコールを始める前に、預り金の支払いをお願いいたします。ビデオコール終了後に実費との精算をいたします。',
                          })
                        }
                      />
                    </View>
                  ) : null}
                  {this.state.startStage === 4 ? (
                    <View>
                      <Text style={{ paddingBottom: 30 }}>
                        ビデオセッションが進行中です、現在あなたのキャストは{' '}
                        {this.state.GuestDetailsName}.
                      </Text>
                      <View style={styles.customInputContainer}>
                        <TextInput
                          style={styles.customInputStartCall}
                          onChangeText={text =>
                            this.onExtendTimePointText(text)
                          }
                          value={String(this.state.extendTimePoint.time)}
                          keyboardType={'number-pad'}
                          textAlign={'center'}
                        />
                        <Text style={styles.customInputStartText}>
                          {this.state.extendTimePoint.title}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
              </TouchableHighlight>
            </ScrollView>
            <View style={{ flex: 1, marginTop: 60 }}>
              <StepByStepProcess
                hideIcon={true}
                title={this.getTitleForSessionModal()}
                action={() => this.startStageNext()}
              />
            </View>
          </View>
        </Modal>
        <Modal
          testID={'modalViewData'}
          isVisible={this.state.callSettingModalGuest}
          style={styles.ModalView}>
          <TouchableWithoutFeedback
            onPress={() => this.closeNotification('callSettingModalGuest')}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.content2}>
            <View style={styles.mainRow}>
              <Text style={styles.rowTitle}>
                {this.state.startCallHeaderTitle}
              </Text>
            </View>
            <ScrollView>
              <TouchableHighlight>
                <View>
                  <Text style={styles.sessionDetails}>
                    Session Time : {this.state.sessionStatusGuest.total_time}{' '}
                    Minutes
                  </Text>
                  <Text style={styles.sessionDetails}>
                    Session Points : {this.state.sessionStatusGuest.total_cost}{' '}
                    Points
                  </Text>
                  <Text style={styles.sessionDetails}>
                    Session Points : {this.state.sessionActualTime} Minutes
                  </Text>
                </View>
              </TouchableHighlight>
            </ScrollView>
            <View style={{ flex: 1, marginTop: 60 }}>
              <StepByStepProcess
                hideIcon={true}
                title="Ok"
                action={() => this.closeNotification('callSettingModalGuest')}
              />
            </View>
          </View>
        </Modal>
        <Modal
          testID={'castTimeModale'}
          isVisible={this.state.acceptSessionNotification}
          onSwipeComplete={() =>
            this.closeNotification('acceptSessionNotification')
          }
          swipeDirection={['up', 'left', 'right', 'down']}
          style={styles.callModalView}>
          <TouchableWithoutFeedback
            onPress={() => this.closeNotification('acceptSessionNotification')}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.content}>
            <View style={styles.centerImage}>
              <Image
                style={{ width: 200, height: 140 }}
                source={require('../../../../assets/profile/maria_logo.png')}
              />
            </View>

            <View style={styles.thanksContainer}>
              <Text style={styles.thanksText}>
                {this.state.GuestDetailsName}
                がセッションタイマーを{this.state.sessionStatusGuest.totalTime}
                分間開始するように要求しました。この
                {this.state.sessionStatusGuest.totalTime}
                分間で{this.state.sessionStatusGuest.earning}
                ポイントを獲得できます。 開始するには同意してください。
              </Text>
            </View>

            <View style={styles.callButtonContainer}>
              <Button
                title="拒む"
                type="outline"
                onPress={() =>
                  this.closeNotification('acceptSessionNotification')
                }
                buttonStyle={styles.buttonAcceptRed}
                titleStyle={styles.buttonAcceptTitle}
              />
              <Button
                title="受け入れる"
                type="outline"
                onPress={() => this.acceptSessionCall()}
                buttonStyle={styles.buttonAcceptGreen}
                titleStyle={styles.buttonAcceptTitle}
              />
            </View>
          </View>
        </Modal>
        <Spinner
          visible={this.state.loading}
          textContent={this.state.loadingText}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    );
  }
  _renderVideos = () => {
    const { joinSucceed } = this.state;
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={this.state.channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {this._renderRemoteVideos()}
      </View>
    ) : null;
  };

  _renderRemoteVideos = () => {
    const { peerIds } = this.state;
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{ paddingHorizontal: 2.5 }}
        horizontal={true}>
        {peerIds.map((value, index, array) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={this.state.channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };
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
)(index);
