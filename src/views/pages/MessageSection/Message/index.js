import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import {Badge} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import DashBoardHeader from '../../../components/DashBoardHeader';
import {allMessage, deleteMessage} from '../../../../services/AuthService';
import styles from './styles';

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
    this.focusListener = this.props.navigation.addListener('focus', () =>
      this.getAllMessage(),
    );
  }
  componentDidUpdate() {}
  componentWillUnmount() {
    this.focusListener.remove();
  }

  getAllMessage = async () => {
    try {
      const response = await allMessage();
      this.setState({isFetching: false});
      if (response.isSuccess) {
        let data = response.result.user_all_message;
        this.setState({data});
      }
      console.log(response);
    } catch {
      this.setState({isFetching: false});
    }
  };
  deleteMessageNote = async message => {
    console.log(message);
    try {
      const response = await deleteMessage(message.index);
      if (response.isSuccess) {
        this.getAllMessage();
        console.log('deleteMessageNote');
      }
    } catch {}
  };
  render() {
    return (
      <DashBoardHeader
        navigation={this.props.navigation}
        backNavigation={true}
        notificationHide={true}
        scrollingOff={true}
        title="お知らせ">
        <View>
          <View style={styles.tabOption}>
            <TouchableOpacity
              onPress={() => this.setState({TabOptionSelected: 0})}
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
              onPress={() => this.setState({TabOptionSelected: 1})}
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
          <View>
            {!this.state.TabOptionSelected ? (
              <FlatList
                style={styles.root}
                data={this.state.data}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isFetching}
                    onRefresh={() => this.getAllMessage()}
                  />
                }
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
                          text: 'Delete',
                          backgroundColor: 'red',
                          underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                          onPress: () => {
                            this.deleteMessageNote(item);
                          },
                        },
                      ]}
                      autoClose={true}
                      backgroundColor="transparent">
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
                            source={{uri: Notification.user_pic}}
                            style={styles.avatar}
                          />
                          <View style={styles.content}>
                            <View style={mainContentStyle}>
                              <View style={styles.text}>
                                <Text style={styles.name}>
                                  {Notification.user_name}{' '}
                                  <Text style={styles.ageShow}>
                                    ({Notification.usr_age}y old)
                                  </Text>
                                </Text>
                                <Text style={styles.timeAgo}>{`${
                                  Notification.message_date
                                }(${Notification.message_day.substring(0, 3)})${
                                  Notification.message_time
                                }`}</Text>
                              </View>
                              <View style={styles.text}>
                                <Text>{Notification.message_text}</Text>
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
            ) : (
              <View style={styles.NONotificationContainer}>
                <Text>システム通知なし !</Text>
              </View>
            )}
          </View>
        </View>
      </DashBoardHeader>
    );
  }
}

export default Message;
