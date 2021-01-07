import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform} from 'react-native';

const {width: viewportWidth, height} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

export const slideWidth = wp(39.4);
export const sliderItemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const sliderItemWidth = slideWidth + sliderItemHorizontalMargin * 2;

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
    inputSection: {
      flex: 1,
      marginVertical: 10,
    },
    searchConatiner: {
      paddingVertical: 10,
    },
    InputContainer: {
      flexDirection: 'row',
      paddingBottom: 10,
      backgroundColor: '#F2F1ED',
      borderColor: '#E2E2E2',
      borderWidth: 1,
      borderRadius: 5,
      height: 50,
      paddingVertical: 15,
      paddingHorizontal: 7,
    },
    InputTextConatiner: {
      paddingLeft: 15,
    },
    marginLeft4: {
      marginLeft: 4,
    },
    marginRight4: {
      marginRight: 4,
    },
    headerText: {
      paddingBottom: 5,
    },
    addCastContainer: {
      paddingHorizontal: 5,
      paddingVertical: 20,
    },
    addCastContainerMainText: {
      fontSize: 18,
      paddingBottom: 20,
    },
    addCastContainerSubText: {
      fontSize: 16,
      paddingBottom: 30,
    },
    content: {
      backgroundColor: 'white',
      padding: 22,
      paddingHorizontal: 22,
      paddingVertical: 30,
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    centerImage: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
    content2: {
      backgroundColor: 'white',
      padding: 22,
      paddingHorizontal: 22,
      paddingVertical: 30,
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      height: height - 100,
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
    lottie: {
      width: 200,
      height: 200,
    },
    mainRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 17,
    },
    SubRow: {
      flexDirection: 'row',
      paddingBottom: 20,
      flexWrap: 'wrap',
    },
    SubRowText: {
      paddingRight: 10,
    },
    paddingLeft10: {
      paddingLeft: 10,
    },
    CallTimeButton: {
      flexDirection: 'row',
      marginRight: 10,
      borderWidth: 1,
      borderColor: '#A6A39E',
      borderRadius: 4,
      paddingHorizontal: 15,
      paddingVertical: 5,
      marginBottom: 10,
    },
    CallTimeButtonText: {
      justifyContent: 'center',
      alignItems: 'center',
      color: '#A6A39E',
    },
    CallTimeButtonSelected: {
      flexDirection: 'row',
      marginRight: 10,
      borderWidth: 1,
      backgroundColor: '$primaryBgColor',
      borderColor: '$primaryBgColor',
      borderRadius: 4,
      paddingHorizontal: 15,
      marginBottom: 10,
      paddingVertical: 5,
    },
    CallTimeButtonTextSelected: {
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
    },
    CastPeopleSelect: {
      color: '#484848',
      fontSize: 18,
    },
    CastPeopleSelectNumber: {
      fontSize: 30,
      color: '$primaryBgColor',
      marginTop: -12,
    },
    rowTitle: {
      fontSize: 16,
      color: '#646464',
    },
    packageButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      borderWidth: 1,
      marginBottom: 10,
      paddingVertical: 15,
      borderColor: '#A6A39E',
      borderRadius: 4,
    },
    packageButtonText: {
      color: '#A6A39E',
    },
    packageButtonS: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      borderWidth: 1,
      marginBottom: 10,
      paddingVertical: 15,
      backgroundColor: '$primaryBgColor',
      borderColor: '$primaryBgColor',
      borderRadius: 4,
    },
    packageButtonTextS: {
      color: '#fff',
    },
    itemSelectedOthers: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#f1f2f3',
      height: 40,
      borderRadius: 6,
    },
    verfiedTokenCenter: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
    },
    questionColor: {
      color: '$primaryBgColor',
      fontWeight: 'bold',
    },
    addCity: {
      flexDirection: 'row',
      // paddingHorizontal: 20,
      paddingVertical: 30,
      justifyContent: 'space-between',
    },
    addCityInput: {
      borderBottomWidth: 1,
      borderBottomColor: '#A6A29F',
      width: '100%',
      color: '$primaryBgColor',
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
    NonSelected: {
      margin: 5,
      borderWidth: 1,
      // width: '100%',
      borderColor: '$primaryBgColor',
      padding: 5,
      alignItems: 'center',
      borderRadius: 10,
      width: viewportWidth - 55,
    },
    Selected: {
      margin: 5,
      borderWidth: 1,
      width: viewportWidth - 55,
      borderColor: '$primaryBgColor',
      padding: 5,
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '$primaryBgColor',
    },
    NonSelectedCity: {
      margin: 5,
      borderWidth: 1,
      // width: '100%',
      borderColor: '$primaryBgColor',
      padding: 5,
      alignItems: 'center',
      borderRadius: 10,
      width: 200,
    },
    SelectedCity: {
      margin: 5,
      borderWidth: 1,
      width: 200,
      borderColor: '$primaryBgColor',
      padding: 5,
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '$primaryBgColor',
    },
    callModalView: {},
    tileView: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '$primaryBgColor',
      paddingBottom: 25,
    },
  }),
);
