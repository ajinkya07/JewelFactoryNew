import React, {Component} from 'react';
import {View, Text} from 'react-native';
import RootStore from '../../stores/RootStore';
import {styles} from './Menu.styles';
import {observer} from 'mobx-react';

const Menu = () => {
  const onPressLogOut = () => {
    RootStore.appStore.setFields('isLoggedIn', false);
    RootStore.appStore.setFields('showPreLogin', true);
  };

  return (
    <View style={styles.container}>
      <Text onPress={onPressLogOut}>Log Out</Text>
    </View>
  );
};

export default observer(Menu);
