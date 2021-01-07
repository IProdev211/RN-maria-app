import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
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
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  changeCityModal = () => {
    this.setState({modalSelector: !this.state.modalSelector});
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.title ? (
          <View style={styles.titleContiner}>{this.props.title}</View>
        ) : null}
        <View style={styles.content}>{this.props.children}</View>
      </View>
    );
  }
}

export default CustomCardWithTitle;
