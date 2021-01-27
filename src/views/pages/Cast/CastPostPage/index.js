import React, { Component } from 'react';
import {
  View,
  Alert,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  BackHandler,
  TextInput,
  SafeAreaView
} from 'react-native';
import shortid from 'shortid';
import { Divider } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Icon } from 'react-native-elements';
import DashBoardHeader from '../../../components/DashBoardHeader';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import { showMessage } from 'react-native-flash-message';

import {
  getCastUser,
  postCastUser,
  sendMessageToAdmin,
} from '../../../../services/AuthService';
import { TagSelect } from 'react-native-tag-select';
import styles from './styles';
import StepByStepProcess from '../../../components/StepByStepProcess';
import ProfileGirdElementCast from '../../../components/ProfileGirdElementCast';
import ProfileGirdElementCastGrid from '../../../components/ProfileGirdElementCastGrid';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { duckOperations } from '../../../../redux/Main/duck';
import { TouchableOpacity } from 'react-native-gesture-handler';

class CastPostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      castProcess: 1,
      selectedCastType: 1,
      searchedUser: [],
      tags: [],
      AnonymousCall: false,
      nakanoCall: false,
      tagId: '',
      loading: false,
      thanksModal: false,
      adminMessage: false,
      adminMessageText: '',
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backKeyAction);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backKeyAction);
  }
  getTagsData = () => {
    let tag = '';
    let tags = [];
    let temText = this.tag.itemsSelected;

    temText.map((x, index) => {
      tags.push(x);
      if (index == 0) {
        tag = x.id;
      } else {
        tag = tag + ',' + x.id;
      }
    });
    this.setState({ tags, tagId: tag });
    return tag;
  };
  searchForUser = async () => {
    let temText = this.tag.itemsSelected;
    if (temText === undefined || temText.length == 0) {
      Alert.alert(
        '警告',
        '上から少なくとも1つのタグを選択する必要があります',
        [{ text: 'オーケー', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
      return;
    }

    let main = this.props.route.params.data;
    let data = {
      cast_time: main.cast_time,
      cast_location: main.cast_location,
      people_per_cast: main.people_per_cast,
      // cast_drink_glass: main.cast_drink_glass,
      cast_type: main.cast_type,
      when_call: main.when_call,
      tags: this.getTagsData(),
    };
    this.setState({ loading: true });
    try {
      const response = await getCastUser(data);
      if (response.isSuccess) {
        let users = response.result.users;
        this.setState({ searchedUser: users, castProcess: 2 });
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    } catch {
      this.setState({ loading: false });
    }
  };
  renderListComponent = ({ item }) => {
    if (this.props.userInfo.usr_type != item.usr_type)
      return (
        <ProfileGirdElementCastGrid
          key={shortid.generate()}
          navigation={this.props.navigation}
          data={item}
        />
      );
  };
  renderListComponent1 = ({ item }) => (
    <ProfileGirdElementCast
      key={shortid.generate()}
      navigation={this.props.navigation}
      data={item}
    />
  );
  backKeyAction = () => {
    if (this.state.castProcess == 1) {
      this.props.navigation.goBack();
    } else if (this.state.castProcess == 2) {
      this.setState({ castProcess: 1 });
    } else if (this.state.castProcess == 3) {
      this.setState({ castProcess: 2 });
    } else if (this.state.castProcess == 4) {
      this.setState({ castProcess: 2 });
    }
    return true;
  };
  submitCast = async () => {
    let main = this.props.route.params.data;

    let data = {
      cast_time: main.cast_time,
      cast_location: main.cast_location,
      people_per_cast: main.people_per_cast,
      cast_drink_glass: main.cast_drink_glass,
      point_per_cast: main.point_per_cast,
      cast_type: this.state.selectedCastType,
      tags: this.state.tagId,
      guest_user_id: this.getGuestList(),
      anonymous_call: this.state.AnonymousCall,
      nakano_call: this.state.nakanoCall,
    };
    try {
      const response = await postCastUser(data);
      if (response.isSuccess) {
        // Alert.alert(
        //   '成功',
        //   'カースト予約を作成しました。アカウントをリチャージしてください',
        //   [
        //     {
        //       text: '大丈夫',
        //       onPress: () => this.props.navigation.navigate('DashboardMain'),
        //     },
        //   ],
        //   {cancelable: false},
        // );
        this.setState({ thanksModal: true });
      }
    } catch { }
  };

  getGuestList = () => {
    let text = '';
    this.props.castSelectedUser
      ? this.props.castSelectedUser.map((x, index) => {
        if (index == 0) {
          text = x.id;
        } else {
          text = text + ',' + x.id;
        }
      })
      : null;
    return text;
  };
  closeThank = () => {
    this.setState({ thanksModal: false });
    this.props.navigation.navigate('DashboardMain');
  };

  sendMessageToAdmin = async () => {
    if (
      this.state.adminMessageText &&
      this.state.adminMessageText.length > 10
    ) {
      let data = {
        user_email: this.props.userInfo.usr_email,
        admin_email: 'mk.imaria0819@gmail.com',
        email_head: 'Query Message from Maria user',
        email_body: this.state.adminMessageText,
      };
      try {
        const response = await sendMessageToAdmin(data);
        console.log(response, data, this.props.userInfo);
        if (response.isSuccess) {
          this.setState({ adminMessageText: '', adminMessage: false });
          Alert.alert(
            '成功',
            'メッセージが管理者に送信されました',
            [
              {
                text: '大丈夫',
              },
            ],
            { cancelable: false },
          );
        }
      } catch (error) {
        console.log('re', error);
      }
    } else {
      showMessage({
        message: 'メッセージを空にしたり、10文字以上にすることはできません。',
        type: 'warning',
      });
    }
  };

  render() {
    const CastData = this.props.route.params.showData;
    return (
      <SafeAreaView>
        <DashBoardHeader
          navigation={this.props.navigation}
          backNavigation={true}
          notificationHide={true}
          scrollingOff={true}
          customNavigation={() => this.backKeyAction()}
          title="キャストを呼ぶ"
        >
          {this.state.castProcess == 1 &&
            <View style={styles.container}>
              <ScrollView style={styles.scrollView}>
                <View>
                  <View>
                    <Text style={styles.mainTitleText}>今日の気分は？</Text>
                    <Text>
                      あなたに最適なマッチングをいたします。お好みのタグを選んでください。（複数可）
                  </Text>
                    <View style={[styles.mainRow, styles.paddingTop20]}>
                      <TagSelect
                        data={this.props.castTypeInformations.cast_all_values}
                        labelAttr="value"
                        itemStyle={styles.item}
                        itemLabelStyle={styles.label}
                        itemStyleSelected={styles.itemSelected}
                        itemLabelStyleSelected={styles.labelSelected}
                        ref={tag => { this.tag = tag; }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.scrollingMargin} />
              </ScrollView>
              <View style={styles.stepContainer}>
                <StepByStepProcess
                  title="次に進む (2/4)"
                  action={() => this.searchForUser()}
                />
              </View>
            </View>
          }
          {this.state.castProcess == 2 &&
            <View style={styles.container}>
              <ScrollView style={styles.scrollView}>
                <View>
                  <Text style={styles.mainTitleText}>
                    以下のキャストがあなたの選んだ条件にマッチしました。
                </Text>
                  {/* <Text>
                  あなたに最適なキャストをマッチングいたします。希望があれば優先
                  マッチング希望をしてください。{' '}
                </Text>
                <View style={styles.paddingTop20}>
                  <View style={styles.organgeBgText}>
                    <Text>
                      <Text style={styles.dotTextColor}>●</Text>{' '}
                      優先マッチング希望をすると、キャストに合流したい気持ち
                      が届きますが、マッチングできない場合もありまt
                    </Text>
                    <Text style={styles.paddingTop10}>
                      <Text style={styles.dotTextColor}>●</Text>{' '}
                      優先マッチング希望の成立時には一人あたり別途1時間毎に
                      3.000P発生します。
                    </Text>
                  </View>
                </View>
                <View style={styles.paddingTop20}>
                  <Text style={styles.mainTitleText}>
                    本日優先希望マッチングできるキャスト
                  </Text>
                </View> */}
                </View>
                <View style={styles.paddingTop20}>
                  {this.state.searchedUser ?
                    <FlatList
                      data={this.state.searchedUser}
                      keyExtractor={() => shortid.generate()} //has to be unique
                      renderItem={this.renderListComponent} //method to render the data in the way you want using styling u need
                      horizontal={false}
                      numColumns={2}
                    />
                    :
                    <View style={styles.centerTextConatiner}>
                      <Text style={styles.NoUser}>ユーザーが見つかりません</Text>
                    </View>
                  }
                </View>
                <View style={styles.scrollingMargin} />
              </ScrollView>
              <View style={styles.stepContainer}>
                <StepByStepProcess
                  title="次に進む (3/4)"
                  action={() => this.setState({ castProcess: 4 })}
                />
              </View>
            </View>
          }
          {this.state.castProcess == 3 &&
            <View style={styles.container}>
              <ScrollView style={styles.scrollView}>
                <View>
                  <Text style={styles.mainTitleText}>初回利用の方へ</Text>
                  <Text style={styles.paddingTop5}>
                    キャストを呼ぶうえでの注意事項をご確認ください。
                </Text>
                  <View style={styles.paddingTop40}>
                    <Text style={styles.process3Title}>
                      解散するまでは自動延長
                  </Text>
                    <Text style={styles.paddingTop5}>
                      キャストと合流している時間は、予定時間が過ぎても自動的に延長となり料金が発生しまt延長
                    料金は1名あたり15分3.250Pです。{' '}
                    </Text>
                  </View>
                  <Divider style={styles.dividerStle} />
                  <View style={styles.paddingTop20}>
                    <Text style={styles.process3Title}>
                      キャンセルは有償キャンセル
                  </Text>
                    <Text style={styles.paddingTop5}>
                      予約後のキャンセルは、100％の有償キャンセルとなりますので予め
                      ご了承ください。
                  </Text>
                  </View>
                  <Divider style={styles.dividerStle} />
                  <View style={styles.paddingTop20}>
                    <Text style={styles.process3Title}>
                      0時～6時は深夜手当が発生
                  </Text>
                    <Text style={styles.paddingTop5}>
                      ご利用時間が深夜o-'-,5時を含む場合、キャスト1名当たり別途4
                      000P
                      の深夜手当が発生致しまタクシー代をキャストに渡す必要はあり
                      ません
                  </Text>
                  </View>
                  <Divider style={styles.dividerStle} />
                  <View style={styles.paddingTop20}>
                    <Text style={styles.process3Title}>決済はオートチャージ</Text>
                    <Text style={styles.paddingTop5}>
                      お支払いは、登録いただいたクレジットカードから自動的に
                      3000P(1P=1.1円）単位でオートチャージされます。
                  </Text>
                  </View>
                </View>
                <View style={styles.scrollingMargin} />
              </ScrollView>
              <View style={styles.stepContainer}>
                <StepByStepProcess
                  title="次に進む (4/4)"
                  action={() => this.setState({ castProcess: 4 })}
                />
              </View>
            </View>
          }
          {this.state.castProcess == 4 &&
            <View style={styles.container}>
              <ScrollView style={styles.scrollView}>
                <View>
                  <Text style={styles.mainTitleText}>予約内容をご確認</Text>
                  {/* <View style={styles.ImageBanner}>
                  <Image
                    style={styles.ImageBannerImage}
                    source={require('../../../../assets/profile/partyBanner.png')}
                  />
                </View> */}
                  <View style={styles.SummaryRow}>
                    <View style={styles.leftSummaryRow}>
                      <View style={styles.leftSummaryRowElement}>
                        <AntDesign name="clockcircleo" size={28} color="#000" />
                        <Text style={styles.summaryTitle}>
                          {CastData.when_call}
                        </Text>
                      </View>
                      <View style={styles.leftSummaryRowElement}>
                        <Icon
                          name="glass-cocktail"
                          type="material-community"
                          size={30}
                          color="#484848"
                        />
                        <Text style={styles.summaryTitle}>
                          {CastData.cast_time}
                        </Text>
                      </View>
                      <View style={styles.leftSummaryRowElement}>
                        <Icon
                          name="map-marker-outline"
                          type="material-community"
                          size={30}
                          color="#484848"
                        />
                        <Text style={styles.summaryTitle}>
                          {CastData.cast_location}
                        </Text>
                      </View>
                      <View style={styles.leftSummaryRowElement}>
                        <Icon
                          name="account-outline"
                          type="material-community"
                          size={30}
                          color="#484848"
                        />
                        <Text style={styles.summaryTitle}>
                          {CastData.cast_type}
                          {CastData.people_per_cast}人
                      </Text>
                      </View>
                    </View>
                    {/* <View style={styles.RightSummaryRow}>
                    <AntDesign name="right" size={30} color="#484848" />
                  </View> */}
                  </View>
                  <Divider style={styles.dividerStle} />
                  <View style={styles.paddingTop10}>
                    <Text>今日の気分</Text>
                  </View>
                  <View style={styles.paddingTop20}>
                    <View style={styles.tagConatiner}>
                      {this.state.tags &&
                        this.state.tags.map(x => (
                          <View key={shortid.generate} style={styles.tagValue}>
                            <Text>{x.value}</Text>
                          </View>
                        ))}
                    </View>
                  </View>
                  <Divider style={styles.dividerStle} />
                  {/* <Divider style={styles.dividerStle} /> */}
                  <View style={styles.paddingTop10}>
                    <Text>選択したキャスト</Text>
                  </View>
                  <View style={styles.paddingTop20}>
                    {this.props.castSelectedUser ?
                      <FlatList
                        data={this.props.castSelectedUser}
                        keyExtractor={() => shortid.generate()} //has to be unique
                        renderItem={this.renderListComponent1} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={1}
                      />
                      :
                      <View style={styles.centerTextConatiner}>
                        <Text style={styles.NoUser}>
                          ユーザーが見つかりません
                      </Text>
                      </View>
                    }
                  </View>
                  <Divider style={styles.dividerStle} />
                  <TouchableOpacity
                    style={styles.paddingTop20}
                    onPress={() => this.setState({ adminMessage: !this.state.adminMessage })}
                  >
                    <View style={styles.organgeBgText}>
                      <Text>運営へのご希望があればご記入ください</Text>
                    </View>
                  </TouchableOpacity>
                  {/* <View style={styles.paddingTop20}>
                  <CheckBox
                    title="匿名コール（無料）究叫"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={this.state.AnonymousCall}
                    onPress={() =>
                      this.setState({AnonymousCall: !this.state.AnonymousCall})
                    }
                  />
                  <CheckBox
                    title="匿名コール（無料）究叫"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={this.state.nakanoCall}
                    onPress={() =>
                      this.setState({nakanoCall: !this.state.nakanoCall})
                    }
                  />
                </View> */}
                  <Divider style={styles.dividerStle} />
                  <View style={styles.paddingTop20}>
                    <Text>
                      ご予約の際には料金は発生しません。予約後、15分以内にキャスト
                      を探します。条件に合うキャストが見つかった場合のみ開催が決定
                      され、見つからなかった場合は料金は発生しません
                  </Text>
                  </View>
                </View>
                <View style={styles.scrollingMargin} />
              </ScrollView>
              <View style={styles.stepContainer}>
                <StepByStepProcess
                  title="予約内容をご確認"
                  action={this.submitCast}
                  hideIcon={true}
                />
              </View>
            </View>
          }

          <Modal
            testID={'castTimeModale'}
            isVisible={this.state.thanksModal}
            onSwipeComplete={() => this.closeThank()}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={styles.ModalView}>
            <TouchableWithoutFeedback onPress={() => this.closeThank()}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.content}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Image
                  style={{ width: 200, height: 140 }}
                  source={require('../../../../assets/profile/maria_logo.png')}
                />
              </View>

              <View style={styles.thanksConatiner}>
                <Text style={{ textAlign: 'center', fontSize: 12 }}>
                  Mariaでのご注文ありがとうございます。お希望のキャストが、到着するまで、しばらくお待ちください。
              </Text>
              </View>
            </View>
          </Modal>

          <Modal
            testID={'sendMessageToAdmin'}
            isVisible={this.state.adminMessage}
            onSwipeComplete={() => this.setState({ adminMessage: false })}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={styles.ModalView}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ adminMessage: false })}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.content}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text>メッセージを書いてください</Text>
              </View>
              <View>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.adminMessage}
                  placeholder="管理者に送るメッセージを入力してください..."
                  onChangeText={text => this.setState({ adminMessageText: text })}
                  value={this.state.adminMessageText}
                />
              </View>

              <View style={[styles.thanksConatiner, styles.messageAdminButton]}>
                <StepByStepProcess
                  title="メッセージを送る"
                  action={() => this.sendMessageToAdmin()}
                  hideIcon={true}
                />
              </View>
            </View>
          </Modal>
          <Spinner
            visible={this.state.loading}
            textContent={'読み込み中'}
            textStyle={styles.spinnerTextStyle}
          />
        </DashBoardHeader>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    castTypeInformations: state.mainReducers.main.castTypeInformations,
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
)(CastPostPage);
