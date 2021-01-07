import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

class SettingElement extends Component {
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
      <View style={styles.container}>
        <Text style={styles.textColor}>{this.props.text}</Text>
        {this.props.children}
      </View>
    );
  }
}

export default SettingElement;
