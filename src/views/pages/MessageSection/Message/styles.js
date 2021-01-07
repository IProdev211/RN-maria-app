import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform} from 'react-native';
const {height} = Dimensions.get('window');

export default EStyleSheet.flatten(
  EStyleSheet.create({
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
      borderBottomColor: '#F3B920',
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
      color: '#F3B920',
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
      backgroundColor: '#f1f2f3',
      height,
    },
    container: {
      padding: 16,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#f7f7f7',
      alignItems: 'flex-start',
      backgroundColor: '#fff',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    text: {
      marginBottom: 5,
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
    age: {
      fontSize: 16,
    },
    NONotificationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 40,
    },
    scrollingHeight: {
      flex: 1,
      height: height,
      backgroundColor: 'red',
    },
    scrollView: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ageShow: {
      fontSize: 10,
    },
  }),
);
