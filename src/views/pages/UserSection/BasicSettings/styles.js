import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform } from 'react-native';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    centerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    SpaceBetweenContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    ProfileContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      margin: 35,
      marginBottom: 0,
    },
    profilePic: {
      marginBottom: 15,
    },
    UserNameText: {
      color: '#816D3B',
      fontSize: 20,
      fontWeight: 'bold',
      paddingTop: 10,
    },
    titleContinerText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    coinContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    coinContainerText: {
      paddingLeft: 20,
    },
    stretch: {
      width: 50,
      height: 50,
    },
    stretchLOve: {
      width: 270,
      height: 50,
    },
    heartsText: {
      paddingHorizontal: 20,
    },
    OnClikText: {
      alignItems: 'center',
      paddingLeft: 20,
    },
    profilePicImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
    },
    editIcon: {
      backgroundColor: '$primaryBgColor',
      width: 40,
      height: 40,
      padding: 12,
      borderRadius: 25,
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    ImageContainer: {
      padding: 20,
      flexDirection: 'row',
    },
    imageStyle: {
      width: 80,
      height: 80,
      borderRadius: 50,
      marginRight: 30,
    },
    SelectedImage: {
      borderWidth: 4,
      borderColor: '$primaryBgColor',
      backgroundColor: 'red',
    },
    addNewPhoto: {
      backgroundColor: '$primaryBgColor',
      width: 80,
      height: 80,
      borderRadius: 50,
      marginRight: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    TextInputStyle: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
      margin: 10,
    },
    marginTop30: {
      marginTop: 30,
    },
    menuList: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      alignItems: 'center',
      paddingVertical: 15,
      borderWidth: 0.5,
      borderColor: '#adacac73',
    },
    onPressEventRight: {
      flexDirection: 'row',
    },
    onPressEventRightText: {
      paddingRight: 15,
      fontSize: 16,
    },
    subTextInfo: {
      paddingTop: 30,
      paddingLeft: 15,
      paddingBottom: 7,
    },
    content: {
      backgroundColor: 'white',
      padding: 22,
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
      fontSize: 20,
      marginBottom: 12,
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
    },
    DividerStyle: {
      marginVertical: 5,
    },
    input: {
      color: '$primaryBgColor',
    },
    cmStyle: {
      position: 'absolute',
      right: 0,
      top: 15,
    },
    spinnerTextStyle: {
      color: '#fff',
    },
  }),
);
