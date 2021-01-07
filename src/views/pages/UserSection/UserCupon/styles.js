import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform} from 'react-native';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    optionHolder: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    options: {
      height: 50,
      width: 350,
      marginRight: 10,
      borderRadius: 5,
      borderWidth: 0.5,
      textAlign: 'center',
      borderColor: '#bbb',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);
