import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import DashBoardHeader from '../../../components/DashBoardHeader';
import { getSignleUserInfo } from '../../../../services/AuthService';
import { Divider } from 'react-native-elements';
import styles from './styles';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Tweet from '../../../components/Tweet';
import Stars from 'react-native-stars';
import shortid from 'shortid';
import Spinner from 'react-native-loading-spinner-overlay';

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
      addCast: false,
      userReview: [],
      profileImageArray: [],
    };
  }
  componentDidMount() {
    this.getSigleUserData();
  }
  componentDidUpdate() { }
  componentWillUnmount() { }

  getSigleUserData = async () => {
    this.setState({ loading: true });
    try {
      const response = await getSignleUserInfo(this.props.route.params.userId);
      if (response.isSuccess) {
        this.setState({ loading: false });
        let data = response.result.success;
        this.setState({
          userData: response.result.success,
          userReview: response.result.success.review_list,
          selectedProfileImage:
            response.result.success.usr_profile_photo[0].picture_url,
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
      console.log(this.state.userData, this.state.selectedProfileImage);
    } catch {
      this.setState({ loading: false });
    }
  };

  SelectForProfile = async status => {
    this.setState({ addCast: true });
    // this.props.addUserForCast(this.state.userData, status);
    // this.forceUpdate();
  };
  wantToCallThisCast = () => {
    this.setState({ addCast: true });
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
  checkUserAlreadyAddedOrNot = () => {
    let find = this.props.castSelectedUser.filter(
      x => x.id == this.props.route.params.userId,
    );
    if (find.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  goBackFuction = () => {
    this.props.route.params.onGoBack();
    this.props.navigation.goBack();
  };
  onSentMessage = () => {
    if (
      this.props.userInfo &&
      this.props.userInfo.last_deposite_balance != '0'
    ) {
      this.props.navigation.push('MessageDetails', {
        user_id: this.props.route.params.userId,
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
                  default={item.review_star ? item.review_star : 0}
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
    return (
      <DashBoardHeader
        navigation={this.props.navigation}
        addTweet={false}
        backNavigation={true}
        title="ユーザーの詳細"
        scrollingOff={true}
        notificationHide={true}
      >
        {/* <StatusBar backgroundColor="blue" hidden={true} /> */}
        {this.state.userData &&
          <SafeAreaView style={styles.Ccontainer}>
            <ScrollView style={styles.scrollView}>
              <View style={styles.bgColor}>
                <ImageBackground
                  source={
                    this.state.selectedProfileImage
                      ? { uri: this.state.selectedProfileImage }
                      : require('../../../../assets/profile/blackG.png')
                  }
                  style={styles.image}
                >
                  <View style={styles.profileimagw}>
                    <Image
                      style={{ height: 400, width: '100%' }}
                      source={require('../../../../assets/profile/blackG.png')}
                    />
                    <View style={styles.BackButtonContainer}>
                      {/* <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon name="chevron-left" size={30} color="#fff" />
                      </TouchableOpacity> */}
                      {this.state.userData &&
                        <Text style={styles.userClass}>
                          {this.state.userData.user_class}
                        </Text>
                      }
                    </View>
                    <View style={styles.profileTextContainer}>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.circle} />
                        <Text numberOfLines={1} style={styles.textOnImage}>
                          {this.state.userData && this.state.userData.usr_nickname}
                        </Text>
                        {!this.state.userData.guest_verified &&
                          <Octicons
                            name={'verified'}
                            style={styles.verifiedStyle}
                          />
                        }
                      </View>
                      {this.state.userData &&
                        <Text style={styles.subText}>
                          {this.state.userData.todays_message}
                        </Text>
                      }
                    </View>
                  </View>
                </ImageBackground>
                <View style={styles.ImageContainer}>
                  {Array.isArray(this.state.profileImageArray) &&
                    this.state.profileImageArray.map((x, index) => {
                      let ImageUrl = x.picture_url;
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => this.setState({ selectedProfileImage: ImageUrl, selectedImageIndex: index })}>
                          <Image
                            key={index}
                            style={[styles.imageStyle, this.state.selectedImageIndex == index ? styles.SelectedImage : null]}
                            source={{ uri: ImageUrl }}
                          />
                        </TouchableOpacity>
                      );
                    })
                  }
                </View>
                <Divider style={styles.DividerClass} />
                <View style={styles.basicInformationContainer}>
                  <View style={styles.basicInformation}>
                    <Text style={styles.basicInformationText}>
                      獲得ポイント
                    </Text>
                    <Text style={styles.basicInformationText}>
                      <Text style={styles.basicInformationTextPrice}>
                        12,500P
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.basicInformation}>
                    <Text>30分あたりの料金</Text>
                    <Text style={styles.basicInformationTextPrice}>
                      {this.state.userData ? this.state.userData.usr_hourly_rate : 0}P
                    </Text>
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
                <View style={[styles.basicInformationContainer, styles.paddingBottom50]}>
                  <Text style={styles.sheduleText}>基本情報</Text>
                  <View style={styles.paddingTop20}>
                    {this.state.userData && this.state.userData.basic_info.height &&
                      <View style={styles.basInfo} key={shortid.generate()}>
                        <Text>身長</Text>
                        <Text style={styles.basInfoValue}>
                          {this.state.userData && this.state.userData.basic_info.height}
                        </Text>
                      </View>
                    }
                    {this.state.userData && this.state.userData.basic_info.location &&
                      <View style={styles.basInfo} key={shortid.generate()}>
                        <Text>居住地</Text>
                        <Text style={styles.basInfoValue}>
                          {this.state.userData && this.state.userData.basic_info.location}
                        </Text>
                      </View>
                    }
                    {this.state.userData && this.state.userData.basic_info.sake_drink &&
                      <View style={styles.basInfo} key={shortid.generate()}>
                        <Text>タバコ</Text>
                        <Text style={styles.basInfoValue}>
                          {this.state.userData && this.state.userData.basic_info.sake_drink}
                        </Text>
                      </View>
                    }
                    {this.state.userData && this.state.userData.basic_info.smoking &&
                      <View style={styles.basInfo} key={shortid.generate()}>
                        <Text>同居人</Text>
                        <Text style={styles.basInfoValue}>
                          {this.state.userData && this.state.userData.basic_info.smoking}
                        </Text>
                      </View>
                    }
                    {this.state.userData && this.state.userData.basic_info.hair_color &&
                      <View style={styles.basInfo} key={shortid.generate()}>
                        <Text>髪の色</Text>
                        <Text style={styles.basInfoValue}>
                          {this.state.userData && this.state.userData.basic_info.hair_color}
                        </Text>
                      </View>
                    }
                    {this.state.userData && this.state.userData.basic_info.hair_style &&
                      <View style={styles.basInfo} key={shortid.generate()}>
                        <Text>髪型</Text>
                        <Text style={styles.basInfoValue}>
                          {this.state.userData && this.state.userData.basic_info.hair_style}
                        </Text>
                      </View>
                    }
                    {this.state.userData && this.state.userData.basic_info.work &&
                      <View style={styles.basInfo} key={shortid.generate()}>
                        <Text>職業</Text>
                        <Text style={styles.basInfoValue}>
                          {this.state.userData && this.state.userData.basic_info.work}
                        </Text>
                      </View>
                    }
                    {this.state.userData && this.state.userData.basic_info.annual_income &&
                      <View style={styles.basInfo} key={shortid.generate()}>
                        <Text>年収</Text>
                        <Text style={styles.basInfoValue}>
                          {this.state.userData && this.state.userData.basic_info.annual_income}
                        </Text>
                      </View>
                    }
                    {this.state.userData && this.state.userData.basic_info.educational_background &&
                      <View style={styles.basInfo} key={shortid.generate()}>
                        <Text>学歴</Text>
                        <Text style={styles.basInfoValue}>
                          {this.state.userData && this.state.userData.basic_info.educational_background}
                        </Text>
                      </View>
                    }
                    {this.state.userData && this.state.userData.basic_info.place_of_birth &&
                      <View style={styles.basInfo} key={shortid.generate()}>
                        <Text>出生地</Text>
                        <Text style={styles.basInfoValue}>
                          {this.state.userData && this.state.userData.basic_info.place_of_birth}
                        </Text>
                      </View>
                    }
                  </View>
                </View>
                {this.state.tweets && this.state.tweets.length > 0 && this.state.tweets[0].id &&
                  <View style={styles.basicInformationContainer}>
                    <Text style={styles.sheduleText}>最近のつぶやき</Text>
                  </View>
                }
                {this.state.tweets && this.state.tweets.length > 0 && this.state.tweets[0].id &&
                  this.state.tweets.map(x => (
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
                      />
                    </View>
                  ))
                }
                {this.state.userReview.length > 0 &&
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
                }
                <View style={styles.scrollingOff} />
              </View>
            </ScrollView>
          </SafeAreaView>
        }

        <View style={styles.BottomFixedButton}>
          <View style={styles.CallingButtonCOntainer}>
            <TouchableOpacity
              style={styles.ButtonChat}
              onPress={() => this.onSentMessage()}
            >
              <Text style={styles.ButtonChatText}>チャット</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ButtonChat}
              onPress={() => this.wantToCallThisCast()}
            >
              <Text style={styles.ButtonChatText}>ビデオ通話</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Modal
          testID={'castTimeModale'}
          isVisible={this.state.addCast}
          onSwipeComplete={() => this.setState({ addCast: false })}
          swipeDirection={['up', 'left', 'right', 'down']}
          style={styles.ModalView}
        >
          <TouchableWithoutFeedback onPress={() => this.setState({ addCast: false })}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.content}>
            <Text style={styles.basicInformationTextPrice}>
              このユーザーに電話をかけますか？
              {/* {this.checkUserAlreadyAddedOrNot()
                ? ''
                : 'あなたはこのキャストを呼びますか？'} */}
            </Text>
            <View style={styles.AddCastContainer}>
              <TouchableWithoutFeedback onPress={() => this.videoCall()}>
                <View style={styles.AddCastContainerButton}>
                  <Text>はい</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.setState({ addCast: false })}>
                <View style={styles.AddCastContainerButtonNo}>
                  <Text>キャンセル</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>

        <Spinner visible={this.state.loading} />
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
