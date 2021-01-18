import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Platform,
  BackHandler,
  Alert,
  NativeModules,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import DatePicker from 'react-native-date-picker';
import BgComponent from '../../components/BgComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import HeaderWithCross from '../../components/HeaderWithCross';
import SetpByStepProcess from '../../components/SetpByStepProcess';
import NetInfo from '@react-native-community/netinfo';
import { TagSelect } from 'react-native-tag-select';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import LinearGradient from 'react-native-linear-gradient';
// import InstagramLogin from 'react-native-instagram-login';
import golbalConstants from '../../Common/GlobalStyles/constants';
import SplashScreen from 'react-native-splash-screen';
import ImageResizer from 'react-native-image-resizer';
import styles from './styles';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {
  LoginApi,
  wantInterView,
  uploadProfileImage,
  updateUserInfo,
  uploadAgeEvidence,
  addNewCity,
  loginWithEmailAddress,
  verifyEmailAddress,
} from '../../../services/AuthService';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { duckOperations } from '../../../redux/Main/duck';

const { RNTwitterSignIn } = NativeModules;

const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: 'qWPj1TXbreMX1SsDvdiQTaF7Y', //need to set twitter consumer key
  TWITTER_CONSUMER_SECRET: '4t0cRfGWXZvySIa5sS0M38AnT8a8B8hwcX2lZiaStSWStD4B4Z', //need to set the Secret
};

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      registrationStage: 0,
      emailAddress: '',
      otpCode: '',
      selectedGender: 0,
      process5Selected: 0,
      selectedCity: null,
      nickName: '',
      profileImage: '',
      userImage: '',
      loading: false,
      userInfo: {},
      selectedCityName: '',
      birthday: new Date(),
      hourlyRate: '',
      interViewCall: 1,
      DateProfImageUri: '',
      DateProfImagePath: '',
      addCity: '',
      customEmail: '',
      photoDocument: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    GoogleSignin.configure({
      scopes: [],
      webClientId:
        '215846442436-i26hss75lko1c8vp4aqckmkime1fsl6k.apps.googleusercontent.com',
      offlineAccess: false,
      iosClientId:
        '215846442436-i1l7ajf3bla86u437rk5k42l9h30j38t.apps.googleusercontent.com',
    });
    SplashScreen.hide();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    Alert.alert(
      'アプリケーションを終了する',
      'アプリケーションを終了しますか？はいを選択した場合、以下のオプションから選択してくださいアプリは閉じられます。',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => BackHandler.exitApp() },
      ],
    );
    return true;
  }
  changeGender = data => {
    this.setState({ selectedGender: data });
  };
  emailValidation = inputtxt => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(inputtxt);
  };
  selectedCity = (city, selectedCityName) => {
    this.setState({ selectedCity: city, selectedCityName });
  };
  selectedCityOption = () => {
    if (this.state.selectedCityName) {
      this.setState({ registrationStage: 4 });
    } else {
      showMessage({
        message: '都市を選択してください',
        type: 'error',
      });
    }
  };
  changeNickName = () => {
    if (this.state.nickName) {
      this.setState({ registrationStage: 7 });
      // this.chooseOption();
    } else {
      showMessage({
        message: 'ニックネームを入力してください',
        type: 'error',
      });
    }
  };
  changeGenderFunction = () => {
    this.setState({ registrationStage: 5 });
  };
  changeHourlyRate = () => {
    if (!this.state.hourlyRate && this.state.hourlyRate == '') {
      showMessage({
        message: '時間別フィールドは空にできません',
        type: 'error',
      });
    } else {
      this.setState({ registrationStage: '6b' });
    }
  };
  imagePickerForDateValidationImage = () => {
    const options = {
      title: 'プロフィール画像をアップロード',
      takePhotoButtonTitle: '撮影する',
      chooseFromLibraryButtonTitle: '写真ライブラリから',
      cancelButtonTitle: 'キャンセル',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          DateProfImageUri: source.uri,
          DateProfImagePath: response.path,
        });
        this.setState({ photoDocument: false });
        this.reSizeUploadImage(response);
      }
    });
  };
  reSizeUploadImage = async data => {
    await ImageResizer.createResizedImage(data.uri, 500, 500, 'JPEG', 20, 0)
      .then(compressedImage => {
        this.uploaduAgeEvidence(compressedImage);
      })
      .catch(err => {
        console.log(err);
      });
  };
  uploaduAgeEvidence = async data => {
    try {
      let uriParts = data.name.split('.');
      let fileType = uriParts[uriParts.length - 1];
      let response = await uploadAgeEvidence(
        {},
        data.uri,
        `image/${fileType ? fileType : 'png'}`,
        `files.${fileType ? fileType : 'png'}`,
      );
      if (response && response.isSuccess) {
        showMessage({
          message: '年齢識別写真のアップロードの成功',
          type: 'success',
        });
        this.setState({ photoDocument: true });
      } else {
        this.setState({ loading: false });
      }
    } catch (errors) {
      console.log('Image Upload error', errors);
      this.setState({ loading: false });
      showMessage({
        message: '間違ったコードを入力しました',
        type: 'error',
      });
    }
  };
  imagePickerForProfileImage = () => {
    const options = {
      title: 'プロフィール画像をアップロード',
      takePhotoButtonTitle: '撮影する',
      chooseFromLibraryButtonTitle: '写真ライブラリから',
      cancelButtonTitle: 'キャンセル',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(response);
        this.setState({
          profileImage: source.uri,
          process6ImagePath: response.path,
        });
      }
    });
  };
  updateProfile = () => {
    if (this.state.profileImage && this.state.process6ImagePath) {
      this.uploadImages(this.state.profileImage);
    } else {
      this.setState({ userImage: this.state.profileImage });
      this.updateProfileInformation();
    }
  };
  uploadImages = async data => {
    try {
      this.setState({ loading: true });
      let uriParts = this.state.process6ImagePath.split('.');
      let fileType = uriParts[uriParts.length - 1];
      let response = await uploadProfileImage(
        {},
        data.uri,
        `image/${fileType ? fileType : 'png'}`,
        `files.${fileType ? fileType : 'png'}`,
      );
      console.log('Image up', response);
      if (response && response.isSuccess) {
        console.log('Image up', response);
        this.setState({ userImage: response.result.success.profile_pic });
        this.updateProfileInformation();
      } else {
        this.setState({ loading: false });
      }
    } catch (errors) {
      console.log('Image Upload error', errors);
      this.setState({ loading: false });
      showMessage({
        message: '間違ったコードを入力しました',
        type: 'error',
      });
    }
  };
  updateProfileInformation = async () => {
    var username = this.state.customEmail.match(/^([^@]*)@/)[1];
    try {
      let data = {
        usr_nickname: this.state.nickName,
        usr_city: this.state.selectedCityName,
        usr_gender: this.state.selectedGender,
        usr_profile_photo: this.state.profileImage,
        usr_name: this.state.userInfo
          ? this.state.userInfo.name
            ? this.state.userInfo.name
            : username
          : '',
        usr_birth_date: this.state.birthday,
        usr_hourly_rate: this.state.hourlyRate ? this.state.hourlyRate : 0,
      };
      // console.log(data);
      // if (this.state.interViewCall) {
      //   this.InterViewRequest();
      // }
      let response = await updateUserInfo(data);
      console.log('-- profile update : ', response, data);
      if (response.isSuccess) {
        this.setState({ loading: false });
        this.props.navigation.navigate('InitialLoader');
        showMessage({
          message: '4桁のコードが携帯電話に送信されました。',
          type: 'success',
        });
      } else {
        this.setState({ loading: false });
        showMessage({
          message: '問題が発生しました。電話番号を確認してください！',
          type: 'error',
        });
      }
    } catch (errors) {
      console.log('profile Update error', errors);
      showMessage({
        message:
          'インターネットに接続されていません。接続を確認してください ！',
        type: 'error',
      });
    }
  };
  loginApi = async (userInfo, type) => {
    this.props.changeSignInMethod(type);
    if (userInfo && userInfo.picture.data.url) {
      this.setState({ profileImage: userInfo.picture.data.url });
    }
    if (userInfo && userInfo.name) {
      this.setState({ nickName: userInfo.name });
    }
    try {
      let email =
        userInfo && userInfo.email ? userInfo.email : 'nazmurklk23@1.com';
      let data = {
        usr_email: email,
      };
      this.setState({ customEmail: email });
      let response = await LoginApi(data);
      if (response) {
        this.setState({ loading: false });
        showMessage({
          message: 'ログイン成功',
          type: 'success',
        });
        await AsyncStorage.setItem('userToken', response.result.success.token);
        let existing_user = Number(response.result.success.existing_user);
        if (existing_user == 1) {
          this.props.navigation.push('InitialLoader');
        } else {
          this.setState({ registrationStage: 2 });
        }
      } else {
        this.setState({ loading: false });
        showMessage({
          message:
            'アカウントは管理者によってブロックされています。詳細については、管理者にお問い合わせください。',
          type: 'error',
        });
      }
    } catch (errors) {
      console.log('profile Update error', errors);
      showMessage({
        message: 'インターネット接続を確認してください！',
        type: 'error',
      });
    }
  };

  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string:
          'id, name,  first_name, last_name, email, gender, picture.type(large)',
      },
    };
    console.log(PROFILE_REQUEST_PARAMS);
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          this.loginApi(result, 'fb');
          this.setState({ userInfo: result });
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  loginWithFacebook = () => {
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      login => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            this.getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  logoutWithFacebook = () => {
    LoginManager.logOut();
    console.log('logged Out');
  };

  loginWithTwitter = () => {
    RNTwitterSignIn.init(
      Constants.TWITTER_COMSUMER_KEY,
      Constants.TWITTER_CONSUMER_SECRET,
    );
    RNTwitterSignIn.logIn()
      .then(loginData => {
        console.log(loginData);
        const { authToken, authTokenSecret } = loginData;
        if (authToken && authTokenSecret) {
          //if successfull
        }
      })
      .catch(error => {
        console.log('Login fail with error: ', error);
      });
  };
  logoutWithTwitter = () => {
    console.log('logout');
    RNTwitterSignIn.logOut();
  };
  changeDate = () => {
    if (this.state.DateProfImageUri) {
      this.setState({ registrationStage: 3 });
    } else {
      showMessage({
        message:
          '運転免許証またはパスポートをあなたの年齢の教授にアップロードする必要があります',
        type: 'error',
      });
    }
  };
  chooseOption = () => {
    if (this.state.selectedGender == 1) {
      this.setState({ registrationStage: '6a' });
    } else {
      this.setState({ registrationStage: 7 });
    }
  };

  InterViewRequest = async () => {
    try {
      let data = {
        want_interview: 1,
      };
      const response = await wantInterView(data);
      console.log(response);
    } catch { }
  };
  signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo) {
        let userData = userInfo.user;
        let data = {
          email: userData.email,
          first_name: userData.givenName,
          id: userData.id,
          last_name: userData.familyName,
          name: userData.name,
          picture: { data: { url: userData.photo } },
        };
        this.loginApi(data, 'google');
        this.setState({ userInfo: data });
      }
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        showMessage({
          message: 'SIGN_IN_CANCELLED',
          type: 'warning',
        });
      } else if (error.code === statusCodes.IN_PROGRESS) {
        showMessage({
          message: 'IN_PROGRESS',
          type: 'warning',
        });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showMessage({
          message: 'PLAY_SERVICES_NOT_AVAILABLE',
          type: 'warning',
        });
      } else {
        showMessage({
          message: 'UNKNOWN_ERROR',
          type: 'warning',
        });
      }
    }
  };
  addNewCity = async () => {
    if (!this.state.addCity) {
      showMessage({
        message: '都市名は短すぎたり空にしたりすることはできません',
        type: 'warning',
      });
    } else {
      let data = {
        city_name: this.state.addCity,
      };
      this.setState({ Spinner: true });
      try {
        const response = await addNewCity(data);
        this.setState({ Spinner: false, addCity: '' });
        showMessage({
          message: '都市が追加されました上記から選択してください',
          type: 'success',
        });
        if (response.isSuccess) {
          this.props.addCites(response.result.city_list);
        }
      } catch {
        this.setState({ Spinner: false, addCity: '' });
        showMessage({
          message: 'この都市を追加できません。別の都市をお試しください',
          type: 'error',
        });
      }
    }
  };
  loginWithEmailCheckInternetStatus = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.loginWithEmail();
      } else {
        showMessage({
          message: 'No Internet Connection !',
          type: 'error',
          backgroundColor: 'red',
        });
        return false;
      }
    });
  };
  loginWithEmail = async () => {
    if (!this.emailValidation(this.state.emailAddress)) {
      showMessage({
        message: '正しいメールアドレスを入力してください',
        type: 'warning',
      });
    } else {
      let data = {
        usr_email: this.state.emailAddress.toLowerCase(),
      };
      this.setState({ loading: true });
      try {
        const response = await loginWithEmailAddress(data);
        console.log('Login With Email step  one', response);
        this.setState({ loading: false });
        if (response.isSuccess) {
          showMessage({
            message: 'メールアドレスにワンタイムパスワードを送信しました',
            type: 'success',
          });
          this.setState({ registrationStage: '1a' });
        } else {
          showMessage({
            message: '問題が発生しました',
            type: 'warning',
          });
        }
      } catch {
        this.setState({ loading: false });
        showMessage({
          message: 'インターネットに接続されていません。接続を確認してください',
          type: 'error',
        });
      }
    }
  };

  VerifyEmail = async () => {
    if (!this.state.otpCode) {
      showMessage({
        message: 'メールから正しいコードを挿入してください',
        type: 'warning',
      });
    } else {
      let data = {
        usr_email: this.state.emailAddress,
        code: this.state.otpCode,
      };
      this.setState({ loading: true });
      try {
        const response = await verifyEmailAddress(data);
        this.setState({ loading: false });
        console.log('Login With Email step  two', data, response);
        if (response) {
          if (response.status === 401) {
            showMessage({
              message: '不正なコード',
              type: 'error',
            });
          } else {
            showMessage({
              message: 'メールの確認が完了しました',
              type: 'success',
            });
            let data = {
              email: this.state.emailAddress,
              first_name: null,
              id: null,
              last_name: null,
              name: null,
              picture: { data: { url: null } },
            };
            this.setState({ emailAddress: '', otpCode: '' });
            this.setState({ userInfo: data, registrationStage: 0 });
            this.loginApi(data, 'email');
          }
        }
      } catch {
        this.setState({ loading: false });
        showMessage({
          message: 'インターネットに接続されていません。接続を確認してください',
          type: 'error',
        });
      }
    }
  };

  render() {
    return (
      <BgComponent>
        <View style={styles.mainWrapper}>
          {/* registartion stage 0 */}
          {this.state.registrationStage == 0 ? (
            <SafeAreaView style={styles.containerLog}>
              <ScrollView style={styles.scrollView}>
                <View style={styles.pading20}>
                  <View style={styles.topLogoSection}>
                    <Image
                      style={styles.logo}
                      source={require('../../../assets/maria_logo_white.png')}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <View style={styles.textSectionRow}>
                      <View style={styles.textSectionRowIcon}>
                        <Icon
                          name="leaf"
                          size={50}
                          color={golbalConstants.mainColor}
                        />
                      </View>
                      <View style={styles.textSectionRowText}>
                        <Text
                          adjustsFontSizeToFit
                          style={styles.textSectionRowTextMain}>
                          領収書発行が可能
                        </Text>
                        <Text
                          adjustsFontSizeToFit
                          style={styles.textSectionRowTextSub}>
                          アプリ内で領収書の発行ができるので
                        </Text>
                        <Text
                          adjustsFontSizeToFit
                          style={styles.textSectionRowTextSub}>
                          会社の設定としてご利用できます。
                        </Text>
                      </View>
                    </View>
                    <View style={styles.textSectionRow}>
                      <View style={styles.textSectionRowIcon}>
                        <Icon
                          name="wechat"
                          size={50}
                          color={golbalConstants.mainColor}
                        />
                      </View>
                      <View style={styles.textSectionRowText}>
                        <Text
                          adjustsFontSizeToFit
                          style={styles.textSectionRowTextMain}>
                          24時間365日のサポート
                        </Text>
                        <Text
                          adjustsFontSizeToFit
                          style={styles.textSectionRowTextSub}>
                          コンシェルジュが24時間365日対応中。
                        </Text>
                        <Text style={styles.textSectionRowTextSub}>
                          あなたの最高の体験をサポートします。
                        </Text>
                      </View>
                    </View>
                    <View style={styles.textSectionRow}>
                      <View style={styles.textSectionRowIcon}>
                        <Icon
                          name="ravelry"
                          size={50}
                          color={golbalConstants.mainColor}
                        />
                      </View>
                      <View style={styles.textSectionRowText}>
                        <Text style={styles.textSectionRowTextMain}>
                          あなたのタイプに最適化
                        </Text>
                        <Text style={styles.textSectionRowTextSub}>
                          使えば使うほどあなたのタイプを学習
                        </Text>
                        <Text style={styles.textSectionRowTextSub}>
                          して、最適なマッチングを提供します。
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.botomActionSection}>
                    <TouchableOpacity
                      onPress={() => this.setState({ registrationStage: 1 })}
                      style={[
                        styles.loginWithFb,
                        styles.email,
                        styles.shadowButton,
                      ]}>
                      <View style={styles.loginWithFbIcon}>
                        <Icon2 name="email" size={30} color="#fff" />
                      </View>
                      <View style={styles.loginWithFbText}>
                        <Text style={styles.loginWithFbTextMain}>
                          メールでログイン
                        </Text>
                        <Text style={styles.loginWithFbTextSub}>
                          メールアドレスによる認証
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View>
                      <LinearGradient
                        colors={[
                          '#0394fd',
                          '#2183fe',
                          '#4d68ff',
                          '#a231ff',
                          '#c640c3',
                          '#eb499c',
                          '#fb5084',
                          '#ff6672',
                        ]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.linearGradient}>
                        <TouchableOpacity
                          onPress={() => {
                            this.loginWithFacebook();
                          }}
                          style={[styles.loginWithRadiunt, styles.shadowButton]}>
                          <View style={styles.loginWithFbIcon}>
                            <Icon name="facebook-f" size={40} color="#fff" />
                          </View>
                          <View style={styles.loginWithFbText}>
                            <Text style={styles.loginWithFbTextMain}>
                              Facebookではじめる
                            </Text>
                            <Text style={styles.loginWithFbTextSub}>
                              SNS上には一切表示投稿されません
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        this.signInGoogle();
                      }}
                      style={[
                        styles.loginWithFb,
                        styles.google,
                        styles.shadowButton,
                      ]}>
                      <View style={styles.loginWithFbIcon}>
                        <Icon name="google" size={35} color="#EB4335" />
                      </View>
                      <View style={styles.loginWithFbText}>
                        <Text style={styles.loginWithSMSTextMain}>
                          Googleではじめる
                        </Text>
                        <Text style={styles.loginWithFbTextSubBlack}>
                          SNS上には一切表示投稿されません
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                      onPress={() => {
                        this.loginApi(null);
                      }}
                      style={[
                        styles.loginWithFb,
                        styles.line,
                        styles.shadowButton,
                      ]}>
                      <View style={styles.loginWithFbIcon}>
                        <Icon2 name="line" size={30} color="#fff" />
                      </View>
                      <View style={styles.loginWithFbText}>
                        <Text style={styles.loginWithFbTextMain}>
                          Lineではじめる
                        </Text>
                        <Text style={styles.loginWithFbTextSub}>
                          SNS上には一切表示投稿されません
                        </Text>
                      </View>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity
                      onPress={() => {
                        this.loginWithTwitter();
                      }}
                      style={[
                        styles.loginWithFb,
                        styles.twitter,
                        styles.shadowButton,
                      ]}>
                      <View style={styles.loginWithFbIcon}>
                        <Icon name="twitter" size={40} color="#fff" />
                      </View>
                      <View style={styles.loginWithFbText}>
                        <Text style={styles.loginWithFbTextMain}>
                          Twitterではじめる
                        </Text>
                        <Text style={styles.loginWithFbTextSub}>
                          SNS上には一切表示投稿されません
                        </Text>
                      </View>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          ) : null}
          {/* Process 2 */}
          {this.state.registrationStage == 1 ? (
            <View style={styles.stageOneStyle}>
              <HeaderWithCross
                title="メールでログイン"
                acion={() => this.setState({ registrationStage: 0 })}
                acionBackKey={() => this.setState({ registrationStage: 0 })}
                activeBack={true}
              />
              <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                  <View style={styles.padding20}>
                    <View>
                      <Text style={styles.textSection5}>メール認証</Text>
                      <Text style={styles.textSection5Small}>
                        以下にメールアドレスを入力してください。OTPが送信されます。
                      </Text>
                    </View>
                    <View style={styles.paddingTop20}>
                      <TextInput
                        placeholder={'電子メールアドレス'}
                        style={styles.process5TextInput}
                        value={this.state.emailAddress}
                        onChangeText={emailAddress =>
                          this.setState({ emailAddress })
                        }
                      />
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
              <SetpByStepProcess
                title="参加する"
                action={() => this.loginWithEmailCheckInternetStatus()}
              />
            </View>
          ) : null}
          {this.state.registrationStage == '1a' ? (
            <View style={styles.stageOneStyle}>
              <HeaderWithCross
                title="Eメールを確認します"
                acion={() => this.setState({ registrationStage: 0 })}
                acionBackKey={() => this.setState({ registrationStage: 1 })}
                activeBack={true}
              />
              <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                  <View style={styles.padding20}>
                    <View>
                      <Text style={styles.textSection5}>
                        あなたの電子メールを確認します
                      </Text>
                      <Text style={styles.textSection5Small}>
                        メールをご確認ください。コードをお送りしました。
                        以下のコードを入力してください。
                      </Text>
                    </View>
                    <View style={styles.paddingTop20}>
                      <TextInput
                        placeholder={'コードを入力する'}
                        keyboardType="numeric"
                        style={styles.process5TextInput}
                        value={this.state.otpCode}
                        onChangeText={otpCode => this.setState({ otpCode })}
                      />
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
              <SetpByStepProcess
                title="確認"
                action={() => this.VerifyEmail()}
              />
            </View>
          ) : null}
          {this.state.registrationStage == 2 ? (
            <View style={styles.stageOneStyle}>
              <HeaderWithCross
                title="国番号を入力"
                acion={() => this.setState({ registrationStage: 0 })}
                acionBackKey={() => this.setState({ registrationStage: 1 })}
                activeBack={true}
              />
              {/* <View style={styles.codeContainer}>
                <View style={styles.verfiedTokenCenter}>
                  <Text>ワットはあなたの誕生日です ?</Text>
                </View>
              </View> */}

              {/* <View style={styles.OnPxHr} /> */}
              <View style={styles.countrySelect}>
                <Text>お誕生日</Text>
                <DatePicker
                  mode="date"
                  locale="ja"
                  date={this.state.birthday}
                  onDateChange={date => {
                    this.setState({ birthday: date });
                  }}
                />
              </View>
              <View style={styles.centerContainer}>
                <Text style={styles.textSection5Small}>
                  パスポート/運転免許証などの年齢確認書類をアップロード
                </Text>
              </View>
              <View style={styles.centerContainer}>
                {this.state.DateProfImageUri ? (
                  <Avatar
                    size={150}
                    rounded
                    icon={{ name: 'user', type: 'font-awesome' }}
                    onPress={() => this.imagePickerForDateValidationImage()}
                    activeOpacity={0.7}
                    containerStyle={styles.centerContainer}
                    showEditButton
                    source={{ uri: this.state.DateProfImageUri }}
                  />
                ) : (
                    <Avatar
                      size={150}
                      rounded
                      icon={{ name: 'user', type: 'font-awesome' }}
                      onPress={() => this.imagePickerForDateValidationImage()}
                      activeOpacity={0.7}
                      containerStyle={styles.centerContainer}
                      showEditButton
                      source={require('../../../assets/documents.png')}
                    />
                  )}
                {this.state.photoDocument ? (
                  <View style={styles.verifyIcon}>
                    <Icon name="check-circle" size={30} color={'green'} />
                  </View>
                ) : null}
              </View>
              <View style={styles.ageVerification}>
                <View style={styles.ageVerificationContainer}>
                  <TouchableOpacity
                    style={styles.ageVerificationSkipButon}
                    onPress={() => this.setState({ registrationStage: 3 })}>
                    <Text>スキップする </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.ageVerificationSkipVerify}
                    onPress={() => this.changeDate()}>
                    <Text style={styles.ageVerificationSkipVerifyText}>
                      確認済み
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <SetpByStepProcess
                title="次へ 1/5"
                action={() => this.changeDate()}
              /> */}
            </View>
          ) : null}
          {/* registartion stage 2 End*/}
          {/* registartion stage 3*/}
          {this.state.registrationStage == 3 ? (
            <View style={styles.stageOneStyle}>
              <HeaderWithCross
                title="国番号を入力"
                acion={() => this.setState({ registrationStage: 0 })}
                acionBackKey={() => this.setState({ registrationStage: 2 })}
                activeBack={true}
              />
              <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                  <View style={styles.profileImageSection}>
                    {this.state.profileImage ? (
                      <Avatar
                        rounded
                        size="xlarge"
                        source={{ uri: this.state.profileImage }}
                      />
                    ) : (
                        <Avatar
                          rounded
                          size="xlarge"
                          source={require('../../../assets/panda.png')}
                        />
                      )}
                  </View>
                  <View style={styles.verfiedTokenCenter}>
                    <Text style={styles.questionColor}>
                      よく遊ぶ場所はどこですか?
                    </Text>
                  </View>
                  <View style={styles.chosseOption}>
                    <TagSelect
                      data={this.props.allCity}
                      max={1}
                      labelAttr="city_name"
                      itemStyle={styles.item}
                      itemLabelStyle={styles.label}
                      itemStyleSelected={styles.itemSelected}
                      itemLabelStyleSelected={styles.labelSelected}
                      ref={tag => {
                        this.tag = tag;
                      }}
                      onItemPress={item => {
                        this.setState({ selectedCityName: item.id });
                      }}
                      onMaxError={() => {
                        Alert.alert(
                          'ウォーニング',
                          '以前の都市を破棄して新しい都市を選択してください。',
                        );
                      }}
                    />
                  </View>
                </ScrollView>
              </SafeAreaView>
              <SetpByStepProcess
                title="次へ 2/5"
                action={() => this.selectedCityOption()}
              />
            </View>
          ) : null}
          {/* registartion stage 3 End*/}
          {/* registartion stage 4*/}
          {this.state.registrationStage == 4 ? (
            <View style={styles.stageOneStyle}>
              <HeaderWithCross
                title="国番号を入力"
                acion={() => this.setState({ registrationStage: 0 })}
                acionBackKey={() => this.setState({ registrationStage: 3 })}
                activeBack={true}
              />
              <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                  <View style={styles.profileImageSection}>
                    {this.state.profileImage ? (
                      <Avatar
                        rounded
                        size="xlarge"
                        source={{ uri: this.state.profileImage }}
                      />
                    ) : (
                        <Avatar
                          rounded
                          size="xlarge"
                          source={require('../../../assets/panda.png')}
                        />
                      )}
                  </View>
                  <View style={styles.verfiedTokenCenter}>
                    <Text style={styles.questionColor}>あなたの性別は ?</Text>
                  </View>
                  <View style={styles.chosseOption}>
                    <View style={styles.chosseOptionRow}>
                      <TouchableOpacity
                        onPress={() => this.changeGender(0)}
                        style={
                          this.state.selectedGender == 0
                            ? styles.optionSectionSelected
                            : styles.optionSection
                        }>
                        <Text
                          style={
                            this.state.selectedGender == 0
                              ? styles.optionColorSelected
                              : styles.optionColor
                          }>
                          女性
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.changeGender(1)}
                        style={
                          this.state.selectedGender == 1
                            ? styles.optionSectionSelected
                            : styles.optionSection
                        }>
                        <Text
                          style={
                            this.state.selectedGender == 1
                              ? styles.optionColorSelected
                              : styles.optionColor
                          }>
                          男性
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.changeGender(2)}
                        style={
                          this.state.selectedGender == 2
                            ? styles.optionSectionSelected
                            : styles.optionSection
                        }>
                        <Text
                          style={
                            this.state.selectedGender == 2
                              ? styles.optionColorSelected
                              : styles.optionColor
                          }>
                          LGBT
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
              <SetpByStepProcess
                title="次へ 3/5"
                action={() => this.changeGenderFunction()}
              />
            </View>
          ) : null}
          {/* registartion stage 4 End*/}
          {/* registartion stage 5*/}
          {this.state.registrationStage == 5 ? (
            <View style={styles.stageOneStyle}>
              <HeaderWithCross
                title="ニックネームを設定"
                acion={() => this.setState({ registrationStage: 0 })}
                acionBackKey={() => this.setState({ registrationStage: 4 })}
                activeBack={true}
              />
              <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                  <View style={styles.padding20}>
                    <View>
                      <Text style={styles.textSection5}>
                        素敵なニックネームを
                      </Text>
                      <Text style={styles.textSection5}>教えてください !</Text>
                      <Text style={styles.textSection5Small}>
                        キャストに呼ばれたい名前を教えてください。(20文字以内)
                      </Text>
                    </View>
                    <View style={styles.paddingTop20}>
                      <TextInput
                        placeholder={'ニックネーム'}
                        style={styles.process5TextInput}
                        value={this.state.nickName}
                        onChangeText={nickName => this.setState({ nickName })}
                      />
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
              <SetpByStepProcess
                title="次へ 4/5"
                action={() => this.changeNickName()}
              />
            </View>
          ) : null}
          {/* registartion stage 5 End*/}
          {/* registartion stage 6*/}
          {this.state.registrationStage == 6 ? (
            <View style={styles.stageOneStyle}>
              <HeaderWithCross
                title="ニックネームを設定"
                acion={() => this.setState({ registrationStage: 0 })}
                acionBackKey={() => this.setState({ registrationStage: 5 })}
                activeBack={true}
              />
              <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                  <View style={styles.padding20}>
                    <View style={styles.centerContainer}>
                      <Image
                        style={styles.process6Image}
                        source={require('../../../assets/ui-1.png')}
                      />
                    </View>
                    <View style={styles.paddingTop20}>
                      <Text style={styles.process6MainText}>
                        実際に会うまで完全無料。{'\n'} 気になるキャス ト5人に{' '}
                        {'\n'}
                        いいねしよう!
                      </Text>
                      <Text style={styles.textSection5Small}>
                        あなたの好みを学習して、最適なマッチングをいたします。
                        好みのシ チュエーションやタグから選びましょう。
                      </Text>
                    </View>
                    <View style={styles.tabOption}>
                      <TouchableOpacity
                        onPress={() => this.setState({ process5Selected: 0 })}
                        style={
                          this.state.process5Selected == 0
                            ? styles.tabOptionSelect
                            : styles.tabOptionUnselect
                        }>
                        <Text
                          style={
                            this.state.process5Selected == 0
                              ? styles.tabOptionTextSelected
                              : styles.tabOptionText
                          }>
                          プライベート
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.setState({ process5Selected: 1 })}
                        style={
                          this.state.process5Selected == 1
                            ? styles.tabOptionSelect
                            : styles.tabOptionUnselect
                        }>
                        <Text
                          style={
                            this.state.process5Selected == 1
                              ? styles.tabOptionTextSelected
                              : styles.tabOptionText
                          }>
                          接待
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={(styles.container, { flexDirection: 'row' })}>
                      <TouchableOpacity style={styles.tagsUnselect}>
                        <Text>飲める人</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.tagsUnselect}>
                        <Text>カラオケ</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.tagsUnselect}>
                        <Text>わいわい</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.tagsUnselect}>
                        <Text>しっとり</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.paddingTop20}>
                      <View style={styles.castGrid} />
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
              <SetpByStepProcess
                title="次へ 5/5"
                action={() => this.chooseOption()}
              />
            </View>
          ) : null}
          {/* registartion stage 6 End*/}
          {/* registartion stage 4a*/}
          {this.state.registrationStage == '6a' ? (
            <View style={styles.stageOneStyle}>
              <HeaderWithCross
                title="国番号を入力"
                acion={() => this.setState({ registrationStage: 0 })}
                acionBackKey={() => this.setState({ registrationStage: 4 })}
                activeBack={true}
              />
              <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                  <View style={styles.profileImageSection}>
                    {this.state.profileImage ? (
                      <Avatar
                        rounded
                        size="xlarge"
                        source={{ uri: this.state.profileImage }}
                      />
                    ) : (
                        <Avatar
                          rounded
                          size="xlarge"
                          source={require('../../../assets/panda.png')}
                        />
                      )}
                  </View>
                  <View style={styles.verfiedTokenCenter}>
                    <Text style={styles.questionColor}>
                      あなたの時給はいくらですか？
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.verfiedTokenCenter,
                      styles.HourlyRateConatiner,
                    ]}>
                    <TextInput
                      style={styles.hourlyRate}
                      placeholder="時給を円で入力してください"
                      keyboardType={'numeric'}
                      onChangeText={hourlyRate => this.setState({ hourlyRate })}
                      defaultValue={this.state.hourlyRate}
                    />
                  </View>
                </ScrollView>
              </SafeAreaView>
              <SetpByStepProcess
                title="次へ 5/5"
                action={() => this.changeHourlyRate()}
              />
            </View>
          ) : null}
          {/* registartion stage 4a End*/}
          {/* registartion stage 4b*/}
          {this.state.registrationStage == '6b' ? (
            <View style={styles.stageOneStyle}>
              <HeaderWithCross
                title="国番号を入力"
                acion={() => this.setState({ registrationStage: 0 })}
                acionBackKey={() => this.setState({ registrationStage: '6a' })}
                activeBack={true}
              />
              <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                  <View style={styles.profileImageSection}>
                    {this.state.profileImage ? (
                      <Avatar
                        rounded
                        size="xlarge"
                        source={{ uri: this.state.profileImage }}
                      />
                    ) : (
                        <Avatar
                          rounded
                          size="xlarge"
                          source={require('../../../assets/panda.png')}
                        />
                      )}
                  </View>
                  <View style={styles.verfiedTokenCenter}>
                    <Text style={styles.questionColor}>
                      面接に参加しますか？
                    </Text>
                  </View>
                  <View style={styles.chosseOption}>
                    <View style={styles.chosseOptionRow}>
                      <TouchableOpacity
                        onPress={() => this.setState({ interViewCall: 1 })}
                        style={
                          this.state.interViewCall == 1
                            ? styles.optionSectionSelected
                            : styles.optionSection
                        }>
                        <Text
                          style={
                            this.state.interViewCall == 1
                              ? styles.optionColorSelected
                              : styles.optionColor
                          }>
                          はい
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.setState({ interViewCall: 0 })}
                        style={
                          this.state.interViewCall == 0
                            ? styles.optionSectionSelected
                            : styles.optionSection
                        }>
                        <Text
                          style={
                            this.state.interViewCall == 0
                              ? styles.optionColorSelected
                              : styles.optionColor
                          }>
                          いいえ
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
              <SetpByStepProcess
                title="次へ 5/5"
                action={() => this.setState({ registrationStage: 7 })}
              />
            </View>
          ) : null}
          {/* registartion stage 4b End*/}
          {/* registartion stage 7*/}
          {this.state.registrationStage == 7 ? (
            <View style={styles.stageOneStyle}>
              <HeaderWithCross
                title="プロファイルを設定"
                acion={() => this.setState({ registrationStage: 0 })}
                acionBackKey={() => this.setState({ registrationStage: 6 })}
                activeBack={true}
              />
              <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                  <View style={styles.padding20}>
                    <View>
                      <View style={styles.centerContainer}>
                        <Image
                          style={styles.process6Image}
                          source={require('../../../assets/ui-1.png')}
                        />
                      </View>
                      <Text style={styles.textSection5}>
                        魅力的なプロフィール写真を登録しよう！
                      </Text>

                      <Text style={styles.textSection5Small}>
                        プロフィール写真が登録してあるだけで、いいねしたキャストからの
                        返信率が10倍に !
                      </Text>
                    </View>
                    <View style={[styles.paddingTop20, styles.centerContainer]}>
                      {this.state.profileImage ? (
                        <Avatar
                          rounded
                          size="xlarge"
                          source={{ uri: this.state.profileImage }}
                        />
                      ) : (
                          <Avatar
                            size={150}
                            rounded
                            icon={{ name: 'user', type: 'font-awesome' }}
                            onPress={() => this.imagePickerForProfileImage()}
                            activeOpacity={0.7}
                            containerStyle={styles.centerContainer}
                            showEditButton
                            source={require('../../../assets/panda.png')}
                          />
                        )}
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
              <SetpByStepProcess
                title="登録完了"
                action={() => this.updateProfile()}
              />
            </View>
          ) : null}
          {/* registartion stage 7 End*/}
          {/* <InstagramLogin
            ref={ref => (this.instagramLogin = ref)}
            appId="529631451057034"
            appSecret="7f56acd7f4bb0226445e08c877109c86"
            redirectUrl="your-redirect-Url"
            scopes={['user_profile', 'user_media']}
            onLoginSuccess={e => console.log('instram', e)}
            onLoginFailure={data => console.log(data)}
          /> */}
          <Spinner
            visible={this.state.loading}
            textContent={'読み込み中...'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      </BgComponent>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    allCity: state.mainReducers.main.allCity,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(duckOperations, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
