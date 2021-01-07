import React from 'react';

import {YellowBox} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import GlobalStyles from './src/views/Common/GlobalStyles';
import 'react-native-gesture-handler';
import {setCustomText} from 'react-native-global-props';

//redux
import {Provider, connect} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/Store/Store';

import Navigator from './src/route';

import FlashMessage from 'react-native-flash-message';

const customTextProps = {
  style: {
    // fontFamily: 'SFProText-Regular',
  },
};

// Ignore the warnings from the 3rd party libraries
YellowBox.ignoreWarnings(['Remote debugger']);
YellowBox.ignoreWarnings(['Setting a timer']);
YellowBox.ignoreWarnings(['Cannot update during']);
YellowBox.ignoreWarnings(['VirtualizedLists should never be']);

setCustomText(customTextProps);

// Build the stylesheets
EStyleSheet.build(GlobalStyles);

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Navigator />
    </PersistGate>
    <FlashMessage position="top" duration={3000} />
  </Provider>
);

export default App;
