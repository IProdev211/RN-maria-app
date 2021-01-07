import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    ProfileContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 30,
    },
    headerContainer: {
      marginHorizontal: 15,
      paddingTop: 30,
    },
    titleText: {
      fontSize: 18,
      color: '$primaryBgColor',
      textAlign: 'center',
    },
    profilePicImage: {
      width: 90,
      height: 90,
      borderRadius: 75,
    },
    bodyTitle: {
      fontSize: 22,
      paddingTop: 10,
      color: '#3E5FAB',
      paddingBottom: 5,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    bodySubTitle: {
      fontSize: 16,
      color: '#3E5FAB',
      paddingBottom: 3,
      textAlign: 'center',
    },
    myStarStyle: {
      width: 38,
      fontSize: 30,
      marginTop: 10,
      color: 'orange',
      marginBottom: 10,
      backgroundColor: 'transparent',
    },
    myEmptyStarStyle: {
      color: '#ccc',
      fontSize: 30,
    },
    comments: {
      width: '85%',
      fontSize: 15,
      marginLeft: 30,
      borderWidth: 1.5,
      marginRight: 30,
      paddingLeft: 20,
      borderRadius: 5,
      paddingBottom: 60,
      fontWeight: 'bold',
      borderColor: '#ccc',
      backgroundColor: '#e4ecf2',
      color: '$primaryBgColor',
    },
    optionHolder: {
      margin: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    options: {
      height: 38,
      width: 160,
      borderRadius: 5,
      borderWidth: 0.5,
      textAlign: 'center',
      borderColor: '#bbb',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);
