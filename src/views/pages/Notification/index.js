import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashBoardHeader from '../../components/DashBoardHeader';
import styles from './styles';
import shortid from 'shortid';
import {
  unreadNotification,
  getNotification,
  callHistory,
} from '../../../services/AuthService';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { duckOperations } from '../../../redux/Main/duck';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TabOptionSelected: 0,
      callHistory: [],
    };
  }
  componentDidMount() {
    this.getAllNotification();
    this.getCallHistory();
  }
  actionOnPress = data => {
    console.log(data);
    this.makeNotificationRead(data.id);
    if (data.tap_action == 'user_profile' || data.tap_action == 'nice') {
      this.props.navigation.navigate('UserDetails', {
        userData: { id: data.user_id },
      });
    } else if (data.tap_action == 'tweet') {
      this.props.navigation.navigate('SingleTweetDetails', {
        tweetId: data.tweet_id,
      });
    }
  };
  makeNotificationRead = async id => {
    try {
      const response = await unreadNotification(id);
      this.getAllNotification();
    } catch { }
  };
  getAllNotification = async () => {
    const response = await getNotification();
    if (response.isSuccess) {
      this.props.allNotifications(response.result.notification_list);
    }
  };
  getCallHistory = async () => {
    let data = { user_id: 3 };
    const response = await callHistory(data);
    if (response.isSuccess) {
      let history = response.result.call_history;
      this.setState({ callHistory: history });
      console.log('Call History', history);
    }
  };

  renderItem = ({ item }) => {
    var callIcon = 'https://img.icons8.com/color/48/000000/video-call.png';
    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{item.name}</Text>
            </View>
            <View style={styles.end}>
              <Image
                style={[
                  styles.icon,
                  { marginLeft: 15, marginRight: 5, width: 14, height: 14 },
                ]}
                source={{
                  uri: 'https://img.icons8.com/small/14/000000/double-tick.png',
                }}
              />
              <Text style={styles.time}>
                {item.date} {item.time}
              </Text>
            </View>
          </View>
          <Image
            style={[styles.icon, { marginRight: 50 }]}
            source={{ uri: callIcon }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  isHostCall = id => {
    if (Number(this.props.userInfo.id) === Number(id)) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    console.log(this.props.allNotification);
    var callIcon = 'https://img.icons8.com/color/48/000000/video-call.png';
    return (
      <DashBoardHeader
        navigation={this.props.navigation}
        backNavigation={true}
        notificationHide={true}
        title="お知らせ">
        <View>
          <View style={styles.tabOption}>
            <TouchableOpacity
              onPress={() => this.setState({ TabOptionSelected: 0 })}
              style={
                this.state.TabOptionSelected == 0
                  ? styles.tabOptionSelect
                  : styles.tabOptionUnselect
              }>
              <Text
                style={
                  this.state.TabOptionSelected == 0
                    ? styles.tabOptionTextSelected
                    : styles.tabOptionText
                }>
                あしあと
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ TabOptionSelected: 1 })}
              style={
                this.state.TabOptionSelected == 1
                  ? styles.tabOptionSelect
                  : styles.tabOptionUnselect
              }>
              <Text
                style={
                  this.state.TabOptionSelected == 1
                    ? styles.tabOptionTextSelected
                    : styles.tabOptionText
                }>
                ビデオ通話履歴
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {!this.state.TabOptionSelected ? (
              this.props.allNotification ? (
                this.props.allNotification.map(Notification => {
                  return (
                    <View key={shortid.generate()} style={styles.root}>
                      <TouchableOpacity
                        style={styles.container}
                        onPress={() => this.actionOnPress(Notification)}>
                        <Image
                          source={{ uri: Notification.user.image_url }}
                          style={styles.avatar}
                        />
                        <View style={styles.content}>
                          <View style={styles.mainContentStyle}>
                            <View style={styles.text}>
                              <Text style={styles.name}>
                                {Notification.user.nickname
                                  ? Notification.user.nickname
                                  : 'unknown'}
                              </Text>
                              <Text> {Notification.notice_time}</Text>
                            </View>
                            <View style={styles.text}>
                              <Text style={styles.timeAgo}>
                                {Notification.content}
                              </Text>
                              {Notification.status == 'unread' ? (
                                <Text style={styles.unreadNotification}>
                                  未読
                                </Text>
                              ) : null}
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.separator} />
                    </View>
                  );
                })
              ) : (
                  <View style={styles.NONotificationContainer}>
                    <Text>システム通知なし !</Text>
                  </View>
                )
            ) : (
                this.state.callHistory.map(Notification => {
                  return (
                    <View key={shortid.generate()} style={styles.root}>
                      <TouchableOpacity style={styles.container}>
                        <Image
                          source={{
                            uri: this.isHostCall(Notification.host_id)
                              ? Notification.guest_profile_pic
                              : Notification.host_profile_pic,
                          }}
                          style={styles.avatar}
                        />
                        <View style={styles.content}>
                          <View style={styles.mainContentStyle}>
                            <View style={styles.text}>
                              <Text style={styles.name}>
                                {this.isHostCall(Notification.host_id)
                                  ? `You host a call with ${Notification.guest_name
                                  }`
                                  : `You were a guest of ${Notification.host_name
                                  }`}
                              </Text>
                            </View>
                            <View style={styles.text}>
                              <Text style={styles.timeAgo}>
                                <Text>
                                  (
                                {Notification.actual_calling_time
                                    ? Notification.actual_calling_time
                                    : 0}
                                m /{' '}
                                  {Notification.total_time
                                    ? Notification.total_time
                                    : 0}
                                m)
                              </Text>
                              </Text>
                              <Icon
                                color={
                                  Notification.is_accepted === '0'
                                    ? 'red'
                                    : 'green'
                                }
                                name="video-camera"
                                size={25}
                              />
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.separator} />
                    </View>
                  );

                  /* <TouchableOpacity key={x.id}>
                      <View style={styles.row}>
                        <Image
                          source={{
                            uri:
                              'https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png',
                          }}
                          style={styles.pic}
                        />
                        <View>
                          <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>
                              Nazmul Tanvir ({' '}
                              {x.actual_calling_time ? x.actual_calling_time : 0}m
                              / {x.total_time ? x.total_time : 0}m)
                            </Text>
                          </View>
                          <View style={styles.end}>
                            <Icon name="calendar-o" size={16} />
                            <Text style={styles.time}>
                              {x.date} {x.created_at}
                            </Text>
                          </View>
                        </View>
                        <Icon
                          color={x.is_accepted === '0' ? 'red' : 'green'}
                          name="video-camera"
                          size={25}
                        />
                      </View>
                    </TouchableOpacity> */
                })
              )}
          </View>
        </View>
      </DashBoardHeader>
    );
  }
}
// actual_calling_time: null
// created_at: "2020-09-24T03:05:11.000000Z"
// guest_id: "3"
// host_id: "8"
// hourly_rate: "4673848"
// id: 11
// is_accepted: "0"
// session_end_by: null
// total_cost: "2336924"
// total_time: "30"
// updated_at: "2020-09-24T03:05:11.000000Z"

function mapStateToProps(state, props) {
  return {
    allNotification: state.mainReducers.main.allNotification,
    userInfo: state.mainReducers.main.userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(duckOperations, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notification);
