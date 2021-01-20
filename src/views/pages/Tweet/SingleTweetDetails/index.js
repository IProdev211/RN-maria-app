import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { getSignleTweet } from '../../../../services/AuthService';
import DashBoardHeader from '../../../components/DashBoardHeader';
import Tweet from '../../../components/Tweet';
import styles from './styles';

class SingleTweetDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.getSigleAllTweet();
  }
  getSigleAllTweet = async () => {
    let tweetId = this.props.route.params.tweetId;
    console.log('tweetId', tweetId);
    this.setState({ loading: true });
    try {
      let data = `tweet/${tweetId}`;
      let response = await getSignleTweet(data);
      console.log(response);
      if (response.isSuccess) {
        this.setState({ data: response.result.user_tweets });
      }
      this.setState({ loading: false });
    } catch (errors) {
      this.setState({ loading: false });
    }
  };
  checkAMPM = time => {
    let timeInfom = Number(time);
    let AmPm = timeInfom => (12 ? 'PM' : 'AM');

    return time + AmPm();
  };

  updateNiceStatus = id => {
    let data = this.state.data;
    let updatedData = [];
    data.map(x => {
      if (x.id == id) {
        if (x.is_nice == 0) {
          x.is_nice = 1;
          x.tweet_total_nice = x.tweet_total_nice + 1;
        } else {
          x.is_nice = 0;
          x.tweet_total_nice = x.tweet_total_nice - 1;
        }
      }
      updatedData.push(x);
    });
    this.setState({ data: updatedData });
  };
  gotoDetailsPage = id => {
    this.props.navigation.navigate('Details', { id });
  };
  profileView = id => {
    this.props.navigation.navigate('UserDetails', { userData: id });
  };
  render() {
    return (
      <DashBoardHeader
        navigation={this.props.navigation}
        addTweet={true}
        backNavigation={true}
        title="つぶやく詳細"
        notificationHide={true}>
        <View>
          {this.state.data ? (
            this.state.data.reverse().map((x, index) => {
              return (
                <Tweet
                  id={x.id}
                  key={index}
                  item={x}
                  ownerImage={x.author_pic}
                  ownerName={x.author_name}
                  postedTime={this.checkAMPM(x.tweet_posted_time)}
                  loved={x.tweet_total_nice}
                  isLoved={x.is_nice}
                  post={x.tweet_content}
                  attachmentUrl={x.tweet_picture}
                  updateNice={() => this.updateNiceStatus(x.id)}
                  onPressContent={() => this.gotoDetailsPage(x.id)}
                  onPressUserProfile={() => this.profileView(x.author_id)}
                />
              );
            })
          ) : (
              <View>
                <Text>NO Post Found</Text>
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

export default SingleTweetDetails;
