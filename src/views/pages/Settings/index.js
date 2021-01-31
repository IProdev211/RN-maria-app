import React, { Component } from 'react';
import { View, Switch, Text, SafeAreaView, Linking } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DashBoardHeader from '../../components/DashBoardHeader';
import SettingTitle from '../../components/SettingTitle';
import SettingElement from '../../components/SettingElement';
import golbalConstants from '../../Common/GlobalStyles/constants';
import {
  getEmailSettings,
  getAppSettings,
  getPrivacySettings,
  updateEmailSetting,
  updateAppSetting,
  updatePrivacySetting,
} from '../../../services/AuthService';
import styles from './styles';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { duckOperations } from '../../../redux/Main/duck';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isEnabled: false,
      emailSetting: {
        footprint_notification: 1,
        how_nice_notification: 1,
        message_notification: 1,
        concierge_message_notification: 1,
        confluence_dissolution_notice: 1,
        automatic_extension_notice: 1,
        good_for_tweets_notification: 1,
        news_from_management: 1,
      },
      appSettings: {
        give_icon_with_money: 1,
        footprint: 1,
        good_for_tweets: 1,
        automatic_extension_notice: 1,
      },
      privacySetting: {
        overall_ranking_setting: 1,
        favorite_ranking: 1,
        tag_settings: 1,
      },
    };
  }
  componentDidMount() {
    this.getEmailSetiing();
    this.getAppSetiing();
    this.getPrivacySetiing();
  }

  getEmailSetiing = async () => {
    try {
      const response = await getEmailSettings();
      this.setState({ emailSetting: response.result.success });
    } catch { }
  };
  getAppSetiing = async () => {
    try {
      const response = await getAppSettings();
      this.setState({ appSettings: response.result.success });
    } catch { }
  };
  getPrivacySetiing = async () => {
    try {
      const response = await getPrivacySettings();
      this.setState({ privacySetting: response.result.success });
    } catch { }
  };
  changeValueSetting = (enitiy, type) => {
    if (type == 'EMAIL') {
      let emailSetting = this.state.emailSetting;
      emailSetting[enitiy] = !emailSetting[enitiy];
      this.setState({ emailSetting: emailSetting });
      let data = {
        [enitiy]: emailSetting[enitiy] ? 1 : 0,
      };
      this.updateEmaillSetting(data);
    } else if (type == 'APP') {
      let appSettings = this.state.appSettings;
      appSettings[enitiy] = !appSettings[enitiy];
      this.setState({ appSettings: appSettings });
      let data = {
        [enitiy]: appSettings[enitiy] ? 1 : 0,
      };
      this.updateAppSetting(data);
    } else if (type == 'PRIVACY') {
      let privacySetting = this.state.privacySetting;
      privacySetting[enitiy] = !privacySetting[enitiy];
      this.setState({ privacySetting: privacySetting });
      let data = {
        [enitiy]: privacySetting[enitiy] ? 1 : 0,
      };
      this.updateprivacySetting(data);
    }
  };

  updateEmaillSetting = async data => {
    try {
      const response = await updateEmailSetting(data);
    } catch { }
  };
  updateAppSetting = async data => {
    try {
      const response = await updateAppSetting(data);
    } catch { }
  };
  updateprivacySetting = async data => {
    try {
      const response = await updatePrivacySetting(data);
    } catch { }
  };

  openTerms = () => {
    Linking.canOpenURL("http://m-maria.net/ryoukiyaku").then(supported => {
      if (supported) {
        Linking.openURL("http://m-maria.net/ryoukiyaku");
      } else {
        showMessage({
          message: 'ブラウザは開けません。',
          type: 'error',
        });
      }
    });
  };

  render() {
    return (
      <SafeAreaView>
        <DashBoardHeader
          backNavigation={true}
          navigation={this.props.navigation}
          title="各種設定"
        >
          <View style={{ backgroundColor: '#fff', marginBottom: 105 }}>
            <SettingTitle text="アプリ通知設定" />
            <SettingElement text="ギフトアイコンを購入する。">
              <Switch
                trackColor={{ false: '#f1f2f3', true: golbalConstants.mainColor }}
                thumbColor={this.state.isEnabled ? '#03A9F5' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.changeValueSetting('give_icon_with_money', 'APP')}
                value={this.state.appSettings.give_icon_with_money ? true : false}
              />
            </SettingElement>
            <SettingElement text="足あと">
              <Switch
                trackColor={{ false: '#f1f2f3', true: golbalConstants.mainColor }}
                thumbColor={this.state.isEnabled ? '#03A9F5' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.changeValueSetting('footprint', 'APP')}
                value={this.state.appSettings.footprint ? true : false}
              />
            </SettingElement>
            <SettingElement text="つぶやきのいいね">
              <Switch
                trackColor={{ false: '#f1f2f3', true: golbalConstants.mainColor }}
                thumbColor={this.state.isEnabled ? '#03A9F5' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.changeValueSetting('good_for_tweets', 'APP')}
                value={this.state.appSettings.good_for_tweets ? true : false}
              />
            </SettingElement>
            <SettingElement text="自動延長通知 ">
              <Switch
                trackColor={{ false: '#f1f2f3', true: golbalConstants.mainColor }}
                thumbColor={this.state.isEnabled ? '#03A9F5' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.changeValueSetting('automatic_extension_notice', 'APP')}
                value={this.state.appSettings.automatic_extension_notice ? true : false}
              />
            </SettingElement>
            <SettingTitle text="メール通知設定" />
            <SettingElement text="メールアドレス">
              <View style={styles.flexDirectionRow}>
                <Text style={styles.settingRightText}>
                  {this.props.userInfo ? this.props.userInfo.usr_email : ''}
                </Text>
                {/* <AntDesign name="right" size={25} color="gray" /> */}
              </View>
            </SettingElement>
            <SettingTitle text="登録されているメールアドレスにメールが送られます。" />

            {/* Email Setting */}
            <SettingElement text="足あと">
              <Switch
                trackColor={{ false: '#f1f2f3', true: golbalConstants.mainColor }}
                thumbColor={this.state.isEnabled ? '#03A9F5' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.changeValueSetting('footprint_notification', 'EMAIL')}
                value={this.state.emailSetting.footprint_notification ? true : false}
              />
            </SettingElement>
            <SettingElement text="いいね ">
              <Switch
                trackColor={{ false: '#f1f2f3', true: golbalConstants.mainColor }}
                thumbColor={this.state.isEnabled ? '#03A9F5' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.changeValueSetting('how_nice_notification', 'EMAIL')}
                value={this.state.emailSetting.how_nice_notification ? true : false}
              />
            </SettingElement>
            <SettingElement text="メッセージ">
              <Switch
                trackColor={{ false: '#f1f2f3', true: golbalConstants.mainColor }}
                thumbColor={this.state.isEnabled ? '#03A9F5' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.changeValueSetting('message_notification', 'EMAIL')}
                value={this.state.emailSetting.message_notification ? true : false}
              />
            </SettingElement>
            <SettingElement text="コンシェルジュのメッセージ">
              <Switch
                trackColor={{ false: '#f1f2f3', true: golbalConstants.mainColor }}
                thumbColor={this.state.isEnabled ? '#03A9F5' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.changeValueSetting('concierge_message_notification', 'EMAIL')}
                value={this.state.emailSetting.concierge_message_notification ? true : false}
              />
            </SettingElement>
            <SettingElement text="合流・解散通知">
              <Switch
                trackColor={{ false: '#f1f2f3', true: golbalConstants.mainColor }}
                thumbColor={this.state.isEnabled ? '#03A9F5' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.changeValueSetting('confluence_dissolution_notice', 'EMAIL')}
                value={this.state.emailSetting.confluence_dissolution_notice ? true : false}
              />
            </SettingElement>
            <SettingElement text="自動延長通知">
              <Switch
                trackColor={{ false: '#f1f2f3', true: golbalConstants.mainColor }}
                thumbColor={this.state.isEnabled ? '#03A9F5' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.changeValueSetting('automatic_extension_notice', 'EMAIL')}
                value={this.state.emailSetting.automatic_extension_notice ? true : false}
              />
            </SettingElement>
            <SettingElement text="つぶやきのいいね">
              <Switch
                trackColor={{ false: '#f1f2f3', true: golbalConstants.mainColor }}
                thumbColor={this.state.isEnabled ? '#03A9F5' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.changeValueSetting('good_for_tweets_notification', 'EMAIL')}
                value={this.state.emailSetting.good_for_tweets_notification ? true : false}
              />
            </SettingElement>
            <SettingElement text="運営からのお知らせ">
              <Switch
                trackColor={{ false: '#f1f2f3', true: golbalConstants.mainColor }}
                thumbColor={this.state.isEnabled ? '#03A9F5' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.changeValueSetting('news_from_management', 'EMAIL')}
                value={this.state.emailSetting.news_from_management ? true : false}
              />
            </SettingElement>
            {/* Email Setting */}

            <SettingTitle text="プライベート設定" />
            <SettingElement text="全体ランキング設定">
              <Switch
                trackColor={{ false: '#f1f2f3', true: golbalConstants.mainColor }}
                thumbColor={this.state.isEnabled ? '#03A9F5' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.changeValueSetting('overall_ranking_setting', 'PRIVACY')}
                value={this.state.privacySetting.overall_ranking_setting ? true : false}
              />
            </SettingElement>
            <SettingElement text="（おきにいり）ランキング">
              <Switch
                trackColor={{ false: '#f1f2f3', true: golbalConstants.mainColor }}
                thumbColor={this.state.isEnabled ? '#03A9F5' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.changeValueSetting('favorite_ranking', 'PRIVACY')}
                value={this.state.privacySetting.favorite_ranking ? true : false}
              />
            </SettingElement>
            <SettingTitle text="キャストのプロフィールに載っている（おきにいり）ランキングで 匿名表示になります。" />
            <SettingTitle text="フィーバーズ設定" />
            <SettingElement text="タグ設定">
              <Switch
                trackColor={{ false: '#f1f2f3', true: golbalConstants.mainColor }}
                thumbColor={this.state.isEnabled ? '#03A9F5' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.changeValueSetting('tag_settings', 'PRIVACY')}
                value={this.state.privacySetting.tag_settings ? true : false}
              />
            </SettingElement>

            <SettingTitle text="利用規約" />
            <TouchableOpacity
              style={styles.terms}
              onPress={this.openTerms}
            >
              <Text>利用規約</Text>
            </TouchableOpacity>

            {/* <SettingTitle text="オフにすると、タグづけされた時に許可通知がくるようになります" /> */}
          </View>
        </DashBoardHeader>
      </SafeAreaView>
    );
  }
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
)(Settings);

// footprint_notification: false
// how_nice_notification: 1
// message_notification: 1
// concierge_message_notification: 1
// confluence_dissolution_notice: 1
// automatic_extension_notice: 1
// good_for_tweets_notification: 1
// news_from_management: 1

// footprint: 1
// good_for_tweets: 1
// automatic_extension_notice: 1

// overall_ranking_setting: 1
// favorite_ranking: 1
// tag_settings: 1
