import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';

class CustomCardWithTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedCityText: '東京',
      selectedCityNumber: 1,
      modalSelector: false,
    };
  }
  changeCityModal = () => {
    this.setState({ modalSelector: !this.state.modalSelector });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.title &&
          <View style={styles.titleContiner}>{this.props.title}</View>
        }
        <View style={styles.content}>{this.props.children}</View>
      </View>
    );
  }
}

export default CustomCardWithTitle;
