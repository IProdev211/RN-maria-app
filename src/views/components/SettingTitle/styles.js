import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    wrapper: {
      flex: 1,
    },
    textColor: {
      color: '#ACA7A1',
    },
  }),
);
