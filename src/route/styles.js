import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.flatten(
  EStyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    selectedTab: {
      color: '$secondaryBgColor',
      fontSize: 12,
      fontWeight: 'bold',
    },
    noSelectedTab: {
      color: '$primaryBgColor',
      fontSize: 12,
      fontWeight: 'bold',
    },
    alginmentOfIconText: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }),
);
