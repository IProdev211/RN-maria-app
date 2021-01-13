import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform} from 'react-native';

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
      backgroundColor: '$secondaryBgColor',
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
      flexWrap: 'wrap',
    },
    imageStyle: {
      width: 80,
      height: 80,
      borderRadius: 50,
      marginRight: 30,
    },
    SelectedImage: {
      marginTop: 5,
      borderWidth: 4,
      borderColor: '$primaryBgColor',
      backgroundColor: 'red',
    },
    UnSelectedImage: {
      marginTop: 5,
      backgroundColor: 'gray',
    },
    addNewPhoto: {
      backgroundColor: '$primaryBgColor',
      width: 80,
      height: 80,
      borderRadius: 50,
      marginRight: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 25,
    },
    oNpressEvent: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      alignItems: 'center',
      paddingVertical: 15,
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
  }),
);
