import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform } from 'react-native';

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
    flexDirectionRow: {
      flexDirection: 'row',
    },
    settingRightText: {
      fontSize: 16,
      marginRight: 20,
    },
    terms: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      borderBottomWidth: 0.5,
      borderBottomColor: '#ACA7A1',
      fontSize: 16,
    }
  }),
);
