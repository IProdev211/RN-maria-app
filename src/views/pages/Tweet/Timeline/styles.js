import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform} from 'react-native';
const {height} = Dimensions.get('window');

export default EStyleSheet.flatten(
  EStyleSheet.create({
    headerStyle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    bodyContainer: {
      padding: 5,
    },
    spinnerTextStyle: {
      color: '#FFF',
    },
    container: {
      flexDirection: 'column',
      paddingHorizontal: 30,
      paddingVertical: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    root: {
      height: height - 120,
    },
  }),
);
