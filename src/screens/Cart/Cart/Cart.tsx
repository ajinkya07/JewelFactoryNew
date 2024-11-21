//import liraries
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {styles} from './Cart.styles';
import {observer} from 'mobx-react';

const Cart = () => {
  return (
    <View style={styles.container}>
      <Text>Cart</Text>
    </View>
  );
};

export default observer(Cart);
