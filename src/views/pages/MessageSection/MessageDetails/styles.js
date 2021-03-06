import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {width} = Dimensions.get('window');

export default EStyleSheet.flatten(
  EStyleSheet.create({
    container: {
      backgroundColor: '$primaryBgColor',
      //backgroundColor: 'white',
      paddingLeft: 15,
      ...Platform.select({
        ios: {
          paddingTop: getStatusBarHeight() + 10,
        },
        android: {
          paddingTop: 5,
          height: 50,
        },
        default: {
          backgroundColor: 'blue',
        },
      }),
    },
    titleStyle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    titleStyleWithBack: {
      color: '#fff',
      //color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    titleStyleContainer: {
      paddingVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    IconContainer: {
      position: 'absolute',
      right: 5,
      top: 5,
    },
    ModalView2: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    content: {
      backgroundColor: 'white',
      padding: 22,
      paddingHorizontal: 22,
      paddingVertical: 30,
      // justifyContent: 'flex-start',
      // alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    hourlyRate: {
      backgroundColor: 'white',
      height: 330,
      borderRadius: 10,
      padding: 15,
    },
    comments: {
      width: '100%',
      fontSize: 15,
      borderWidth: 1.5,
      paddingLeft: 20,
      borderRadius: 5,
      paddingBottom: 60,
      fontWeight: 'bold',
      borderColor: '#ccc',
      backgroundColor: '#E2E2E2',
      color: '$primaryBgColor',
    },
    optionHolder: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    options: {
      height: 38,
      width: '100%',
      borderRadius: 5,
      borderWidth: 0.5,
      textAlign: 'center',
      borderColor: '#bbb',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    options2: {
      height: 38,
      width: '50%',
      borderRadius: 5,
      borderWidth: 0.5,
      textAlign: 'center',
      borderColor: '#bbb',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    BlockOptions: {
      height: 30,
      width: 200,
      borderRadius: 5,
      borderWidth: 0.5,
      textAlign: 'center',
      borderColor: '#bbb',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    blockModal: {
      backgroundColor: 'white',
      height: 250,
      borderRadius: 10,
      padding: 15,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    DividerClass: {
      marginVertical: 5,
    },
    giftContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    giftButton: {
      padding: 10,
    },
    giftItem: {
      width: 50,
      height: 50,
    },
    loadEarlierButton: {
      width: '100%', 
      marginTop: 15, 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    giftModalTitle: {
      color: '$primaryBgColor',
      fontSize: 16,
    },
    blockUserTextContainer: {
      marginBottom: 25,
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
    blockUserText: {
      marginBottom: 15,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#8C8C8C',
    },
    blockCancel: {
      textAlign: 'center',
      fontSize: 15,
      fontWeight: 'bold',
      color: '#555',
    },
    blockButton: {
      backgroundColor: '#80201b',
      marginLeft: 15,
    },
    blockButtonText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold',
    },
    reportText: {
      textAlign: 'center',
      marginBottom: 10,
      paddingBottom: 10,
      fontSize: 25,
      fontWeight: 'bold',
      color: 'black',
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
    },
    reasonText: {
      marginBottom: 20,
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    optionHolderReport: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 20,
    },
    optionHolderReportoptions: {
      height: 38,
      borderRadius: 5,
      borderWidth: 0.5,
      textAlign: 'center',
      borderColor: '#bbb',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 25,
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
    },
    ModalView: {
      justifyContent: 'center',
      margin: 0,
    },
    rowTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '$primaryBgColor',
      paddingBottom: 15,
    },
    containerModal: {
      flexDirection: 'row',
      // justifyContent: 'space-evenly',
      alignItems: 'flex-start',
    },
    containerModalItem: {
      width: width / 2,
    },
    titleModal: {
      textAlign: 'left',
    },
    dateChoose: {
      marginVertical: 10,
      // width: '100%',
      backgroundColor: '#f1f2f3',
      padding: 5,
      marginRight: 15,
    },
  }),
);
