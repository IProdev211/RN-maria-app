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
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    userRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#f1f2f3',
    },
    UnseNameTitle: {
      fontSize: 18,
      color: 'gray',
      marginBottom: 3,
    },
    bageStyle: {color: '#fff'},
    leftSideIcon: {
      padding: 10,
      backgroundColor: '#03A9F5',
      marginRight: 3,
      borderRadius: 20,
    },
    selectedUser: {
      position: 'absolute',
      top: 0,
      backgroundColor: '#0000003d',
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignSelf: 'center',
      padding: 10,
    },
  }),
);
