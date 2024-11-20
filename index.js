/**
 * @format
 */
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, Text, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {name as appName} from './app.json';
import {Observer} from 'mobx-react';
import RootStore from './src/stores/RootStore';
import AppWrapperComponent from './src/AppWrapperComponent';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const {width} = Dimensions.get('window');

EStyleSheet.build({
  $rem: RootStore.appStore.isiOS
    ? width / 380
    : RootStore.appStore.isTablet
    ? width / 660
    : width / 380,
});

const MainApp = () => {
  return (
    <Observer>
      {() => (
        <>
          <AppWrapperComponent />
        </>
      )}
    </Observer>
  );
};

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(MainApp));
