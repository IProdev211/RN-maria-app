import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform} from 'react-native';
const {height} = Dimensions.get('window');

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
      bottom: 10,
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
      paddingTop: 20,
      flexDirection: 'row',
      paddingHorizontal: 20,
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
    BottomFixedButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 75,
    },
    scrollingOff: {
      marginTop: 180,
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
    content: {
      backgroundColor: 'white',
      padding: 22,
      paddingHorizontal: 22,
      paddingVertical: 30,
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    ModalView: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    AddCastContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 20,
    },
    AddCastContainerButton: {
      borderColor: '$primaryBgColor',
      borderWidth: 1,
      paddingVertical: 5,
      paddingHorizontal: 30,
      borderRadius: 6,
    },
    AddCastYesText: {
      color: '$primaryBgColor',
    },
    AddCastContainerButtonNo: {
      borderColor: 'gray',
      borderWidth: 1,
      paddingVertical: 5,
      paddingHorizontal: 30,
      borderRadius: 6,
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
