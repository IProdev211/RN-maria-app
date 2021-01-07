import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

class SettingTitle extends Component {
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
      <View style={{backgroundColor: '#F2F1ED', padding: 15}}>
        <Text style={styles.textColor}>{this.props.text}</Text>
      </View>
    );
  }
}

export default SettingTitle;
