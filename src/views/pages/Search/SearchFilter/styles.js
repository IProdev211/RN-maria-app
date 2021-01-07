import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform} from 'react-native';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    rowContainer: {
      flexDirection: 'row',
    },
    oNpressEvent: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#DEDEDE',
    },
    onPressEventRight: {
      flexDirection: 'row',
    },
    onPressEventRightText: {
      paddingRight: 15,
      color: 'gray',
      fontSize: 16,
    },
    subTextInfo: {
      paddingTop: 30,
      paddingLeft: 15,
      paddingBottom: 7,
    },
    marginBottom20: {
      marginBottom: 20,
    },
    basicTextColor: {
      color: '#A7A39A',
    },
    paddingLeft15: {
      paddingLeft: 15,
    },
    rangePickerContainer: {
      backgroundColor: '#fff',
      paddingHorizontal: 15,
      // alignItems: 'center',
      paddingVertical: 15,
    },
    RangContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
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
    ModalView: {
      justifyContent: 'center',
      marginVertical: 50,
      flex: 1,
    },
    modalDefaultHeight: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    buttonStyle: {
      flex: 0.91,
      marginTop: 45,
    },
    modalDefaultHeightScroll: {
      maxHeight: '90%',
      paddingBottom: 150,
    },
    mainRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 17,
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
    tagText: {
      paddingBottom: 10,
    },
    modalText: {
      color: '$primaryBgColor',
      fontSize: 18,
      paddingBottom: 20,
      fontWeight: 'bold',
    },
    closeAndTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  }),
);
