import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    container: {
      margin: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
    },
    titleContiner: {
      backgroundColor: '$primaryBgColor',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      height: 35,
    },
    content: {
      padding: 10,
    },
  }),
);
