import React, {Component} from 'react';
import styles from './styles';
import {
  AppRegistry,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  Platform,
  Text,
} from 'react-native';
class ProfileGirdElementOnlyImage extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View style={styles.imageHolder} elevation={5}>
        <Image
          source={{
            uri: this.props.imageURI
              ? this.props.imageURI
              : 'https://kenh14cdn.com/thumb_w/660/2019/2/24/3561716420480213454575853861059020806684672n-15510057259571546306615.jpg',
          }}
          style={styles.image}
        />
        <View style={styles.textViewHolder}>
          <Text
            style={{
              backgroundColor: 'gold',
              paddingHorizontal: 10,
              paddingBottom: 0,
              paddingTop: 0,
              borderRadius: 5,
              marginLeft: 5,
              color: '#555',
              fontSize: 14,
              fontWeight: 'bold',
              position: 'absolute',
              top: -180,
            }}>
            {this.props.userClass}
          </Text>
          <Image
            source={require('../../../assets/profile/blackG.png')}
            style={styles.bgImageForshawdow}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={styles.circle} />
            <Text numberOfLines={1} style={styles.textOnImage}>
              {this.props.name}
            </Text>
          </View>
          <Text style={styles.subText}>
            {this.props.userData.todays_message}
          </Text>
        </View>
      </View>
    );
  }
}
export default ProfileGirdElementOnlyImage;
