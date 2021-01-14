import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Textarea from 'react-native-textarea';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import HeaderAfterLogin from '../../../components/DashBoardHeader';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  uploadTweetImage,
  createTweet,
  getUserDetails,
} from '../../../../services/AuthService';
import { showMessage } from 'react-native-flash-message';
// import AnimatedLoader from 'react-native-animated-loader';
import Spinner from 'react-native-loading-spinner-overlay';

class AddTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet_content: '',
      TweetImage: '',
      process6ImagePath: '',
      imageType: '',
      tweet_picture: null,
      loading: false,
      todays_message: '',
    };
  }
  componentDidMount() {
    this.getUserInformation();
  }

  imagePickerForTweetImage = () => {
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
        this.uploadImagesReSizer(response);
      }
    });
  };
  uploadImagesReSizer = async data => {
    await ImageResizer.createResizedImage(data.uri, 500, 500, 'JPEG', 20, 0)
      .then(compressedImage => {
        console.log(compressedImage);
        const source = { uri: compressedImage.uri };
        this.setState({
          TweetImage: source,
          process6ImagePath: compressedImage.path,
          imageType: compressedImage.type,
        });
        console.log(this.state);
      })
      .catch(err => {
        this.showError(err);
      });
  };
  uploadTweet = async () => {
    this.setState({ loading: true });
    if (this.state.TweetImage) {
      try {
        this.setState({ loading: true });
        let uriParts = this.state.process6ImagePath.split('.');
        let fileType = uriParts[uriParts.length - 1];
        let response = await uploadTweetImage(
          {},
          this.state.TweetImage.uri,
          `image/${fileType ? fileType : 'png'}`,
          `files.${fileType ? fileType : 'png'}`,
        );
        if (response && response.isSuccess) {
          this.setState({
            tweet_picture: response.result.success.profile_pic,
          });
          this.updatePost();
        } else {
          this.setState({ loading: false });
        }
      } catch (errors) {
        this.setState({ loading: false });
        showMessage({
          message: '間違ったコードを入力しました',
          type: 'error',
        });
      }
    } else {
      this.updatePost();
    }
  };
  updatePost = async () => {
    let data = {
      tweet_content: this.state.tweet_content,
      tweet_picture: this.state.tweet_picture,
    };
    try {
      let response = await createTweet(data);
      if (response.isSuccess) {
        this.setState({ loading: false });
        this.props.navigation.push('TweetDetails');
        showMessage({
          message: '投稿が正常に追加されました。',
          type: 'success',
        });
      } else {
        this.setState({ loading: false });
        showMessage({
          message: '投稿を作成できません。管理者に連絡してください！',
          type: 'error',
        });
      }
    } catch (errors) {
      this.setState({ loading: false });
      showMessage({
        message: 'インターネット接続を確認してください！',
        type: 'error',
      });
    }
  };
  getUserInformation = async () => {
    try {
      let response = await getUserDetails();
      if (response.isSuccess) {
        console.log(response);
        let profileImage =
          response.result.success.usr_profile_photo[0].picture_url;
        let userName = response.result.success.usr_nickname;
        let todays_message = response.result.success.todays_message;
        this.setState({
          userName,
          profileImage,
          todays_message,
        });
      }
    } catch (errors) {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <HeaderAfterLogin
        navigation={this.props.navigation}
        title="つぶやきを投稿 "
        notificationHide={true}
        backNavigation={true}>
        <View style={{ flex: 1, height: '100%' }}>
          <View style={styles.container}>
            <Image
              source={{
                uri: this.state.profileImage
                  ? this.state.profileImage
                  : 'https://bootdey.com/img/Content/avatar/avatar1.png',
              }}
              style={styles.avatar}
            />
            <View style={styles.content}>
              <View>
                <View style={styles.text}>
                  <Text style={styles.name}> {this.state.userName}</Text>
                </View>
                <Text>{this.state.todays_message}</Text>
              </View>
            </View>
          </View>
          <View style={styles.textAreaContainer}>
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              onChangeText={x => this.setState({ tweet_content: x })}
              defaultValue={this.state.tweet_content}
              maxLength={500}
              placeholder={'キャストについて役職する 。。。'}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
            />
          </View>
          <View>
            {this.state.TweetImage ? (
              <Image
                style={styles.AttachMentImage}
                source={this.state.TweetImage}
              />
            ) : null}
          </View>
          <View style={styles.postContainer}>
            <TouchableOpacity
              style={styles.postAttachMent}
              onPress={() => this.imagePickerForTweetImage()}>
              <Icon name="image" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.postAttachMentPost}
              onPress={() => this.uploadTweet()}>
              <Text>役職を投稿</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <AnimatedLoader
          visible={this.state.loading}
          overlayColor="#ffffff3b"
          source={require('../../../../assets/lottie/orange-pulse.json')}
          animationStyle={styles.lottie}
          speed={1}
        /> */}
        <Spinner
          visible={this.state.loading}
          textContent={'読み込み中...'}
          textStyle={styles.spinnerTextStyle}
        />
      </HeaderAfterLogin>
    );
  }
}

export default AddTweet;
