import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: '$primaryBgColor',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 12,
      borderRadius: 4,
    },
    text: {
      color: '$primaryBgColor',
    },
    gradient: {
      width: '100%',
      height: '100%',
    },
  }),
);
