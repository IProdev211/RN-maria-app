import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform} from 'react-native';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    bgColor: {
      backgroundColor: '#fff',
    },
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    text: {
      color: 'grey',
      fontSize: 30,
      fontWeight: 'bold',
    },
    profileimagw: {
      height: 400,
    },
    profileTextContainer: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      padding: 20,
    },
    BackButtonContainer: {
      position: 'absolute',
      right: 0,
      bottom: 20,
      padding: 20,
    },
    circle: {
      width: 10,
      height: 10,
      borderRadius: 10 / 2,
      backgroundColor: '#21E31B',
      margin: 5,
    },
    textOnImage: {
      color: '#fff',
      fontWeight: 'bold',
    },
    subText: {
      color: '#fff',
      paddingLeft: 5,
      fontSize: 10,
    },
    ImageContainer: {
      padding: 20,
      flexDirection: 'row',
    },
    imageStyle: {
      width: 70,
      height: 70,
      borderRadius: 50,
      marginRight: 30,
    },
    SelectedImage: {
      borderWidth: 4,
      borderColor: '$primaryBgColor',
      backgroundColor: 'red',
    },
    basicInformationContainer: {
      flexDirection: 'column',
      paddingHorizontal: 15,
    },
    paddingBottom50: {
      paddingBottom: 50,
    },
    basicInformation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 10,
    },
    basicInformationText: {
      fontSize: 16,
    },
    basicInformationTextPrice: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    DividerClass: {
      marginVertical: 20,
    },
    sheduleText: {
      color: '$primaryBgColor',
      fontSize: 18,
    },
    Ccontainer: {
      height: Dimensions.get('window').height - 50,
    },
    paddingTop20: {
      paddingTop: 20,
    },
    basInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 0.5,
      borderColor: '#A6A39D',
    },
    basInfoValue: {
      color: '#A6A39D',
    },
    tagContiner: {
      flexDirection: 'row',
      marginHorizontal: 15,
    },
    textTags: {
      borderWidth: 0.5,
      marginLeft: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 4,
    },

    myStarStyle: {
      width: 18,
      fontSize: 16,
      color: 'orange',
      marginBottom: 10,
      backgroundColor: 'transparent',
    },
    myEmptyStarStyle: {
      color: '#ccc',
      fontSize: 16,
    },
    BottomFixedButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 50,
    },
    CallingButtonCOntainer: {
      backgroundColor: '#f7f7f7',
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderTopWidth: 0.5,
      borderTopColor: '#A6A39D',
    },
    ButtonChat: {
      backgroundColor: '$primaryBgColor',
      marginVertical: 15,
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 4,
    },
    ButtonChatText: {
      color: '#fff',
    },
    content2: {
      backgroundColor: 'white',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
      fontSize: 20,
      marginBottom: 12,
    },
    ModalView: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    ModalView2: {
      justifyContent: 'center',
      margin: 0,
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
    },
    ProfileContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 5,
    },
    titleText: {
      paddingTop: 20,
      textAlign: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingBottom: 30,
      marginBottom: 30,
      marginRight: 55,
      marginLeft: 55,
      marginTop: 30,
      fontSize: 22,
      color: '#3E5FAB',
      fontWeight: 'bold',
      borderBottomWidth: 0.5,
      borderBottomColor: '#999',
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
      color: 'gray',
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
    spinnerTextStyle: {
      color: '#fff',
    },
    userClass: {
      backgroundColor: 'gold',
      paddingHorizontal: 20,
      borderRadius: 5,
      marginLeft: 5,
      color: '#000',
      fontSize: 16,
      fontWeight: 'bold',
    },
    verifiedStyle: {
      color: '$primaryBgColor',
      padding: 5,
      fontSize: 16,
      marginTop: -3,
    },
  }),
);
