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
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';
import NetInfo from '@react-native-community/netinfo';
import { TagSelect } from 'react-native-tag-select';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import jwt_decode from 'jwt-decode';
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
import BgComponent from '../../components/BgComponent';
import HeaderWithCross from '../../components/HeaderWithCross';
import StepByStepProcess from '../../components/StepByStepProcess';
import golbalConstants from '../../Common/GlobalStyles/constants';
import styles from './styles';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
      '???????????????????????????????????????',
      '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
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
      this.setState({ registrationStage: 5 });
    } else {
      showMessage({
        message: '?????????????????????????????????',
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
        message: '?????????????????????????????????????????????',
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
        message: '????????????????????????????????????????????????',
        type: 'error',
      });
    } else {
      this.setState({ registrationStage: '6b' });
    }
  };

  imagePickerForDateValidationImage = () => {
    Alert.alert(
      '???????????????????????????????????????',
      '????????????????????????????????????????????????????????????',
      [
        {
          text: '????????????',
          onPress: () => this.takePhotoFromCamera('age evidence image'),
          style: 'cancel',
        },
        {
          text: '???????????????????????????',
          onPress: () => this.takePhotoFromLibrary('age evidence image'),
        },
      ],
      { cancelable: true },
    );
  };

  imagePickerForProfileImage = () => {
    Alert.alert(
      '?????????????????????????????????????????????',
      '??????????????????????????????????????????????????????????????????',
      [
        {
          text: '????????????',
          onPress: () => this.takePhotoFromCamera('profile image'),
          style: 'cancel',
        },
        {
          text: '???????????????????????????',
          onPress: () => this.takePhotoFromLibrary('profile image'),
        },
      ],
      { cancelable: true },
    );
  };

  takePhotoFromCamera = async (type) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 1,
      saveToPhotos: false,
      maxWidth: 500,
      maxHeight: 500
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (type === 'age evidence image') {
          this.setState({
            DateProfImageUri: response.uri,
            DateProfImagePath: response.path,
            photoDocument: false
          });
          this.uploaduAgeEvidence(response);
        } else if (type === 'profile image') {
          this.setState({
            profileImage: response.uri,
            process6ImagePath: response.path,
          });
        }
      }
    });
  };

  takePhotoFromLibrary = async (type) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 1,
      maxWidth: 500,
      maxHeight: 500
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if (type === 'age evidence image') {
          this.setState({
            DateProfImageUri: response.uri,
            DateProfImagePath: response.path,
            photoDocument: false
          });
          this.uploaduAgeEvidence(response);
        } else if (type === 'profile image') {
          this.setState({
            profileImage: response.uri,
            process6ImagePath: response.path,
          });
        }
      }
    });
  };

  uploaduAgeEvidence = async data => {
    this.setState({ loading: true });
    try {
      let response = await uploadAgeEvidence({}, data.uri, data.type, data.fileName);
      if (response && response.isSuccess) {
        showMessage({
          message: '????????????????????????????????????????????????',
          type: 'success',
        });
        this.setState({ photoDocument: true });
      }
      this.setState({ loading: false });
    } catch (errors) {
      showMessage({
        message: '?????????????????????????????????????????????????????????????????????????????????',
        type: 'error',
      });
      this.setState({ loading: false });
    }
  };

  updateProfile = () => {
    if (this.state.profileImage && this.state.process6ImagePath) {
      this.uploadImages(this.state.profileImage);
    } else if (this.state.profileImage) {
      this.updateProfileInformation();
    } else {
      showMessage({
        message: '??????????????????????????????????????????????????????????????????',
        type: 'error',
      });
    }
  };

  uploadImages = async data => {
    this.setState({ loading: true });
    try {
      let uriParts = this.state.process6ImagePath.split('.');
      let fileType = uriParts[uriParts.length - 1];
      let response = await uploadProfileImage(
        {},
        data.uri,
        `image/${fileType ? fileType : 'png'}`,
        `files.${fileType ? fileType : 'png'}`,
      );
      if (response && response.isSuccess) {
        this.updateProfileInformation();
      }
      this.setState({ loading: false });
    } catch (errors) {
      showMessage({
        message: '?????????????????????????????????????????????????????????????????????',
        type: 'error',
      });
      this.setState({ loading: false });
    }
  };

  updateProfileInformation = async () => {
    var username = this.state.customEmail.match(/^([^@]*)@/)[1];
    this.setState({ loading: true });
    try {
      let data = {
        usr_nickname: this.state.nickName,
        usr_city: this.state.selectedCityName,
        usr_gender: this.state.selectedGender,
        usr_profile_photo: this.state.profileImage,
        usr_name: this.state.userInfo ?
          this.state.userInfo.name ?
            this.state.userInfo.name
            :
            username
          :
          '',
        usr_birth_date: this.state.birthday,
        usr_hourly_rate: this.state.hourlyRate ? this.state.hourlyRate : 0,
      };
      // if (this.state.interViewCall) {
      //   this.InterViewRequest();
      // }
      let response = await updateUserInfo(data);
      if (response.isSuccess) {
        this.props.navigation.navigate('InitialLoader');
        showMessage({
          message: '?????????????????????',
          type: 'success',
        });
      } else {
        showMessage({
          message: '?????????????????????',
          type: 'error',
        });
      }
      this.setState({ loading: false });
    } catch (errors) {
      showMessage({
        message:
          '??????????????????????????????????????????????????????????????????????????????????????????',
        type: 'error',
      });
      this.setState({ loading: false });
    }
  };

  loginApi = async (userInfo, type) => {
    this.props.changeSignInMethod(type);
    this.setState({ loading: true });
    if (userInfo && userInfo.picture && userInfo.picture.data && userInfo.picture.data.url) {
      this.setState({ profileImage: userInfo.picture.data.url });
    }
    if (userInfo && userInfo.name) {
      this.setState({ nickName: userInfo.name });
    }
    try {
      let email = userInfo && userInfo.email ? userInfo.email : 'nazmurklk23@1.com';
      let data = {
        usr_email: email,
      };
      this.setState({ customEmail: email });
      let response = await LoginApi(data);
      if (response) {
        showMessage({
          message: '??????????????????',
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
        showMessage({
          message: '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
          type: 'error',
        });
      }
      this.setState({ loading: false });
    } catch (errors) {
      showMessage({
        message: '?????????????????????????????????????????????????????????',
        type: 'error',
      });
      this.setState({ loading: false });
    }
  };

  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string:
          'id, name,  first_name, last_name, email, gender, picture.type(large)',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, result) => {
        if (error) {
          console.log('facebook login info has error: ' + error);
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
  };

  loginWithTwitter = () => {
    RNTwitterSignIn.init(
      Constants.TWITTER_COMSUMER_KEY,
      Constants.TWITTER_CONSUMER_SECRET,
    );
    RNTwitterSignIn.logIn()
      .then(loginData => {
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
    RNTwitterSignIn.logOut();
  };

  confirmEvidenceImage = () => {
    if (this.state.DateProfImageUri) {
      this.setState({ registrationStage: 3 });
    } else {
      showMessage({
        message: '??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
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
      await wantInterView(data);
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
      } else {
        this.setState({ userInfo });
      }
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
        message: '????????????????????????????????????????????????????????????????????????',
        type: 'warning',
      });
    } else {
      let data = {
        city_name: this.state.addCity,
      };
      this.setState({ loading: true });
      try {
        const response = await addNewCity(data);
        this.setState({ loading: false, addCity: '' });
        showMessage({
          message: '??????????????????????????????????????????????????????????????????',
          type: 'success',
        });
        if (response.isSuccess) {
          this.props.updateCityList(response.result.city_list);
        }
      } catch {
        this.setState({ loading: false, addCity: '' });
        showMessage({
          message: '???????????????????????????????????????????????????????????????????????????',
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
    if (!this.emailValidation(this.state.emailAddress.trim())) {
      showMessage({
        message: '?????????????????????????????????????????????????????????',
        type: 'warning',
      });
    } else {
      let data = {
        usr_email: this.state.emailAddress.trim().toLowerCase(),
      };
      this.setState({ loading: true });
      try {
        const response = await loginWithEmailAddress(data);
        if (response.isSuccess) {
          showMessage({
            message: '???????????????????????????????????????????????????????????????????????????',
            type: 'success',
          });
          this.setState({ registrationStage: '1a' });
        } else {
          showMessage({
            message: '???????????????????????????',
            type: 'warning',
          });
        }
        this.setState({ loading: false });
      } catch {
        showMessage({
          message: '???????????????????????????????????????????????????????????????????????????????????????',
          type: 'error',
        });
        this.setState({ loading: false });
      }
    }
  };

  VerifyEmail = async () => {
    if (!this.state.otpCode) {
      showMessage({
        message: '????????????????????????????????????????????????????????????',
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
        if (response) {
          if (response.status === 401) {
            showMessage({
              message: '??????????????????',
              type: 'error',
            });
          } else {
            showMessage({
              message: '???????????????????????????????????????',
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
        this.setState({ loading: false });
      } catch {
        showMessage({
          message: '???????????????????????????????????????????????????????????????????????????????????????',
          type: 'error',
        });
        this.setState({ loading: false });
      }
    }
  };

  // Sign in with Apple
  onAppleButtonPress = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      const { email } = jwt_decode(appleAuthRequestResponse.identityToken);
      let data = {
        email,
        name: appleAuthRequestResponse.fullName.nickname ? appleAuthRequestResponse.fullName.nickname : '',
      };
      this.loginApi(data, 'apple');
      this.setState({ userInfo: data });
    } else {
      showMessage({
        message: 'Apple????????????????????????????????????',
        type: 'error',
      });
    }
  }

  render() {
    return (
      <BgComponent>
        <SafeAreaView>
          <View style={styles.mainWrapper}>
            {/* registartion stage 0 */}
            {this.state.registrationStage == 0 &&
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
                          ????????????????????????
                        </Text>
                        <Text
                          adjustsFontSizeToFit
                          style={styles.textSectionRowTextSub}>
                          ???????????????????????????????????????????????????
                        </Text>
                        <Text
                          adjustsFontSizeToFit
                          style={styles.textSectionRowTextSub}>
                          ????????????????????????????????????????????????
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
                          24??????365??????????????????
                        </Text>
                        <Text
                          adjustsFontSizeToFit
                          style={styles.textSectionRowTextSub}>
                          ????????????????????????24??????365???????????????
                        </Text>
                        <Text style={styles.textSectionRowTextSub}>
                          ??????????????????????????????????????????????????????
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
                          ?????????????????????????????????
                        </Text>
                        <Text style={styles.textSectionRowTextSub}>
                          ???????????????????????????????????????????????????
                        </Text>
                        <Text style={styles.textSectionRowTextSub}>
                          ??????????????????????????????????????????????????????
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
                          ????????????????????????
                        </Text>
                        <Text style={styles.loginWithFbTextSub}>
                          ????????????????????????????????????
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {Platform.OS === 'ios' &&
                      <TouchableOpacity
                        onPress={() => {
                          this.onAppleButtonPress();
                        }}
                        style={[
                          styles.loginWithFb,
                          styles.google,
                          styles.shadowButton,
                        ]}>
                        <View style={styles.loginWithFbIcon}>
                          <Icon name="apple" size={35} color="black" />
                        </View>
                        <View style={styles.loginWithFbText}>
                          <Text style={styles.loginWithSMSTextMain}>
                            Apple??????????????????
                          </Text>
                          <Text style={styles.loginWithFbTextSubBlack}>
                            SNS??????????????????????????????????????????
                          </Text>
                        </View>
                      </TouchableOpacity>
                    }
                    <View style={styles.shadowButton}>
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
                          style={[styles.loginWithRadiunt]}>
                          <View style={styles.loginWithFbIcon}>
                            <Icon name="facebook-f" size={40} color="#fff" />
                          </View>
                          <View style={styles.loginWithFbText}>
                            <Text style={styles.loginWithFbTextMain}>
                              Facebook???????????????
                            </Text>
                            <Text style={styles.loginWithFbTextSub}>
                              SNS??????????????????????????????????????????
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
                          Google???????????????
                        </Text>
                        <Text style={styles.loginWithFbTextSubBlack}>
                          SNS??????????????????????????????????????????
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
                          Line???????????????
                        </Text>
                        <Text style={styles.loginWithFbTextSub}>
                          SNS??????????????????????????????????????????
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
                          Twitter???????????????
                        </Text>
                        <Text style={styles.loginWithFbTextSub}>
                          SNS??????????????????????????????????????????
                        </Text>
                      </View>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </ScrollView>
            }

            {/* Process 2 */}
            {this.state.registrationStage == 1 &&
              <View style={styles.stageOneStyle}>
                <HeaderWithCross
                  title="????????????????????????"
                  action={() => this.setState({ registrationStage: 0 })}
                  actionBackKey={() => this.setState({ registrationStage: 0 })}
                  activeBack={true}
                />
                <ScrollView style={styles.scrollView}>
                  <View style={styles.padding20}>
                    <View>
                      <Text style={styles.textSection5}>???????????????</Text>
                      <Text style={styles.textSection5Small}>
                        ????????????????????????????????????????????????????????????OTP????????????????????????
                      </Text>
                    </View>
                    <View style={styles.paddingTop20}>
                      <TextInput
                        placeholder={'???????????????????????????'}
                        style={styles.process5TextInput}
                        value={this.state.emailAddress}
                        onChangeText={emailAddress =>
                          this.setState({ emailAddress })
                        }
                      />
                    </View>
                  </View>
                </ScrollView>
                <StepByStepProcess
                  title="????????????"
                  action={this.loginWithEmailCheckInternetStatus}
                />
              </View>
            }
            {this.state.registrationStage == '1a' &&
              <View style={styles.stageOneStyle}>
                <HeaderWithCross
                  title="E???????????????????????????"
                  action={() => this.setState({ registrationStage: 0 })}
                  actionBackKey={() => this.setState({ registrationStage: 1 })}
                  activeBack={true}
                />
                <ScrollView style={styles.scrollView}>
                  <View style={styles.padding20}>
                    <View>
                      <Text style={styles.textSection5}>
                        ?????????????????????????????????????????????
                      </Text>
                      <Text style={styles.textSection5Small}>
                        ????????????????????????????????????????????????????????????????????????
                        ????????????????????????????????????????????????
                      </Text>
                    </View>
                    <View style={styles.paddingTop20}>
                      <TextInput
                        placeholder={'????????????????????????'}
                        keyboardType="numeric"
                        style={styles.process5TextInput}
                        value={this.state.otpCode}
                        onChangeText={otpCode => this.setState({ otpCode })}
                      />
                    </View>
                  </View>
                </ScrollView>
                <StepByStepProcess
                  title="??????"
                  action={() => this.VerifyEmail()}
                />
              </View>
            }
            {this.state.registrationStage == 2 &&
              <View style={styles.stageOneStyle}>
                <HeaderWithCross
                  title="??????????????????"
                  action={() => this.setState({ registrationStage: 0 })}
                  actionBackKey={() => this.setState({ registrationStage: 1 })}
                  activeBack={true}
                />
                {/* <View style={styles.codeContainer}>
                  <View style={styles.verfiedTokenCenter}>
                    <Text>??????????????????????????????????????? ?</Text>
                  </View>
                </View> */}

                {/* <View style={styles.OnPxHr} /> */}
                <View style={styles.countrySelect}>
                  <Text>????????????</Text>
                  <DatePicker
                    mode="date"
                    locale="ja"
                    date={this.state.birthday}
                    onDateChange={date => { this.setState({ birthday: date }); }}
                  />
                </View>
                <View style={styles.centerContainer}>
                  <Text style={styles.textSection5Small}>
                    ???????????????/???????????????????????????????????????????????????????????????
                  </Text>
                </View>
                <View style={styles.centerContainer}>
                  {this.state.DateProfImageUri ?
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
                    :
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
                  }
                  {this.state.photoDocument &&
                    <View style={styles.verifyIcon}>
                      <Icon name="check-circle" size={30} color={'green'} />
                    </View>
                  }
                </View>
                <View style={styles.ageVerification}>
                  <View style={styles.ageVerificationContainer}>
                    <TouchableOpacity
                      style={styles.ageVerificationSkipButon}
                      onPress={() => this.setState({ registrationStage: 3 })}
                    >
                      <Text>?????????????????? </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.ageVerificationSkipVerify}
                      onPress={this.confirmEvidenceImage}
                    >
                      <Text style={styles.ageVerificationSkipVerifyText}>
                        ????????????
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* <StepByStepProcess
                  title="?????? 1/5"
                  action={() => this.confirmEvidenceImage()}
                /> */}
              </View>
            }
            {/* registartion stage 2 End*/}

            {/* registartion stage 3*/}
            {this.state.registrationStage == 3 &&
              <View style={styles.stageOneStyle}>
                <HeaderWithCross
                  title="???????????????"
                  action={() => this.setState({ registrationStage: 0 })}
                  actionBackKey={() => this.setState({ registrationStage: 2 })}
                  activeBack={true}
                />
                <ScrollView style={styles.scrollView}>
                  <View style={styles.profileImageSection}>
                    {this.state.profileImage ?
                      <Avatar
                        rounded
                        size="xlarge"
                        source={{ uri: this.state.profileImage }}
                      />
                      :
                      <Avatar
                        rounded
                        size="xlarge"
                        source={require('../../../assets/panda.png')}
                      />
                    }
                  </View>
                  <View style={styles.verfiedTokenCenter}>
                    <Text style={styles.questionColor}>
                      ?????????????????????????????????????
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
                      ref={tag => { this.tag = tag; }}
                      onItemPress={item => this.setState({ selectedCityName: item.id })}
                      onMaxError={() => {
                        Alert.alert(
                          '??????????????????',
                          '???????????????????????????????????????????????????????????????????????????',
                        );
                      }}
                    />
                  </View>
                </ScrollView>
                <StepByStepProcess
                  title="?????? 2/4"
                  action={this.selectedCityOption}
                />
              </View>
            }
            {/* registartion stage 3 End*/}

            {/* registartion stage 4*/}
            {this.state.registrationStage == 4 &&
              <View style={styles.stageOneStyle}>
                <HeaderWithCross
                  title="???????????????"
                  action={() => this.setState({ registrationStage: 0 })}
                  actionBackKey={() => this.setState({ registrationStage: 3 })}
                  activeBack={true}
                />
                <ScrollView style={styles.scrollView}>
                  <View style={styles.profileImageSection}>
                    {this.state.profileImage ?
                      <Avatar
                        rounded
                        size="xlarge"
                        source={{ uri: this.state.profileImage }}
                      />
                      :
                      <Avatar
                        rounded
                        size="xlarge"
                        source={require('../../../assets/panda.png')}
                      />
                    }
                  </View>
                  <View style={styles.verfiedTokenCenter}>
                    <Text style={styles.questionColor}>????????????????????? ?</Text>
                  </View>
                  <View style={styles.chosseOption}>
                    <View style={styles.chosseOptionRow}>
                      <TouchableOpacity
                        onPress={() => this.changeGender(0)}
                        style={this.state.selectedGender == 0 ? styles.optionSectionSelected : styles.optionSection}
                      >
                        <Text style={this.state.selectedGender == 0 ? styles.optionColorSelected : styles.optionColor}>
                          ??????
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.changeGender(1)}
                        style={this.state.selectedGender == 1 ? styles.optionSectionSelected : styles.optionSection}
                      >
                        <Text style={this.state.selectedGender == 1 ? styles.optionColorSelected : styles.optionColor}>
                          ??????
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.changeGender(2)}
                        style={this.state.selectedGender == 2 ? styles.optionSectionSelected : styles.optionSection}
                      >
                        <Text style={this.state.selectedGender == 2 ? styles.optionColorSelected : styles.optionColor}>
                          LGBT
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
                <StepByStepProcess
                  title="?????? 3/4"
                  action={() => this.changeGenderFunction()}
                />
              </View>
            }
            {/* registartion stage 4 End*/}

            {/* registartion stage 5*/}
            {this.state.registrationStage == 5 &&
              <View style={styles.stageOneStyle}>
                <HeaderWithCross
                  title="???????????????????????????"
                  action={() => this.setState({ registrationStage: 0 })}
                  actionBackKey={() => this.setState({ registrationStage: 3 })}
                  activeBack={true}
                />
                <ScrollView style={styles.scrollView}>
                  <View style={styles.padding20}>
                    <View>
                      <Text style={styles.textSection5}>???????????????????????????????????????????????????!</Text>
                      <Text style={styles.textSection5Small}>???????????????????????????????????????????????????????????????(20????????????)</Text>
                    </View>
                    <View style={styles.paddingTop20}>
                      <TextInput
                        placeholder={'??????????????????'}
                        style={styles.process5TextInput}
                        value={this.state.nickName}
                        onChangeText={nickName => this.setState({ nickName })}
                      />
                    </View>
                  </View>
                </ScrollView>
                <StepByStepProcess
                  title="?????? 3/4"
                  action={this.changeNickName}
                />
              </View>
            }
            {/* registartion stage 5 End*/}

            {/* registartion stage 6*/}
            {this.state.registrationStage == 6 &&
              <View style={styles.stageOneStyle}>
                <HeaderWithCross
                  title="???????????????????????????"
                  action={() => this.setState({ registrationStage: 0 })}
                  actionBackKey={() => this.setState({ registrationStage: 5 })}
                  activeBack={true}
                />
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
                        ????????????????????????????????????{'\n'} ????????????????????? ???5??????{' '}
                        {'\n'}
                        ??????????????????!
                      </Text>
                      <Text style={styles.textSection5Small}>
                        ?????????????????????????????????????????????????????????????????????????????????
                        ???????????? ?????????????????????????????????????????????????????????
                      </Text>
                    </View>
                    <View style={styles.tabOption}>
                      <TouchableOpacity
                        onPress={() => this.setState({ process5Selected: 0 })}
                        style={this.state.process5Selected == 0 ? styles.tabOptionSelect : styles.tabOptionUnselect}
                      >
                        <Text style={this.state.process5Selected == 0 ? styles.tabOptionTextSelected : styles.tabOptionText}>
                          ??????????????????
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.setState({ process5Selected: 1 })}
                        style={this.state.process5Selected == 1 ? styles.tabOptionSelect : styles.tabOptionUnselect}
                      >
                        <Text style={this.state.process5Selected == 1 ? styles.tabOptionTextSelected : styles.tabOptionText}>
                          ??????
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={(styles.container, { flexDirection: 'row' })}>
                      <TouchableOpacity style={styles.tagsUnselect}>
                        <Text>????????????</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.tagsUnselect}>
                        <Text>????????????</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.tagsUnselect}>
                        <Text>????????????</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.tagsUnselect}>
                        <Text>????????????</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.paddingTop20}>
                      <View style={styles.castGrid} />
                    </View>
                  </View>
                </ScrollView>
                <StepByStepProcess
                  title="?????? 5/5"
                  action={() => this.chooseOption()}
                />
              </View>
            }
            {/* registartion stage 6 End*/}

            {/* registartion stage 6a*/}
            {this.state.registrationStage == '6a' &&
              <View style={styles.stageOneStyle}>
                <HeaderWithCross
                  title="??????????????????"
                  action={() => this.setState({ registrationStage: 0 })}
                  actionBackKey={() => this.setState({ registrationStage: 4 })}
                  activeBack={true}
                />
                <ScrollView style={styles.scrollView}>
                  <View style={styles.profileImageSection}>
                    {this.state.profileImage ?
                      <Avatar
                        rounded
                        size="xlarge"
                        source={{ uri: this.state.profileImage }}
                      />
                      :
                      <Avatar
                        rounded
                        size="xlarge"
                        source={require('../../../assets/panda.png')}
                      />
                    }
                  </View>
                  <View style={styles.verfiedTokenCenter}>
                    <Text style={styles.questionColor}>
                      ??????????????????????????????????????????
                    </Text>
                  </View>
                  <View style={[styles.verfiedTokenCenter, styles.HourlyRateConatiner]}>
                    <TextInput
                      style={styles.hourlyRate}
                      placeholder="???????????????????????????????????????"
                      keyboardType={'numeric'}
                      onChangeText={hourlyRate => this.setState({ hourlyRate })}
                      defaultValue={this.state.hourlyRate}
                    />
                  </View>
                </ScrollView>
                <StepByStepProcess
                  title="?????? 5/5"
                  action={() => this.changeHourlyRate()}
                />
              </View>
            }
            {/* registartion stage 6a End*/}

            {/* registartion stage 6b*/}
            {this.state.registrationStage == '6b' &&
              <View style={styles.stageOneStyle}>
                <HeaderWithCross
                  title="??????????????????"
                  action={() => this.setState({ registrationStage: 0 })}
                  actionBackKey={() => this.setState({ registrationStage: '6a' })}
                  activeBack={true}
                />
                <ScrollView style={styles.scrollView}>
                  <View style={styles.profileImageSection}>
                    {this.state.profileImage ?
                      <Avatar
                        rounded
                        size="xlarge"
                        source={{ uri: this.state.profileImage }}
                      />
                      :
                      <Avatar
                        rounded
                        size="xlarge"
                        source={require('../../../assets/panda.png')}
                      />
                    }
                  </View>
                  <View style={styles.verfiedTokenCenter}>
                    <Text style={styles.questionColor}>
                      ??????????????????????????????
                    </Text>
                  </View>
                  <View style={styles.chosseOption}>
                    <View style={styles.chosseOptionRow}>
                      <TouchableOpacity
                        onPress={() => this.setState({ interViewCall: 1 })}
                        style={this.state.interViewCall == 1 ? styles.optionSectionSelected : styles.optionSection}
                      >
                        <Text style={this.state.interViewCall == 1 ? styles.optionColorSelected : styles.optionColor}>
                          ??????
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.setState({ interViewCall: 0 })}
                        style={this.state.interViewCall == 0 ? styles.optionSectionSelected : styles.optionSection}
                      >
                        <Text style={this.state.interViewCall == 0 ? styles.optionColorSelected : styles.optionColor}>
                          ?????????
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
                <StepByStepProcess
                  title="?????? 5/5"
                  action={() => this.setState({ registrationStage: 7 })}
                />
              </View>
            }
            {/* registartion stage 6b End*/}

            {/* registartion stage 7*/}
            {this.state.registrationStage == 7 &&
              <View style={styles.stageOneStyle}>
                <HeaderWithCross
                  title="???????????????????????????"
                  action={() => this.setState({ registrationStage: 0 })}
                  actionBackKey={() => this.setState({ registrationStage: 5 })}
                  activeBack={true}
                />
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
                        ?????????????????????????????????????????????????????????
                      </Text>
                      <Text style={styles.textSection5Small}>
                        ?????????????????????????????????????????????????????????????????????????????????????????????????????????10?????? !
                      </Text>
                    </View>
                    <View style={[styles.paddingTop20, styles.centerContainer]}>
                      {this.state.profileImage ?
                        <Avatar
                          rounded
                          size="xlarge"
                          source={{ uri: this.state.profileImage }}
                        />
                        :
                        <Avatar
                          size={150}
                          rounded
                          icon={{ name: 'user', type: 'font-awesome' }}
                          onPress={this.imagePickerForProfileImage}
                          activeOpacity={0.7}
                          containerStyle={styles.centerContainer}
                          showEditButton
                          source={require('../../../assets/panda.png')}
                        />
                      }
                    </View>
                  </View>
                </ScrollView>
                <StepByStepProcess
                  title="????????????"
                  action={this.updateProfile}
                />
              </View>
            }
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

            <Spinner visible={this.state.loading} />
          </View>
        </SafeAreaView>
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
