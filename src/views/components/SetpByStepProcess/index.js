import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class SetpByStepProcess extends Component {
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
        disabled={this.props.disabled}
        style={styles.container}
        onPress={() => this.props.action()}>
        <Text style={styles.titleStyle}>{this.props.title}</Text>
        <View style={styles.IconContainer}>
          {this.props.hideIcon ? null : (
            <Icon name="angle-right" size={40} color="#fff" />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

export default SetpByStepProcess;
