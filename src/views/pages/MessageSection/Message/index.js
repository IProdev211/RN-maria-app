import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Dimensions
} from 'react-native';
import { Badge } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import DashBoardHeader from '../../../components/DashBoardHeader';
import { allMessage, deleteMessage } from '../../../../services/AuthService';
import styles from './styles';

const { height } = Dimensions.get('window');

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      TabOptionSelected: 0,
      isFetching: false,
    };
    this.getAllMessage = this.getAllMessage.bind(this);
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getAllMessage();
    }
    );
  }

  componentWillUnmount() {
    this.focusListener();
  }

  getAllMessage = async () => {
    try {
      const response = await allMessage();
      this.setState({ isFetching: false });
      if (response.isSuccess) {
        let data = response.result.user_all_message;
        this.setState({ data });
      }
    } catch {
      this.setState({ isFetching: false });
    }
  };
  deleteMessageNote = async message => {
    try {
      const response = await deleteMessage(message.index);
      if (response.isSuccess) {
        this.getAllMessage();
      }
    } catch { }
  };
  render() {
    return (
      <DashBoardHeader
        navigation={this.props.navigation}
        backNavigation={true}
        notificationHide={true}
        scrollingOff={true}
        title="お知らせ"
      >
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
                キャストから
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
                運営から
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.isFetching}
                onRefresh={() => this.getAllMessage()}
              />
            }
            style={styles.scrollViewHeight}
          >
            {!this.state.TabOptionSelected ?
              <FlatList
                style={styles.root}
                data={this.state.data}
                extraData={this.state}
                ItemSeparatorComponent={() => {
                  return <View style={styles.separator} />;
                }}
                keyExtractor={(item, index) => `user-${index}`}
                renderItem={item => {
                  const Notification = item.item;
                  let mainContentStyle;
                  return (
                    <Swipeout
                      right={[
                        {
                          text: '削除',
                          underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                          onPress: () => {
                            this.deleteMessageNote(item);
                          },
                        },
                      ]}
                      autoClose={true}
                      backgroundColor="transparent"
                    >
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.push('MessageDetails', {
                            user_id: Notification.user_id,
                            user_pic: Notification.user_pic,
                            user_name: Notification.user_name,
                          })
                        }>
                        <View style={styles.container}>
                          <Image
                            source={{ uri: Notification.user_pic }}
                            style={styles.avatar}
                          />
                          <View style={styles.content}>
                            <View style={mainContentStyle}>
                              <View style={styles.text}>
                                <Text style={styles.name}>
                                  {Notification.user_name}{' '}
                                  <Text style={styles.ageShow}>
                                    ({Notification.usr_age}歳)
                                  </Text>
                                </Text>
                                <Text style={styles.timeAgo}>{`${Notification.message_date
                                  }(${Notification.message_day.substring(0, 3)})${Notification.message_time
                                  }`}</Text>
                              </View>
                              <View style={styles.text}>
                                <Text>
                                  {this.props.userInfo && this.props.userInfo.last_deposite_balance != '0' ?
                                    Notification.message_text
                                    :
                                    "メッセージが届いてます"
                                  }
                                </Text>
                                {Notification.message_unseen ? (
                                  <Badge
                                    value={Notification.message_unseen}
                                    status="primary"
                                  />
                                ) : null}
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Swipeout>
                  );
                }}
              />
              :
              <View style={styles.NONotificationContainer}>
                <Text>システム通知なし !</Text>
              </View>
            }
          </ScrollView>
        </View>
      </DashBoardHeader>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    userInfo: state.mainReducers.main.userInfo,
  };
}

export default connect(
  mapStateToProps,
  {},
)(Message);
