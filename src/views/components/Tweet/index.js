import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UpdateNiceTweetStatus from '../UpdateNiceTweetStatus';
import styles from './styles';

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}

  updateAPICall = id => {
    this.props.updateNice(id);
  };
  postdateFormatter = date => {
    let data = date ? date.split('/') : null;
    let formated = data ? `${data[1]}/${data[0]}/2020` : '';
    return formated;
  };
  gotoProfileDetails = user => {
    this.props.navigation.navigate('UserDetails', {userData: user});
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backgroundImage}
            onPress={() => this.props.onPressUserProfile()}>
            <Image
              source={{uri: this.props.ownerImage}}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={styles.content}>
            <View style={styles.mainContentStyle}>
              <View style={styles.UserAndLoveSection}>
                <TouchableOpacity
                  onPress={() => this.props.onPressUserProfile()}>
                  <Text style={styles.name}>{this.props.ownerName}</Text>
                  <View style={styles.dateFormatter}>
                    <Text style={styles.time}>{this.props.postedTime}</Text>
                    <Text style={styles.dateText}>
                      {this.postdateFormatter(
                        this.props.item.tweet_posted_date
                          ? this.props.item.tweet_posted_date
                          : null,
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
                <UpdateNiceTweetStatus
                  id={this.props.id}
                  item={this.props.item}
                  loved={this.props.loved}
                  isLoved={this.props.isLoved}
                  updateNice={() =>
                    this.updateAPICall(this.props.id, {
                      author_image: this.props.ownerName,
                    })
                  }
                />
              </View>
              <TouchableOpacity
                onPress={() => this.props.onPressContent(this.props.id)}>
                <Text>{this.props.post}</Text>
                {this.props.attachmentUrl ? (
                  <Image
                    source={{uri: this.props.attachmentUrl}}
                    style={styles.attachment}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Tweet;
