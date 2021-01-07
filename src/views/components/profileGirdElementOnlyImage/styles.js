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
      margin: 5,
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
      height: 255,
      width: 165,
      resizeMode: 'cover',
      borderRadius: 4,
    },
    bgImageForshawdow: {
      height: 240,
      position: 'absolute',
      left: 0,
      bottom: -5,
      right: 0,
      width: '105%',
      borderRadius: 10,
    },
    textViewHolder: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      paddingHorizontal: 1,
      paddingVertical: 10,
      flexDirection: 'column',
      borderRadius: 4,
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
      backgroundColor: '#e91e63',
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
    subText: {
      color: '#fff',
      paddingLeft: 5,
      fontSize: 10,
    },
    mainName: {
      textAlign: 'center',
      color: 'gray',
      padding: 7,
    },
  }),
);
