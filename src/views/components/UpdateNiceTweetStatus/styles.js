import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    root: {
      backgroundColor: '#FFFFFF',
    },
    container: {
      padding: 8,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#f1f2f3',
      alignItems: 'flex-start',
      backgroundColor: '#fff',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    UserAndLoveSection: {
      marginBottom: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    content: {
      flex: 1,
      marginLeft: 16,
      marginRight: 0,
    },
    mainContent: {
      marginRight: 60,
    },
    img: {
      height: 50,
      width: 50,
      margin: 0,
    },
    attachment: {
      marginTop: 20,
      width: '100%',
      height: 200,
      borderRadius: 5,
    },
    separator: {
      height: 1,
      backgroundColor: '#CCCCCC',
    },
    timeAgo: {
      fontSize: 12,
      color: '#696969',
    },
    name: {
      fontSize: 16,
      color: '#000',
    },
    time: {
      color: 'gray',
      fontSize: 12,
    },
    NONotificationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 40,
    },
    lovedSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    lovedSectionText: {
      color: 'gray',
      paddingLeft: 10,
      fontSize: 16,
    },
  }),
);
