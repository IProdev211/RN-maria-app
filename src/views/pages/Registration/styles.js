import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform} from 'react-native';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    container: {
      paddingBottom: 100,
    },
    centerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    paddingTop20: {
      paddingTop: 20,
    },
    paddingBottom20: {
      paddingBottom: 20,
    },
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
    mainWrapper: {
      padding: 0,
    },
    pading20: {
      padding: 20,
    },
    topLogoSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 50,
      paddingBottom: 50,
    },
    logo: {
      width: 200,
      height: 160,
    },
    textSection: {
      flexDirection: 'column',
      width: '100%',
    },
    textSectionRow: {
      flexDirection: 'row',
      padding: 10,
      marginBottom: 10,
    },
    textSectionRowIcon: {
      paddingRight: 10,
      width: 80,
    },
    textSectionRowText: {},
    textSectionRowTextMain: {
      fontSize: 20,
      color: '$primaryBgColor',
      fontWeight: 'bold',
    },
    textSectionRowTextSub: {
      fontSize: 14,
      color: '$primaryBgColor',
    },
    botomActionSection: {
      padding: 10,
      marginTop: 20,
      flexDirection: 'column',
    },
    loginWithFb: {
      //
      // borderRadius: 40,
      flexDirection: 'row',
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 50,
      paddingRight: 50,
      marginBottom: 20,
    },
    loginWithRadiunt: {
      flexDirection: 'row',
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 50,
      paddingRight: 50,
    },
    linearGradient: {
      marginBottom: 20,
    },
    fb: {
      backgroundColor: '#3C599F',
    },
    line: {
      backgroundColor: '#00B400',
    },
    google: {
      backgroundColor: '#fff',
    },
    twitter: {
      backgroundColor: '#1C9CEA',
    },
    email: {
      backgroundColor: '$secondaryBgColor',
    },
    loginWithFbIcon: {
      paddingLeft: 10,
      width: 50,
    },
    loginWithFbText: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginWithFbTextMain: {
      color: '#fff',
      fontSize: 16,
    },
    loginWithFbTextSub: {
      color: '#fff',
      fontSize: 12,
    },
    loginWithFbTextSubBlack: {
      color: '#484848',
      fontSize: 12,
    },
    loginWithSMS: {
      backgroundColor: '#fff',
      borderRadius: 40,
      flexDirection: 'row',
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 50,
      paddingRight: 50,
      marginBottom: 20,
    },
    loginWithSMSTextMain: {
      color: '#484848',
      fontSize: 16,
    },
    stageOneStyle: {
      height: '100%',
      backgroundColor: '#fff',
    },
    textContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 30,
      paddingBottom: 30,
    },
    inputContainer: {
      paddingLeft: 20,
      paddingRight: 20,
      flexDirection: 'row',
    },
    inputBox: {
      padding: 0,
      borderRadius: 5,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#A6A29F',
    },
    inputBoxCountry: {
      paddingLeft: 20,
      paddingRight: 20,
      marginRight: 10,
      width: '24%',
    },
    inputBoxCountryText: {
      fontSize: 16,
    },
    inputBoxNumber: {
      width: '74%',
    },
    TextBottomContainer: {
      paddingVertical: 30,
      paddingHorizontal: 20,
    },
    TextBottomContainerText: {
      alignItems: 'center',
    },
    SmsButtonContainer: {
      paddingHorizontal: 20,
      flexDirection: 'column',
    },
    sendSmsButton: {
      backgroundColor: '$primaryBgColor',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 3,
    },
    sendSmsButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    whatsAppButtonConatiner: {
      paddingHorizontal: 20,
      marginTop: 20,
    },
    whatsAppButton: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#A6A29F',
      flexDirection: 'row',
    },
    whatsAppButtonText: {
      color: '#A6A29F',
      fontSize: 16,
      fontWeight: 'bold',
      paddingLeft: 10,
    },
    codeContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 30,
      paddingBottom: 15,
    },
    nextButton: {
      backgroundColor: '$primaryBgColor',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 35,
      borderRadius: 5,
    },
    verfiedTokenCenter: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
    },
    OnPxHr: {
      marginTop: 10,
      marginBottom: 10,
      borderTopWidth: 1,
      borderColor: '$primaryBgColor',
    },
    countrySelect: {
      borderBottomWidth: 1,
      paddingBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 10,
      borderColor: '#A6A29F',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    profileImageSection: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 30,
    },
    chosseOption: {
      paddingHorizontal: 20,
      flexDirection: 'column',
      paddingVertical: 30,
    },
    chosseOptionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    optionSection: {
      borderWidth: 1,
      borderColor: '#A6A29F',
      width: '31%',
      margin: '1%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 15,
      paddingBottom: 20,
      paddingHorizontal: 5,
      borderRadius: 5,
    },
    optionSectionSelected: {
      borderWidth: 1,
      borderColor: '$primaryBgColor',
      backgroundColor: '$primaryBgColor',
      width: '31%',
      margin: '1%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 15,
      paddingBottom: 20,
      paddingHorizontal: 5,
      borderRadius: 5,
    },
    optionColor: {
      fontWeight: 'bold',
    },
    optionColorSelected: {
      color: '#fff',
      fontWeight: 'bold',
    },
    questionColor: {
      color: '$primaryBgColor',
      fontWeight: 'bold',
    },
    padding20: {
      padding: 20,
    },
    textSection5: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    textSection5Small: {
      fontSize: 12,
      paddingTop: 15,
    },
    process5TextInput: {
      borderBottomWidth: 1,
      borderBottomColor: '#A6A29F',
      color: '$primaryBgColor',
    },
    process6Image: {
      width: 200,
      height: 50,
    },
    process6MainText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    tabOption: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginVertical: 20,
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
    castGrid: {
      flexDirection: 'row',
    },
    cast: {
      width: '50%',
      padding: 5,
    },
    lottie: {
      width: 200,
      height: 200,
    },
    shadowButton: {
      shadowColor: '#00000094',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 1,
      shadowRadius: 6.68,
      elevation: 12,
    },
    datePicker: {
      padding: 5,
      backgroundColor: '$primaryBgColor',
      paddingHorizontal: 50,
      borderRadius: 4,
    },
    datePickerText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    HourlyRateConatiner: {
      margin: 20,
    },
    hourlyRate: {
      borderWidth: 1,
      borderColor: '$primaryBgColor',
      width: '100%',
      paddingHorizontal: 20,
      borderRadius: 5,
      color: '$primaryBgColor',
    },
    labelText: {
      color: '#333',
      fontSize: 15,
      fontWeight: '500',
      marginBottom: 15,
    },
    item: {
      borderWidth: 1,
      borderColor: '#A6A39E',
      backgroundColor: '#FFF',
    },
    label: {
      color: '#A6A39E',
    },
    itemSelected: {
      backgroundColor: '$primaryBgColor',
      borderColor: '$primaryBgColor',
    },
    labelSelected: {
      color: '#FFF',
    },
    addCity: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 30,
      justifyContent: 'space-between',
    },
    addCityInput: {
      borderBottomWidth: 1,
      borderBottomColor: '#A6A29F',
      width: '80%',
    },
    addCityutton: {
      backgroundColor: '$primaryBgColor',
      justifyContent: 'center',
      alignItems: 'center',
      width: '18%',
      borderRadius: 4,
    },
    addCityuttonText: {
      color: '#fff',
    },
    ageVerification: {
      position: 'absolute',
      bottom: 15,
      width: Dimensions.get('window').width,
    },
    ageVerificationContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 15,
    },
    ageVerificationSkipButon: {
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderColor: '$primaryBgColor',
      borderWidth: 1,
      borderRadius: 6,
    },
    ageVerificationSkipVerify: {
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderColor: '$primaryBgColor',
      borderWidth: 1,
      borderRadius: 6,
      backgroundColor: '$primaryBgColor',
    },
    ageVerificationSkipVerifyText: {
      color: '#fff',
    },
    verifyIcon: {
      position: 'absolute',
      backgroundColor: '#fff',
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);
