import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

class HeaderWithCross extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.activeBack &&
          <TouchableOpacity
            style={styles.IconContainerBack}
            onPress={() => this.props.actionBackKey()}
          >
            <Image
              style={styles.backImage}
              source={require('../../../assets/icon/back.png')}
            />
          </TouchableOpacity>
        }

        <Text style={styles.titleStyle}>{this.props.title}</Text>
        <TouchableOpacity
          style={styles.IconContainer}
          onPress={() => this.props.action()}>
          <Image
            style={styles.crossImage}
            source={require('../../../assets/icon/cross.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default HeaderWithCross;
