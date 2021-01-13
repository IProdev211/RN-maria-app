import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Stars from 'react-native-stars';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import DashBoardHeader from '../../../components/DashBoardHeader';
import {
  getSignleUserInfo,
  giveNice,
  postReview,
} from '../../../../services/AuthService';
import { Divider } from 'react-native-elements';
import styles from './styles';
import SetpByStepProcess from '../../../components/SetpByStepProcess';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Tweet from '../../../components/Tweet';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import shortid from 'shortid';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { duckOperations } from '../../../../redux/Main/duck';

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedProfileImage: null,
      selectedImageIndex: 0,
      userData: null,
      tweets: [],
      userReview: [],
      userReviewModal: false,
      stars: 5,
      reViewText: null,
      profileImageArray: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getSigleUserData();
  }

  getSigleUserData = async () => {
    this.setState({ loading: true });
    try {
      const response = await getSignleUserInfo(
        this.props.route.params.userData.id,
      );
      this.setState({ loading: false });
      if (response.isSuccess) {
        let data = response.result.success;
        console.log('data.usr_profile_photo.length', data);
        this.setState({
          userData: response.result.success,
          userReview: response.result.success.review_list,
          selectedProfileImage: data.is_profile_pic
            ? data.is_profile_pic
            : data.usr_profile_photo[0].picture_url,
          profileImageArray: data.usr_profile_photo.length
            ? response.result.success.usr_profile_photo
            : [],
        });
        if (
          response.result.success.tweets &&
          response.result.success.tweets.length > 0
        ) {
          this.setState({ tweets: response.result.success.tweets });
        }
      }
    } catch {
      this.setState({ loading: false });
    }
  };

  giveNiceToUser = async () => {
    try {
      let data = { nice_receiver_id: this.state.userData.id };
      const response = await giveNice(data);
      if (response.isSuccess) {
        console.log('done');
        let user = this.state.userData;
        user.is_nice = 1;
        this.setState({ userData: user });
      }
    } catch { }
  };

  checkAMPM = time => {
    let timeInfom = Number(time);
    let AmPm = timeInfom => (12 ? 'PM' : 'AM');

    return time + AmPm();
  };

  updateNiceStatus = id => {
    let data = this.state.tweets;
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
    this.setState({ tweets: updatedData });
  };
  ReViewUser = () => {
    this.setState({ userReviewModal: true });
  };
  GiveReview = async () => {
    if (!this.state.reViewText) {
      showMessage({
        message: 'リクエストは正常に送信されました',
        type: 'error',
      });
      return;
    }
    let data = {
      review_recipient: this.state.userData.id,
      review_star: this.state.stars,
      review_text: this.state.reViewText,
    };
    this.setState({ userReviewModal: false });

    try {
      const response = await postReview(data);
      if (response.isSuccess && response.status == 201) {
        this.getSigleUserData();
      }
    } catch { }
  };

  gotoUserDetailsPage = () => {
    if (
      this.props.userInfo &&
      this.props.userInfo.last_deposite_balance != '0'
    ) {
      this.props.navigation.push('MessageDetails', {
        user_id: this.state.userData.id,
        user_pic: this.state.selectedProfileImage,
        user_name: this.state.userData
          ? this.state.userData.usr_nickname
          : null,
      });
    } else {
      Alert.alert(
        '警告',
        'クレジットカードを登録してください, 今すぐクレジットカードを登録するには、[はい]を押します',
        [
          {
            text: 'キャンセル',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'はい',
            onPress: () => {
              this.props.navigation.navigate('UserDeposite');
            },
          },
        ],
        { cancelable: false },
      );
    }
  };

  getUserReview = () => {
    return this.state.userReview.length ? (
      this.state.userReview.map((item, index) => {
        return (
          <View
            key={shortid.generate()}
            style={{
              borderTopColor: '#ddd',
              borderTopWidth: 1,
              flexDirection: 'row',
              padding: 15,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{ color: '#43C5FF', fontSize: 18 }}>
                {item.review_sender}
              </Text>
              <View style={{ flexDirection: 'row', marginTop: 2 }}>
                <Text style={{ color: '#999', fontSize: 11 }}>
                  {item.review_time},{' '}
                </Text>
                <Text style={{ color: '#999', fontSize: 11 }}>
                  {item.review_date}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 18, marginTop: 5, color: '#555' }}>
                  {item.review_text}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Text style={{fontSize: 18, color: '#666', fontWeight: 'bold'}}>
                {item.review_star}
              </Text> */}
              <View
                style={{ alignItems: 'center', marginTop: 5, marginBottom: 20 }}>
                <Stars
                  count={5}
                  default={item.review_star ? Number(item.review_star) : 0}
                  starSize={100}
                  disabled
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
                  halfStar={
                    <Icon name={'star-half'} style={[styles.myStarStyle]} />
                  }
                />
              </View>
            </View>
          </View>
        );
      })
    ) : (
        <></>
      );
  };

  render() {
    console.log(this.state.userData);
    return (
      <DashBoardHeader
        navigation={this.props.navigation}
        addTweet={false}
        backNavigation={true}
        title="ユーザーの詳細"
        scrollingOff={true}
        notificationHide={true}>
        {this.state.userData ? (
          <SafeAreaView style={styles.Ccontainer}>
            <ScrollView style={styles.scrollView}>
              <View style={styles.bgColor}>
                <ImageBackground
                  source={
                    this.state.selectedProfileImage
                      ? { uri: this.state.selectedProfileImage }
                      : require('../../../../assets/profile/blackG.png')
                  }
                  style={styles.image}>
                  <View style={styles.profileimagw}>
                    <Image
                      style={{ height: 400, width: '100%' }}
                      source={require('../../../../assets/profile/blackG.png')}
                    />
                    <View style={styles.BackButtonContainer}>
                      {this.state.userData && (
                        <Text style={styles.userClass}>
                          {this.state.userData.user_class}
                        </Text>
                      )}
                    </View>
                    <View style={styles.profileTextContainer}>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.circle} />
                        <Text numberOfLines={1} style={styles.textOnImage}>
                          {this.state.userData
                            ? this.state.userData.usr_nickname
                            : null}
                        </Text>
                        {this.state.userData.guest_verified ? (
                          <Octicons
                            name={'verified'}
                            style={styles.verifiedStyle}
                          />
                        ) : null}
                      </View>
                      {this.state.userData && (
                        <Text style={styles.subText}>
                          {this.state.userData.todays_message}
                        </Text>
                      )}
                    </View>
                  </View>
                </ImageBackground>
                <View style={styles.ImageContainer}>
                  {Array.isArray(this.state.profileImageArray)
                    ? this.state.profileImageArray.map((x, index) => {
                      let ImageUrl = x.picture_url;
                      return (
                        <TouchableOpacity
                          key={shortid.generate()}
                          onPress={() => {
                            this.setState({
                              selectedProfileImage: ImageUrl,
                              selectedImageIndex: index,
                            });
                          }}>
                          <Image
                            key={index}
                            style={[
                              styles.imageStyle,
                              this.state.selectedImageIndex == index
                                ? styles.SelectedImage
                                : null,
                            ]}
                            source={{ uri: ImageUrl }}
                          />
                        </TouchableOpacity>
                      );
                    })
                    : null}
                </View>
                <View style={styles.basicInformationContainer}>
                  {/*<View style={styles.basicInformation}>*/}
                  {/*  <Text style={styles.basicInformationText}>*/}
                  {/*    パフオーマンス内容*/}
                  {/*  </Text>*/}
                  {/*  <Text style={styles.basicInformationText}>*/}
                  {/*    パフオーマンス内容*/}
                  {/*  </Text>*/}
                  {/*</View>*/}
                  <View style={styles.basicInformation}>
                    <Text>30分あたりの料金</Text>
                    {this.state.userData && (
                      <Text style={styles.basicInformationTextPrice}>
                        {this.state.userData.usr_hourly_rate / 2}
                      </Text>
                    )}
                  </View>
                </View>
                {/* <Divider style={styles.DividerClass} />
              <View style={styles.tagContiner}>
                <Text style={styles.textTags}>スレンター</Text>
                <Text style={styles.textTags}>スレンター</Text>
                <Text style={styles.textTags}>スレンター</Text>
              </View> */}
                <Divider style={styles.DividerClass} />
                <View style={styles.basicInformationContainer}>
                  {/* <Text style={styles.sheduleText}>ノfトスケジュール</Text> */}
                  <View style={styles.paddingTop20}>
                    <Calendar
                      markedDates={{
                        '2017-12-14': {
                          periods: [
                            {
                              startingDay: false,
                              endingDay: true,
                              color: '#5f9ea0',
                            },
                            {
                              startingDay: false,
                              endingDay: true,
                              color: '#ffa500',
                            },
                            {
                              startingDay: true,
                              endingDay: false,
                              color: '#f0e68c',
                            },
                          ],
                        },
                        '2017-12-15': {
                          periods: [
                            {
                              startingDay: true,
                              endingDay: false,
                              color: '#ffa500',
                            },
                            { color: 'transparent' },
                            {
                              startingDay: false,
                              endingDay: false,
                              color: '#f0e68c',
                            },
                          ],
                        },
                      }}
                      // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                      markingType="multi-period"
                    />
                  </View>
                </View>
                {/* {this.state.userData && this.state.userData.self_introduction ? (
                <View>
                  <Divider style={styles.DividerClass} />
                  <View style={styles.basicInformationContainer}>
                    <Text style={styles.sheduleText}>ノfトスケジュール</Text>
                    <View style={styles.paddingTop20}>
                      <Text>{this.state.userData.self_introduction}</Text>
                    </View>
                  </View>
                </View>
              ) : null} */}

                <Divider style={styles.DividerClass} />
                <View
                  style={[
                    styles.basicInformationContainer,
                    styles.paddingBottom50,
                  ]}>
                  <Text style={styles.sheduleText}>基本情報</Text>
                  <View style={styles.paddingTop20}>
                    {this.state.userData &&
                      this.state.userData.basic_info.height ? (
                        <View style={styles.basInfo}>
                          <Text>身長</Text>
                          <Text style={styles.basInfoValue}>
                            {this.state.userData
                              ? this.state.userData.basic_info.height
                              : null}
                          </Text>
                        </View>
                      ) : null}
                    {this.state.userData &&
                      this.state.userData.basic_info.location ? (
                        <View style={styles.basInfo}>
                          <Text>居住地</Text>
                          <Text style={styles.basInfoValue}>
                            {this.state.userData
                              ? this.state.userData.basic_info.location
                              : null}
                          </Text>
                        </View>
                      ) : null}
                    {this.state.userData &&
                      this.state.userData.basic_info.sake_drink ? (
                        <View style={styles.basInfo}>
                          <Text>タバコ</Text>
                          <Text style={styles.basInfoValue}>
                            {this.state.userData
                              ? this.state.userData.basic_info.sake_drink
                              : null}
                          </Text>
                        </View>
                      ) : null}
                    {this.state.userData &&
                      this.state.userData.basic_info.smoking ? (
                        <View style={styles.basInfo}>
                          <Text>同居人</Text>
                          <Text style={styles.basInfoValue}>
                            {this.state.userData
                              ? this.state.userData.basic_info.smoking
                              : null}
                          </Text>
                        </View>
                      ) : null}

                    {this.state.userData &&
                      this.state.userData.basic_info.hair_color ? (
                        <View style={styles.basInfo}>
                          <Text>髪の色</Text>
                          <Text style={styles.basInfoValue}>
                            {this.state.userData
                              ? this.state.userData.basic_info.hair_color
                              : null}
                          </Text>
                        </View>
                      ) : null}
                    {this.state.userData &&
                      this.state.userData.basic_info.hair_style ? (
                        <View style={styles.basInfo}>
                          <Text>髪型</Text>
                          <Text style={styles.basInfoValue}>
                            {this.state.userData
                              ? this.state.userData.basic_info.hair_style
                              : null}
                          </Text>
                        </View>
                      ) : null}
                    {this.state.userData &&
                      this.state.userData.basic_info.work ? (
                        <View style={styles.basInfo}>
                          <Text>職業</Text>
                          <Text style={styles.basInfoValue}>
                            {this.state.userData
                              ? this.state.userData.basic_info.work
                              : null}
                          </Text>
                        </View>
                      ) : null}
                    {this.state.userData &&
                      this.state.userData.basic_info.annual_income ? (
                        <View style={styles.basInfo}>
                          <Text>年収</Text>
                          <Text style={styles.basInfoValue}>
                            {this.state.userData
                              ? this.state.userData.basic_info.annual_income
                              : null}
                          </Text>
                        </View>
                      ) : null}
                    {this.state.userData &&
                      this.state.userData.basic_info.educational_background ? (
                        <View style={styles.basInfo}>
                          <Text>学歴</Text>
                          <Text style={styles.basInfoValue}>
                            {this.state.userData
                              ? this.state.userData.basic_info
                                .educational_background
                              : null}
                          </Text>
                        </View>
                      ) : null}
                    {this.state.userData &&
                      this.state.userData.basic_info.place_of_birth ? (
                        <View style={styles.basInfo}>
                          <Text>出生地</Text>
                          <Text style={styles.basInfoValue}>
                            {this.state.userData
                              ? this.state.userData.basic_info.place_of_birth
                              : null}
                          </Text>
                        </View>
                      ) : null}
                    {this.state.userData &&
                      this.state.userData.basic_info.annual_income ? (
                        <View style={styles.basInfo}>
                          <Text>年収</Text>
                          <Text style={styles.basInfoValue}>
                            {this.state.userData
                              ? this.state.userData.basic_info.annual_income
                              : null}
                          </Text>
                        </View>
                      ) : null}
                  </View>
                </View>
                {this.state.tweets &&
                  this.state.tweets.length > 0 &&
                  this.state.tweets[0].id ? (
                    <View style={styles.basicInformationContainer}>
                      <Text style={styles.sheduleText}>最近の役職</Text>
                    </View>
                  ) : null}
                {this.state.tweets &&
                  this.state.tweets.length > 0 &&
                  this.state.tweets[0].id
                  ? this.state.tweets.map(x => (
                    <View key={shortid.generate()}>
                      <Tweet
                        id={x.id}
                        key={() => shortid.generate()}
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
                        onPressUserProfile={() => console.log('')}
                      />
                    </View>
                  ))
                  : null}
                {this.state.userReview.length > 0 && (
                  <View style={{ marginBottom: 10, marginTop: 50 }}>
                    <View
                      style={[
                        styles.basicInformationContainer,
                        { paddingBottom: 10 },
                      ]}>
                      <Text style={styles.sheduleText}>ユーザーレビュー</Text>
                    </View>
                    {this.getUserReview()}
                  </View>
                )}

                <View style={{ marginVertical: 100 }} />
              </View>
            </ScrollView>
          </SafeAreaView>
        ) : null}
        {this.state.userData ? (
          <View style={styles.BottomFixedButton}>
            {this.state.userData && this.state.userData.is_nice == 0 ? (
              <SetpByStepProcess
                title="いいね"
                action={() => this.giveNiceToUser()}
                hideIcon={true}
              />
            ) : (
                <View style={styles.CallingButtonCOntainer}>
                  <TouchableOpacity
                    style={styles.ButtonChat}
                    onPress={() => this.gotoUserDetailsPage()}>
                    <Text style={styles.ButtonChatText}>チャット</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.ButtonChat}
                    onPress={() => this.ReViewUser()}>
                    <Text style={styles.ButtonChatText}>レビュー</Text>
                  </TouchableOpacity>
                </View>
              )}
          </View>
        ) : null}
        <Modal
          isVisible={this.state.userReviewModal}
          onSwipeComplete={() => this.changeStateValue()}
          // swipeDirection={['up', 'left', 'right', 'down']}
          style={styles.ModalView2}>
          <TouchableWithoutFeedback
            onPress={() => this.setState({ userReviewModal: false })}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.content2}>
            <View>
              <Text style={styles.titleText}>ユーザーレビュー</Text>
            </View>
            <View style={styles.ProfileContainer}>
              {this.state.selectedProfileImage ? (
                <Image
                  style={styles.profilePicImage}
                  source={{ uri: this.state.selectedProfileImage }}
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
            <View
              style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
              <Stars
                count={5}
                starSize={200}
                default={this.state.stars}
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
                halfStar={
                  <Icon name={'star-half'} style={[styles.myStarStyle]} />
                }
              />
            </View>
            <View>
              <TextInput
                style={styles.comments}
                placeholder="追加コメント..."
                onChangeText={reViewText => this.setState({ reViewText })}
              />
            </View>
            <View style={styles.optionHolder}>
              <TouchableWithoutFeedback onPress={() => this.GiveReview()}>
                <View
                  style={{
                    ...styles.options,
                    backgroundColor: '#6678AB',
                    color: 'black',
                  }}>
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
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.setState({ userReviewModal: false })}>
                <View style={styles.options}>
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
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>
        <Spinner
          visible={this.state.loading}
          textContent={'読み込み中...'}
          textStyle={styles.spinnerTextStyle}
        />
      </DashBoardHeader>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    castSelectedUser: state.mainReducers.main.castSelectedUser,
    userInfo: state.mainReducers.main.userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(duckOperations, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetails);
