import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import ButtonCustom from '../../../components/ButtonCustom';
import { getAllTweet } from '../../../../services/AuthService';
import DashBoardHeader from '../../../components/DashBoardHeader';
import Tweet from '../../../components/Tweet';
import styles from './styles';
import shortid from 'shortid';
class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isFetching: false,
    };
    this.getAllTweet = this.getAllTweet.bind(this);
  }
  componentDidMount() {
    this.getAllTweet();
  }
  getAllTweet = async () => {
    this.setState({ loading: true });
    try {
      let response = await getAllTweet();
      console.log(response);
      if (response.isSuccess) {
        let tweet = response.result.user_tweets;
        let validation = Array.isArray(tweet);
        this.setState({ data: validation ? tweet : null });
      }
      this.setState({ loading: false });
    } catch (errors) {
      this.setState({ loading: false });
    }
  };
  getAllTweetWithoutLoading = async () => {
    try {
      let response = await getAllTweet();
      if (response.isSuccess) {
        let tweet = response.result.user_tweets;
        let validation = Array.isArray(tweet);
        this.setState({ data: validation ? tweet : null });
      }
    } catch (errors) { }
  };
  checkAMPM = time => {
    let timeInfom = Number(time);
    let AmPm = timeInfom => (12 ? 'PM' : 'AM');

    return time + AmPm();
  };

  updateNiceStatus = id => {
    this.getAllTweetWithoutLoading();
  };
  gotoDetailsPage = id => {
    this.props.navigation.push('SingleTweetDetails', { tweetId: id });
  };
  profileView = id => {
    let data = {
      id: id,
    };
    this.props.navigation.push('UserDetails', { userData: data });
  };
  render() {
    return (
      <DashBoardHeader
        navigation={this.props.navigation}
        addTweet={true}
        scrollingOff={true}
        notificationHide={true}
        title="つぶやき"
      >
        <View>
          {this.state.data ? (
            <FlatList
              style={styles.root}
              data={this.state.data}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isFetching}
                  onRefresh={() => this.getAllTweetWithoutLoading()}
                />
              }
              extraData={this.state}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              keyExtractor={(item, index) => `user-${index}`}
              renderItem={items => {
                let item = items.item;
                return (
                  <Tweet
                    id={item.id}
                    item={item}
                    key={shortid.generate()}
                    ownerImage={item.author_pic}
                    ownerName={item.author_name}
                    postedTime={this.checkAMPM(item.tweet_posted_time)}
                    loved={item.tweet_total_nice}
                    isLoved={item.is_nice ? true : false}
                    post={item.tweet_content}
                    attachmentUrl={item.tweet_picture}
                    updateNice={() => this.updateNiceStatus(item.id)}
                    onPressContent={() => this.gotoDetailsPage(item.id)}
                    onPressUserProfile={() => this.profileView(item.author_id)}
                  />
                );
              }}
            />
          ) : (
              <View style={styles.container}>
                <Text>役職が見つかりません。新しい役職を作成してください</Text>
                <ButtonCustom
                  title="面談に通過すると"
                  onPress={() => this.props.navigation.navigate('AddTweet')}
                />
              </View>
            )}
        </View>
        <Spinner
          visible={this.state.loading}
          textContent={'読み込み中...'}
          textStyle={styles.spinnerTextStyle}
        />
      </DashBoardHeader>
    );
  }
}

export default withNavigationFocus(Timeline);
