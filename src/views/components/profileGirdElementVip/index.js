import React, {Component} from 'react';
import styles from './styles';
import {Image, View, Text} from 'react-native';
class ProfileGirdElement extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View style={styles.imageHolder} elevation={5}>
        <Image source={{uri: this.props.imageURI}} style={styles.image} />
        <View style={styles.textViewHolder}>
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
          <Text style={styles.subText}>秩 19お誕生日 素敵...</Text>
        </View>
        <View style={styles.addToFavHolder}>
          <Text style={styles.mainName}>明 まさひろ</Text>
        </View>
      </View>
    );
  }
}
export default ProfileGirdElement;
