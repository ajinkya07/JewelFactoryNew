import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {styles} from './Customise.styles';
import {observer} from 'mobx-react';

const Customise = () => {
  return (
    <View style={styles.container}>
      <Text>Customise</Text>
    </View>
  );
};

export default observer(Customise);
