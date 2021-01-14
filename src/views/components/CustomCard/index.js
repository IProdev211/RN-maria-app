import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import styles from './styles';

class CustomCard extends Component {
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
    return <View style={styles.container}>{this.props.children}</View>;
  }
}

export default CustomCard;
