//import liraries
import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ComingSoon from './ComingSoon';
import RootStore from '../../stores/RootStore';

const TopLevelModal = observer(() => {
  return (
    <View>
      <ComingSoon
        isModalVisible={RootStore.appStore.isComingSoonVisible}
        setModalVisible={(toggleValue: boolean) => {
          RootStore.appStore.setFields('isComingSoonVisible', toggleValue);
        }}
      />
    </View>
  );
});

export default TopLevelModal;
