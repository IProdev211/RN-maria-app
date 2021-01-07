import EStyleSheet from 'react-native-extended-stylesheet';
import { ifIphoneX } from 'react-native-iphone-x-helper'


export default EStyleSheet.flatten(
  EStyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      ...ifIphoneX({
        paddingTop: 50
    }, {
        paddingTop: 0
    })
    },
    wrapper: {
      flex: 1,
    },
    gradient: {
      width: '100%',
      height: '100%',
    },
  }),
);
