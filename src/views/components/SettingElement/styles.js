import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      borderBottomWidth: 0.5,
      borderBottomColor: '#ACA7A1',
    },
    textColor: {
      fontSize: 16,
    },
  }),
);
