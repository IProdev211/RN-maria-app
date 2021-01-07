import EStyleSheet from 'react-native-extended-stylesheet';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Platform, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
export default EStyleSheet.flatten(
  EStyleSheet.create({
    container: {
      backgroundColor: '$secondaryBgColor',
      padding: 5,
      ...Platform.select({
        ios: {
          paddingTop: getStatusBarHeight(),
        },
        android: {
          paddingTop: 5,
          height: 50,
        },
        default: {
          backgroundColor: '$secondaryBgColor',
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
      fontSize: 16,
      fontWeight: 'bold',
      paddingLeft: 15,
    },
    titleStyleContainer: {
      paddingTop: 0,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 2,
    },
    titleStyleContainer1: {
      paddingTop: 0,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: -4,
    },
    IconContainer: {
      position: 'absolute',
      right: 5,
      top: 5,
    },
    crossImage: {
      width: 40,
      height: 40,
    },
    IconContainerBack: {
      position: 'absolute',
      left: 5,
      top: 10,
    },
    backImage: {
      width: 30,
      height: 30,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    citySelector: {
      borderColor: '#fff',
      borderWidth: 1,
      paddingHorizontal: 25,
      // paddingVertical: 5,
      backgroundColor: '#fff',
      borderRadius: 15,
      flexDirection: 'row',
    },
    citySelectorText: {
      paddingVertical: 5,
      color: '$secondaryBgColor',
    },
    citySelectorIcon: {
      marginLeft: 10,
      marginTop: 2,
    },
    content: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      height: height / 1.5,
    },
    contentTitle: {
      fontSize: 20,
      marginBottom: 12,
    },
    NonSelected: {
      margin: 5,
      borderWidth: 1,
      // width: '100%',
      borderColor: '$secondaryBgColor',
      padding: 5,
      alignItems: 'center',
      borderRadius: 10,
      // width: 300,
    },
    Selected: {
      margin: 5,
      borderWidth: 1,
      // width: 300,
      borderColor: '$secondaryBgColor',
      padding: 5,
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '$secondaryBgColor',
    },
    NonSelectedCity: {
      margin: 5,
      borderWidth: 1,
      // width: '100%',
      borderColor: '$secondaryBgColor',
      padding: 5,
      alignItems: 'center',
      borderRadius: 10,
      // width: 300,
    },
    SelectedCity: {
      margin: 5,
      borderWidth: 1,
      // width: 300,
      borderColor: '$secondaryBgColor',
      padding: 5,
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '$secondaryBgColor',
    },
    scrollView: {
      paddingBottom: 140,
      backgroundColor: '#F2F1ED',
    },
    Ccontainer: {
      paddingBottom: 90,
    },
    marginLeft20: {
      marginLeft: 20,
    },
    titleStyleWithBackRight: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      paddingLeft: 15,
      paddingTop: 5,
    },
    scrollPadding: {
      marginTop: 160,
    },
    okButton: {
      marginTop: 10,
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderColor: '$secondaryBgColor',
      borderWidth: 1,
      borderRadius: 4,
    },
    conatinerModal: {
      width: 300,
    },
    notificationNumber: {
      position: 'absolute',
      right: -5,
      top: -5,
      width: 17,
      height: 17,
      backgroundColor: 'red',
      borderRadius: 10,
      fontSize: 12,
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
  }),
);
