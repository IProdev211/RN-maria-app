import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 15,
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
      marginBottom: 20,
      marginTop: 10,
    },
    CallTimeButton: {
      flexDirection: 'row',
      marginRight: 10,
      borderWidth: 1,
      borderColor: '#A6A39E',
      borderRadius: 4,
      paddingHorizontal: 15,
      paddingVertical: 5,
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
  }),
);
