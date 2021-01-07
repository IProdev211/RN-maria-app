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
    },
    profilePic: {
      marginBottom: 15,
    },
    UserNameText: {
      color: '#816D3B',
      fontSize: 20,
      fontWeight: 'bold',
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
  }),
);
