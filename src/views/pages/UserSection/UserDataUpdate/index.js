import React, {Component} from 'react';
import {View, Text, Image, Platform} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import HeaderAfterLogin from '../../../components/DashBoardHeader';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showMessage} from 'react-native-flash-message';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  getUserDetails,
  uploadProfileImage,
  setProfilePicture,
} from '../../../../services/AuthService';

//redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {duckOperations} from '../../../../redux/Main/duck';

class UserDataUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      profileImage: null,
      userName: '',
      selectedImageIndex: 0,
      userData: null,
    };
  }
  componentDidMount() {
    this.getUserInformation();
  }
  componentDidUpdate() {}
  componentWillUnmount() {}
  getUserInformation = async () => {
    try {
      let response = await getUserDetails();
      if (response.isSuccess) {
        let user = response.result.success;
        let profileImage = user.is_profile_pic
          ? user.is_profile_pic
          : user.usr_profile_photo[0].picture_url;
        this.setState({
          userName: response.result.success.usr_nickname,
          profileImage,
          userData: response.result.success,
        });
        this.props.addUserInfo(user);
      }
      this.forceUpdate();
    } catch (errors) {
      this.setState({loading: false});
    }
  };

  UploadProfileImageFromMobile = () => {
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
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        this.uploadImagesIos(response);
      }
    });
  };

  uploadImagesIos = async data => {
    await ImageResizer.createResizedImage(data.uri, 500, 500, 'JPEG', 20, 0)
      .then(compressedImage => {
        this.uploadImages(compressedImage, compressedImage.path);
      })
      .catch(err => {
        this.showError(err);
      });
    this.setState({profileImage: data.uri});
  };

  uploadImages = async (data, path) => {
    try {
      this.setState({loading: true});
      let uriParts = path.split('.');
      let fileType = uriParts[uriParts.length - 1];
      console.log(fileType);
      let response = await uploadProfileImage(
        {},
        data.uri,
        `image/${fileType ? fileType : 'png'}`,
        `files.${fileType ? fileType : 'png'}`,
      );
      if (response && response.isSuccess) {
        console.log('Image up', response);
        this.getUserInformation();
      } else {
        this.setState({loading: false});
      }
    } catch (errors) {
      this.setState({loading: false});
      showMessage({
        message: '間違ったコードを入力しました',
        type: 'error',
      });
    }
  };

  selctedImage = async (x, id) => {
    this.setState({
      selectedProfileImage: x.picture_url,
      selectedImageIndex: id,
      profileImage: x.picture_url,
    });
    let data = {
      pic_id: x.id,
    };
    try {
      const response = await setProfilePicture(data);
      if (response.isSuccess) {
        this.getUserInformation();
      }
    } catch {}
    console.log(data);
  };

  render() {
    return (
      <HeaderAfterLogin
        title="マイページ"
        navigation={this.props.navigation}
        backNavigation={true}>
        <View style={{backgroundColor: '#FEF6E1', paddingBottom: 20}}>
          <View style={styles.ProfileContainer}>
            <View>
              {this.state.profileImage ? (
                <Image
                  style={styles.profilePicImage}
                  source={{uri: this.state.profileImage}}
                />
              ) : (
                <Image
                  style={styles.profilePicImage}
                  source={require('../../../../assets/panda.png')}
                />
              )}
            </View>
            <Text style={styles.UserNameText}>{this.state.userName}</Text>
          </View>
          <View style={styles.ImageContainer}>
            {this.state.userData &&
            this.state.userData.usr_profile_photo.length > 0
              ? this.state.userData.usr_profile_photo.map((x, index) => {
                  let ImageUrl = x.picture_url;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => this.selctedImage(x, index)}>
                      <Image
                        style={[
                          styles.imageStyle,
                          this.state.selectedImageIndex == index
                            ? styles.SelectedImage
                            : styles.UnSelectedImage,
                        ]}
                        source={{uri: ImageUrl}}
                      />
                    </TouchableOpacity>
                  );
                })
              : null}
            {this.state.userData &&
            this.state.userData.usr_profile_photo.length <= 9 ? (
              <TouchableOpacity
                style={styles.addNewPhoto}
                key="9098"
                onPress={() => this.UploadProfileImageFromMobile()}>
                <Icon name="plus" size={25} color="#fff" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <TouchableOpacity
          style={styles.oNpressEvent}
          onPress={() =>
            this.props.navigation.push('UserDataUpdateField', {
              field: 'usr_nickname',
              title: '氏名を更新する',
              value: this.state.userData.usr_nickname,
            })
          }>
          <Text>ニックネーム</Text>
          <View style={styles.onPressEventRight}>
            <Text style={styles.onPressEventRightText}>
              {this.state.userData ? this.state.userData.usr_nickname : ''}
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
            this.props.navigation.navigate('UserDataUpdateField', {
              field: 'todays_message',
              title: '今日のメッセージ',
              value: this.state.userData.todays_message,
            })
          }>
          <Text style={{maxWidth: '80%'}}>
            {this.state.userData ? this.state.userData.todays_message : null}
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
            this.props.navigation.navigate('UserDataUpdateField', {
              field: 'self_introduction',
              title: '氏名を更新する',
              value: this.state.userData.self_introduction,
            })
          }>
          <Text style={{maxWidth: '80%', height: 150}}>
            {this.state.userData ? this.state.userData.self_introduction : null}
          </Text>
          <View style={styles.onPressEventRight}>
            <Icon name="angle-right" size={25} color="#000" />
          </View>
        </TouchableOpacity>
        <View style={styles.subTextInfo}>
          <Text>基本情報</Text>
        </View>
        <TouchableOpacity
          style={styles.oNpressEvent}
          onPress={() => this.props.navigation.navigate('BasicSettings')}>
          <Text>ニックネーム</Text>
          <View style={styles.onPressEventRight}>
            <Text style={styles.onPressEventRightText}>3/10</Text>
            <Icon name="angle-right" size={25} color="#000" />
          </View>
        </TouchableOpacity>
        <View style={{paddingBottom: 50}} />
      </HeaderAfterLogin>
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
