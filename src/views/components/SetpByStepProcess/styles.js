import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    container: {
      backgroundColor: '$primaryBgColor',
      height: 50,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    titleStyle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    IconContainer: {
      position: 'absolute',
      right: 15,
      top: 5,
    },
    crossImage: {
      width: 40,
      height: 40,
    },
    IconContainerBack: {
      position: 'absolute',
      left: 5,
      top: 10,
    },
    backImage: {
      width: 30,
      height: 30,
    },
  }),
);
