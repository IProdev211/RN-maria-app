import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform} from 'react-native';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    container: {
      backgroundColor: '$primaryBgColor',
      height: 50,
      padding: 5,
      paddingLeft: 15,
    },
    titleStyle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    titleStyleWithBack: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      paddingLeft: 15,
    },
    titleStyleContainer: {
      paddingTop: 0,
      flexDirection: 'row',
      alignItems: 'center',
    },
    IconContainer: {
      position: 'absolute',
      right: 5,
      top: 5,
    },
  }),
);
