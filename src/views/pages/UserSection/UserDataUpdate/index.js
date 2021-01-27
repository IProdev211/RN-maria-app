import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Alert, SafeAreaView } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DashBoardHeader from '../../../components/DashBoardHeader';
import {
  getUserDetails,
  uploadProfileImage,
  setProfilePicture,
  removeProfileImage
} from '../../../../services/AuthService';
import styles from './styles';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { duckOperations } from '../../../../redux/Main/duck';

class UserDataUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      profileImage: null,
      selectedImageIndex: 0,
      loading: false
    };
  }

  componentDidMount() {
    for (let i = 0; i < this.props.userInfo.usr_profile_photo.length; i++) {
      if (this.props.userInfo.usr_profile_photo[i].picture_url == this.props.userInfo.is_profile_pic) {
        this.setState({ selectedImageIndex: i });
      }
    }

    this.setState({
      profileImage: this.props.userInfo.is_profile_pic ? this.props.userInfo.is_profile_pic : this.props.userInfo.usr_profile_photo[0].picture_url,
    });
  }

  UploadProfileImageFromMobile = () => {
    Alert.alert(
      '画像アップロード',
      'プロフィール画像をアップロードしてください。',
      [
        {
          text: '撮影する',
          onPress: () => this.takePhotoFromCamera(),
          style: 'cancel',
        },
        {
          text: '画像ライブラリから',
          onPress: () => this.takePhotoFromLibrary(),
        },
      ],
      { cancelable: true },
    );
  };

  takePhotoFromCamera = async () => {
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
        this.uploadImages(response);
      }
    });
  };

  takePhotoFromLibrary = async () => {
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
        this.uploadImages(response);
      }
    });
  };

  uploadImages = async (data) => {
    try {
      this.setState({ loading: true });
      let response = await uploadProfileImage({}, data.uri, data.type, data.fileName);
      if (response && response.isSuccess) {
        let response = await getUserDetails();
        if (response.isSuccess) {
          let user = response.result.success;
          let profileImage = user.is_profile_pic ? user.is_profile_pic : user.usr_profile_photo[0].picture_url;
          this.setState({ profileImage });
          this.props.addUserInfo(user);
        }
      }
      this.setState({ loading: false });
    } catch (errors) {
      this.setState({ loading: false });
      showMessage({
        message: '失敗しました。',
        type: 'error',
      });
    }
  };

  selctedImage = async (x, id) => {
    this.setState({
      selectedImageIndex: id,
      profileImage: x.picture_url,
    });
    let data = {
      pic_id: x.id,
    };
    try {
      const response = await setProfilePicture(data);
      if (response.isSuccess) {
        let response = await getUserDetails();
        if (response.isSuccess) {
          this.props.addUserInfo(response.result.success);
        }
      }
    } catch { }
  };

  removeImage = async (id) => {
    try {
      this.setState({ loading: true });
      let response = await removeProfileImage(id);
      if (response && response.isSuccess) {
        let response = await getUserDetails();
        if (response.isSuccess) {
          this.props.addUserInfo(response.result.success);
        }
      }
      this.setState({ loading: false });
    } catch (errors) {
      this.setState({ loading: false });
      showMessage({
        message: '失敗しました。',
        type: 'error',
      });
    }
  }

  render() {
    const { userInfo, navigation } = this.props;
    let count = 0;
    Object.keys(userInfo.basic_info).map(key => {
      if (userInfo.basic_info[key] !== '0') {
        count++;
      }
    })

    return (
      <SafeAreaView>
        <DashBoardHeader
          title="プロフィール編集"
          navigation={navigation}
          backNavigation={true}
        >
          <View style={{ backgroundColor: '#FEF6E1', paddingBottom: 20 }}>
            <View style={styles.ProfileContainer}>
              <View>
                {this.state.profileImage ?
                  <Image
                    style={styles.profilePicImage}
                    source={{ uri: this.state.profileImage }}
                  />
                  :
                  <Image
                    style={styles.profilePicImage}
                    source={require('../../../../assets/panda.png')}
                  />
                }
              </View>
              <Text style={styles.UserNameText}>{userInfo.usr_nickname}</Text>
            </View>
            <View style={styles.ImageContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {userInfo && userInfo.usr_profile_photo.length > 0 &&
                  userInfo.usr_profile_photo.map((x, index) => {
                    let ImageUrl = x.picture_url;
                    return (
                      <View key={index}>
                        <TouchableOpacity
                          style={{ marginLeft: 57, marginBottom: 0 }}
                          onPress={() => this.removeImage(x.id)}
                        >
                          <Icon name="remove" size={20} color="#999" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.selctedImage(x, index)}
                        >
                          <Image
                            style={[
                              styles.imageStyle,
                              this.state.selectedImageIndex == index ? styles.SelectedImage : styles.UnSelectedImage,
                            ]}
                            source={{ uri: ImageUrl }}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })
                }
                {userInfo && userInfo.usr_profile_photo.length <= 9 &&
                  <TouchableOpacity
                    style={styles.addNewPhoto}
                    key="9098"
                    onPress={() => this.UploadProfileImageFromMobile()}
                  >
                    <Icon name="plus" size={25} color="#fff" />
                  </TouchableOpacity>
                }
              </ScrollView>
            </View>
          </View>
          <TouchableOpacity
            style={styles.oNpressEvent}
            onPress={() =>
              navigation.navigate('UserDataUpdateField', {
                field: 'usr_nickname',
                title: 'ニックネーム',
                value: userInfo.usr_nickname,
              })
            }
          >
            <Text>ニックネーム</Text>
            <View style={styles.onPressEventRight}>
              <Text style={styles.onPressEventRightText}>
                {userInfo ? userInfo.usr_nickname : ''}
              </Text>
              <Icon name="angle-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <View style={styles.subTextInfo}>
            <Text>今日のひとこと</Text>
          </View>
          <TouchableOpacity
            style={styles.oNpressEvent}
            onPress={() =>
              navigation.navigate('UserDataUpdateField', {
                field: 'todays_message',
                title: '今日のひとこと',
                value: userInfo.todays_message,
              })
            }>
            <Text style={{ maxWidth: '80%' }}>
              {userInfo ? userInfo.todays_message : null}
            </Text>
            <View style={styles.onPressEventRight}>
              <Icon name="angle-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <View style={styles.subTextInfo}>
            <Text>自己紹介 </Text>
          </View>
          <TouchableOpacity
            style={styles.oNpressEvent}
            onPress={() =>
              navigation.navigate('UserDataUpdateField', {
                field: 'self_introduction',
                title: '自己紹介',
                value: userInfo.self_introduction,
              })
            }>
            <Text style={{ maxWidth: '80%', height: 150 }}>
              {userInfo ? userInfo.self_introduction : null}
            </Text>
            <View style={styles.onPressEventRight}>
              <Icon name="angle-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <View style={styles.subTextInfo}>
            <Text>詳細プロフィール </Text>
          </View>
          <TouchableOpacity
            style={styles.oNpressEvent}
            onPress={() => navigation.navigate('BasicSettings')}
          >
            <Text>基本情報</Text>
            <View style={styles.onPressEventRight}>
              <Text style={styles.onPressEventRightText}>{count}/10</Text>
              <Icon name="angle-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <View style={{ paddingBottom: 105 }} />

          <Spinner visible={this.state.loading} />
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
)(UserDataUpdate);
