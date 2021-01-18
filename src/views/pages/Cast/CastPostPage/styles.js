import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 15,
      ...ifIphoneX(
        {
          paddingBottom: 100,
          height: Dimensions.get('window').height - 100,
        },
        {
          paddingBottom: 10,
          height: Dimensions.get('window').height - 35,
        },
      ),
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
    mainRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 15,
    },
    SubRow: {
      flexDirection: 'row',
    },
    SubRowText: {
      paddingRight: 10,
    },
    paddingLeft10: {
      paddingLeft: 10,
    },
    dividerStle: {
      marginBottom: 10,
      marginTop: 20,
    },
    CallTimeButton: {
      flexDirection: 'row',
      marginRight: 10,
      borderWidth: 1,
      borderColor: '#A6A39E',
      borderRadius: 4,
      paddingHorizontal: 15,
      paddingVertical: 5,
      width: 150,
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
      paddingVertical: 5,
      width: 150,
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
    mainTitleText: {
      fontSize: 18,
    },
    paddingTop20: {
      paddingTop: 20,
    },
    stepContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 88,
    },
    organgeBgText: {
      borderWidth: 1,
      backgroundColor: '#f1f2f3',
      borderColor: '#ababab',
      padding: 10,
    },
    dotTextColor: {
      color: '$primaryBgColor',
      fontSize: 20,
      // marginTop: -5,
      paddingRight: 10,
    },
    paddingTop10: {
      paddingTop: 10,
    },
    paddingTop5: {
      paddingTop: 5,
    },
    paddingTop40: {
      paddingTop: 40,
    },
    process3Title: {
      fontSize: 17,
    },
    ImageBanner: {
      marginHorizontal: -15,
      marginVertical: 20,
    },
    ImageBannerImage: {
      width: '100%',
      height: 80,
    },
    SummaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    leftSummaryRow: {
      flexDirection: 'column',
    },
    RightSummaryRow: {
      alignItems: 'center',
    },
    leftSummaryRowElement: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    summaryTitle: {
      paddingLeft: 20,
      fontSize: 18,
      color: '#484848',
    },
    scrollView: {
      paddingBottom: 100,
    },
    tagConatiner: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    tagValue: {
      padding: 5,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 6,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollingMargin: {
      marginTop: 180,
    },
    spinnerTextStyle: {
      color: '#fff',
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
      justifyContent: 'center',
      flexDirection: 'column',
    },
    thanksConatiner: {
      paddingVertical: 20,
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
    },
    adminMessage: {
      borderWidth: 1,
      marginTop: 15,
      padding: 15,
      borderRadius: 5,
      paddingBottom: 60,
      borderColor: 'gray',
      backgroundColor: '#fff',
      color: 'gray',
    },
    messageAdminButton: {
      marginTop: 30,
    },
  }),
);
