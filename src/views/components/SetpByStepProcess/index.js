import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const SetpByStepProcess = (props) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={styles.container}
      onPress={() => props.action()}
    >
      <Text style={styles.titleStyle}>{props.title}</Text>
      <View style={styles.IconContainer}>
        {!props.hideIcon &&
          <Icon name="angle-right" size={40} color="#fff" />
        }
      </View>
    </TouchableOpacity>
  );
}

export default SetpByStepProcess;
