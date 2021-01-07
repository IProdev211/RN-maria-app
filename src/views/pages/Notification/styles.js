import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform} from 'react-native';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    headerStyle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    bodyContainer: {
      padding: 5,
    },
    spinnerTextStyle: {
      color: '#FFF',
    },
    tabOption: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      // marginBottom: 20,
    },
    tabOptionSelect: {
      backgroundColor: '#FEF5DE',
      width: '50%',
      height: 40,
      borderBottomWidth: 3,
      borderBottomColor: '$primaryBgColor',
      paddingVertical: 10,
    },
    tabOptionUnselect: {
      backgroundColor: '#FFFFFF',
      width: '50%',
      height: 40,
      borderBottomWidth: 3,
      borderBottomColor: '#E7E6E6',
      paddingVertical: 10,
    },
    tabOptionText: {
      textAlign: 'center',
    },
    tabOptionTextSelected: {
      textAlign: 'center',
      color: '$primaryBgColor',
    },
    tagsUnselect: {
      borderWidth: 2,
      borderColor: '#E7E6E6',
      borderRadius: 4,
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginRight: 10,
    },
    root: {
      backgroundColor: '#FFFFFF',
    },
    container: {
      padding: 16,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#FFFFFF',
      alignItems: 'flex-start',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '$secondaryBgColor',
    },
    text: {
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
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
      position: 'absolute',
      right: 0,
      height: 50,
      width: 50,
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
      color: '$primaryBgColor',
    },
    NONotificationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 40,
    },
    unreadNotification: {
      color: '#fff',
      backgroundColor: '$primaryBgColor',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 30,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#dcdcdc',
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      padding: 10,
      justifyContent: 'space-between',
    },
    pic: {
      borderRadius: 25,
      width: 50,
      height: 50,
    },
    nameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 270,
    },
    nameTxt: {
      fontWeight: '600',
      color: '#222',
      fontSize: 15,
    },
    mblTxt: {
      fontWeight: '200',
      color: '#777',
      fontSize: 13,
    },
    end: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    time: {
      fontWeight: '400',
      color: '#666',
      fontSize: 12,
    },
    icon: {
      height: 28,
      width: 28,
    },
  }),
);
