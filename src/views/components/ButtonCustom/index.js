import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

class ButtonCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.onPress()}>
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

export default ButtonCustom;
