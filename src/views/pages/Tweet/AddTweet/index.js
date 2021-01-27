import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import Textarea from 'react-native-textarea';
import * as ImagePicker from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  uploadTweetImage,
  createTweet,
} from '../../../../services/AuthService';
import DashBoardHeader from '../../../components/DashBoardHeader';
import styles from './styles';

class AddTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet_content: '',
      TweetImage: null,
      process6ImagePath: '',
      imageType: '',
      tweet_picture: null,
      loading: false,
    };
  }

  imagePickerForTweetImage = () => {
    Alert.alert(
      '画像アップロード',
      '画像をアップロードしてください。',
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
        this.setState({
          TweetImage: response.uri,
          process6ImagePath: response.path,
          imageType: response.type,
        });
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
        this.setState({
          TweetImage: response.uri,
          process6ImagePath: response.path,
          imageType: response.type,
        });
      }
    });
  };

  uploadTweet = async () => {
    if (this.state.TweetImage) {
      this.setState({ loading: true });
      try {
        let uriParts = this.state.process6ImagePath.split('.');
        let fileType = uriParts[uriParts.length - 1];
        let response = await uploadTweetImage(
          {},
          this.state.TweetImage.uri,
          `image/${fileType ? fileType : 'png'}`,
          `files.${fileType ? fileType : 'png'}`,
        );
        if (response && response.isSuccess) {
          this.setState({ tweet_picture: response.result.success.profile_pic });
          this.updatePost();
        } else {
          showMessage({
            message: '失敗しました。',
            type: 'error',
          });
          this.setState({ loading: false });
        }
      } catch (errors) {
        this.setState({ loading: false });
        showMessage({
          message: '失敗しました。',
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
        this.props.navigation.push('TweetDetails');
        showMessage({
          message: '投稿が正常に追加されました。',
          type: 'success',
        });
      } else {
        showMessage({
          message: '投稿を作成できません。管理者に連絡してください！',
          type: 'error',
        });
      }
      this.setState({ loading: false });
    } catch (errors) {
      showMessage({
        message: 'インターネット接続を確認してください！',
        type: 'error',
      });
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <SafeAreaView>
        <DashBoardHeader
          navigation={this.props.navigation}
          title="つぶやきを投稿 "
          notificationHide={true}
          backNavigation={true}
        >
          <View style={{ flex: 1, height: '100%' }}>
            <View style={styles.container}>
              <Image
                source={{
                  uri: this.props.userInfo.is_profile_pic
                    ? this.props.userInfo.is_profile_pic
                    : 'https://bootdey.com/img/Content/avatar/avatar1.png',
                }}
                style={styles.avatar}
              />
              <View style={styles.content}>
                <View>
                  <View style={styles.text}>
                    <Text style={styles.name}> {this.props.userInfo.usr_nickname}</Text>
                  </View>
                  <Text>{this.props.userInfo.todays_message}</Text>
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
              {this.state.TweetImage &&
                <Image
                  style={styles.AttachMentImage}
                  source={{ uri: this.state.TweetImage }}
                />
              }
            </View>
            <View style={styles.postContainer}>
              <TouchableOpacity
                style={styles.postAttachMent}
                onPress={() => this.imagePickerForTweetImage()}
              >
                <Icon name="image" size={30} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.postAttachMentPost}
                onPress={() => this.uploadTweet()}
              >
                <Text>役職を投稿</Text>
              </TouchableOpacity>
            </View>
          </View>

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

export default connect(mapStateToProps, null)(AddTweet);
