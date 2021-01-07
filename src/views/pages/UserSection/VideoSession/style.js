import {Dimensions, StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default EStyleSheet.flatten(
  EStyleSheet.create({
    max: {
      flex: 1,
      height: dimensions.height,
    },
    buttonHolder: {
      height: 100,
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#0093E9',
      borderRadius: 25,
    },
    buttonText: {
      color: '#fff',
    },
    fullView: {
      width: dimensions.width,
      height: dimensions.height,
    },
    remoteContainer: {
      width: '100%',
      height: 150,
      position: 'absolute',
      top: 5,
    },
    countdownTimer: {
      position: 'absolute',
      bottom: -25,
      fontSize: 16,
      color: '#fff',
      width: 100,
      textAlign: 'center',
    },
    remote: {
      width: 150,
      height: 150,
      marginHorizontal: 2.5,
    },
    noUserText: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      color: '#0093E9',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 10,
    },

    buttonWrapper: {
      backgroundColor: '#00000033',
      width: Dimensions.get('window').width - 20,
      height: 80,
      borderRadius: 6,
      marginHorizontal: 10,
    },
    buttonMain: {
      width: 45,
      height: 45,
      borderRadius: 30,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonMainDanger: {
      width: 45,
      height: 45,
      borderRadius: 30,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
    regularButtonIcon: {
      color: 'black',
      fontSize: 35,
    },
    stopButtonContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    stopButton: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: '$primaryBgColor',
      alignItems: 'center',
      justifyContent: 'center',
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
    content2: {
      backgroundColor: '#ffffff',
      padding: 22,
      paddingHorizontal: 22,
      paddingVertical: 30,
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      height: Dimensions.get('window').height / 2,
    },
    rowTitle: {
      fontSize: 18,
      color: '$primaryBgColor',
    },
    mainRow: {
      paddingBottom: 20,
    },
    startCallSection: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 400,
      marginTop: -100,
    },
    photoContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
    },
    profileName: {
      fontSize: 20,
      paddingVertical: 10,
    },
    callText: {
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
      paddingHorizontal: 10,
    },
    callButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    spinnerTextStyle: {
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
    buttonAccept: {
      width: 150,
    },
    buttonAcceptRed: {
      width: 150,
      backgroundColor: 'red',
      borderColor: 0,
    },
    buttonAcceptGreen: {
      width: 150,
      backgroundColor: 'green',
      borderColor: 0,
    },
    buttonAcceptTitle: {
      color: '#fff',
    },
    thanksContainer: {
      paddingVertical: 20,
      marginBottom: 10,
    },
    thanksText: {
      textAlign: 'center',
      fontSize: 16,
    },
    iconColor: {
      color: '$primaryBgColor',
    },
    customInputContainer: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection: 'row',
    },
    customInputStartCall: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: 80,
      color: '$primaryBgColor',
    },
    customInputStartText: {
      fontSize: 16,
      justifyContent: 'center',
      paddingHorizontal: 10,
      paddingVertical: 7,
    },
    sessionDetails: {
      fontSize: 16,
    },
    centerImage: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
  }),
);
