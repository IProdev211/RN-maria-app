import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import golbalConstants from "../../Common/GlobalStyles/constants"

class BgComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() { }
  componentDidUpdate() { }
  componentWillUnmount() { }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={golbalConstants.statusBar} barStyle={golbalConstants.barStyle} />
        <LinearGradient
          colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
          style={styles.gradient}
        />
        <View style={styles.container}>
          <View style={styles.wrapper}>{this.props.children}</View>
        </View>
      </View>
    );
  }
}

export default BgComponent;
