import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform} from 'react-native';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    textareaContainer: {
      height: 180,
      padding: 5,
      backgroundColor: '#F5FCFF',
    },
    textarea: {
      textAlignVertical: 'top', // hack android
      height: 170,
      fontSize: 14,
      color: '#333',
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
    },
    text: {
      marginBottom: 5,
      flexDirection: 'row',
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
      color: '#1E90FF',
    },
    postContainer: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    postAttachMent: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 5,
      borderWidth: 0.5,
      marginRight: 10,
    },
    postAttachMentPost: {
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 5,
      borderWidth: 0.5,
      backgroundColor: '$primaryBgColor',
      justifyContent: 'center',
      alignItems: 'center',
    },
    AttachMentImage: {
      width: '100%',
      height: 200,
    },
  }),
);
