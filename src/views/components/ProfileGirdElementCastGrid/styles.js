import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 20,
    },
    circle: {
      width: 10,
      height: 10,
      borderRadius: 10 / 2,
      backgroundColor: '#21E31B',
      margin: 5,
    },
    imageHolder: {
      margin: 7,
      height: 255,
      flex: 1,
      position: 'relative',
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#f1f2f3',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
    },
    bgImageForshawdow: {
      height: 235,
      position: 'absolute',
      left: 0,
      bottom: -10,
      right: 0,
      //   backgroundColor: 'red',
      width: '100%',
    },
    textViewHolder: {
      position: 'absolute',
      left: 0,
      bottom: 35,
      right: 0,
      paddingHorizontal: 1,
      paddingVertical: 7,
      flexDirection: 'column',
      backgroundColor: '#00000069',
    },
    textOnImage: {
      color: '#fff',
      fontWeight: 'bold',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      paddingTop: 10,
      fontSize: 18,
      color: 'black',
    },
    buttonDesign: {
      padding: 15,
      backgroundColor: '#fff',
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      alignSelf: 'stretch',
    },
    addToFavHolder: {
      backgroundColor: '#fff',
      marginTop: -35,
      height: 35,
    },
    addToFavHolderS: {
      backgroundColor: '$primaryBgColor',
      marginTop: -35,
      height: 35,
    },
    subText: {
      color: '#fff',
      paddingLeft: 5,
      fontSize: 10,
    },
    mainName: {
      textAlign: 'center',
      color: 'black',
      padding: 7,
      fontSize: 17,
    },
    mainNameS: {
      textAlign: 'center',
      color: '#fff',
      padding: 7,
      fontSize: 17,
    },
    bandage: {
      position: 'absolute',
      left: 0,
      top: 18,
      backgroundColor: '#ffffff82',
      paddingHorizontal: 10,
      paddingVertical: 1,
      flexDirection: 'row',
    },
    bandageText: {
      paddingLeft: 10,
    },
  }),
);
