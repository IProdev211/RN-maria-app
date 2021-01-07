import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
export default EStyleSheet.flatten(
  EStyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: height,
      // paddingTop: 100,
      backgroundColor: '#fff',
      flex: 1,
    },
    qrImage: {
      width: width,
      height: width,
      // alignSelf: 'center',
    },
  }),
);
