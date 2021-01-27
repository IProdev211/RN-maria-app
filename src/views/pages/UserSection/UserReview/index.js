import React, { Component } from 'react';
import { View, Text, Image, TextInput, SafeAreaView } from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DashBoardHeader from '../../../components/DashBoardHeader';
import styles from './styles';

//redux
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

class UserReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
      userName: '',
      stars: null,
    };
  }

  componentDidMount() {
    this.getUserInformation();
  }

  getUserInformation = async () => {
    console.log(this.props.userInfo, 28);
    let profileImage = this.props.userInfo.usr_profile_photo
      ? this.props.userInfo.usr_profile_photo[0].picture_url
      : null;
    this.setState({
      userName: this.props.userInfo.usr_nickname,
      profileImage,
    });
  };

  render() {
    return (
      <SafeAreaView>
        <DashBoardHeader
          navigation={this.props.navigation}
          backNavigation={true}
          title={'ユーザーレビュー'}
        >
          <View>
            <Text style={styles.titleText}>ユーザーレビュー</Text>
          </View>
          <View style={styles.ProfileContainer}>
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
            <Text style={styles.bodyTitle}>{this.state.userName}</Text>
            <Text style={styles.bodySubTitle}>
              ホストが提供するサービスを評価する
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
            <Stars
              count={5}
              starSize={100}
              update={val => this.setState({ stars: val })}
              fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
              emptyStar={<Icon name={'star'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
              halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
            />
          </View>
          <View>
            <TextInput style={styles.comments} placeholder="追加コメント..." />
          </View>
          <View style={styles.optionHolder}>
            <TouchableOpacity style={{ ...styles.options, backgroundColor: '#6678AB', color: 'black' }}>
              <View>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontWeight: 'bold' }}>
                  レビュー送信
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.options}>
              <View>
                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: '#555' }}>
                  今はレビューしない
                </Text>
              </View>
            </TouchableOpacity>
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

export default connect(
  mapStateToProps,
  null,
)(UserReview);
