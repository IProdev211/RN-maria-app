import styles from './styles';
import React, { Component } from 'react';
import Stars from 'react-native-stars';
import { View, Text, Image, TextInput, BackHandler } from 'react-native';
import DashBoardHeader from '../../../components/DashBoardHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getSignleUserInfo, postReview } from '../../../../services/AuthService';
import SplashScreen from 'react-native-splash-screen';
import { Card } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
//redux
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

class UserReviewCast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
      userName: '',
      stars: null,
      userData: {
        actual_calling_time: '1',
        guest_id: '11',
        host_id: '8',
        id: 79,
        session_end_by: '8',
        total_cost: '50',
        total_time: '30',
      },
      userId: 0,
      review_text: null,
    };
  }

  componentDidMount() {
    SplashScreen.hide();
    this.getUserInformation();
    BackHandler.addEventListener('hardwareBackPress', this.backKeyAction);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backKeyAction);
  }
  backKeyAction = () => {
    showMessage({
      message: 'ビデオセッションページに戻ることはできません',
      type: 'error',
      backgroundColor: 'red',
    });
    return true;
  };

  getUserInformation = async () => {
    let data = this.props.route.params.data;
    this.setState({ userData: data ? data : this.state.userData });

    if (this.state.userData.host_id == this.props.userInfo.id) {
      this.setState({ userId: this.state.userData.guest_id });
    } else {
      this.setState({ userId: this.state.userData.host_id });
    }

    this.setState({
      loading: true,
      loadingText: '読み込み中..',
    });
    try {
      const response = await getSignleUserInfo(this.state.userId);
      console.log('----------------------', response);
      this.setState({ loading: false });
      console.log(response);
      if (response.isSuccess) {
        if (response.result.success) {
          let profileImage =
            response.result.success.is_profile_pic == 'null' ||
              !response.result.success.is_profile_pic
              ? 'https://avatar.amuniversal.com/user_avatars/avatars_gocomicsver3/3147000/3147996/8A0811EE-F63A-4561-A936-67F91B168274.png'
              : response.result.success.is_profile_pic;

          this.setState({
            userName: response.result.success.usr_nickname,
            profileImage,
          });
        }
      }
    } catch (error) {
      console.log('----------------------', error);
      this.setState({ loading: false });
    }
  };
  onChangeText(text) {
    this.setState({ review_text: text });
  }

  writeReview = async () => {
    let data = {
      review_recipient: this.state.userId,
      review_star: this.state.stars,
      review_text: this.state.review_text,
    };

    if (!data.review_text || !data.review_text) {
      showMessage({
        message: "Please Rate and write a review, those fields can't be empty",
        type: 'warning',
      });
      return;
    }

    try {
      const response = await postReview(data);
      this.props.navigation.navigate('InitialLoader');
      if (response && response.isSuccess) {
        showMessage({
          message: '確認されました',
          type: 'warning',
        });
      }
    } catch (error) {
      showMessage({
        message: '確認されました',
        type: 'warning',
      });
    }
  };

  render() {
    return (
      <DashBoardHeader
        navigation={this.props.navigation}
        backNavigation={false}
        title={'レビューセッション'}>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>ユーザーレビュー</Text>
          </View>
          <Card>
            <Text style={{ textAlign: 'center' }}>
              前回のセッションでは、推定時間は{this.state.userData.total_time}
              分で、費用は{this.state.userData.total_cost}ポイントでした。
              実際の時間は{this.state.userData.actual_calling_time}分でした。
              キャストを確認してください。
            </Text>
          </Card>
        </View>
        <View style={styles.ProfileContainer}>
          {this.state.profileImage ? (
            <Image
              style={styles.profilePicImage}
              source={{ uri: this.state.profileImage }}
            />
          ) : (
              <Image
                style={styles.profilePicImage}
                source={require('../../../../assets/panda.png')}
              />
            )}
          <Text style={styles.bodyTitle}>{this.state.userName}</Text>
          <Text style={styles.bodySubTitle}>
            ホストが提供するサービスを評価する
          </Text>
        </View>
        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
          <Stars
            count={5}
            starSize={100}
            update={val => {
              this.setState({ stars: val });
            }}
            fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
            emptyStar={
              <Icon
                name={'star'}
                style={[styles.myStarStyle, styles.myEmptyStarStyle]}
              />
            }
            halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
          />
        </View>
        <View>
          <TextInput
            style={styles.comments}
            placeholder="追加コメント..."
            onChangeText={text => this.onChangeText(text)}
            value={this.state.review_text}
          />
        </View>
        <View style={styles.optionHolder}>
          <TouchableOpacity
            style={{ ...styles.options, backgroundColor: '#6678AB' }}
            onPress={() => this.writeReview()}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                レビュー送信
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.options}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#555',
                }}>
                今はレビューしない
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Spinner
          visible={this.state.loading}
          textContent={this.state.loadingText}
          textStyle={styles.spinnerTextStyle}
        />
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
  null,
)(UserReviewCast);
