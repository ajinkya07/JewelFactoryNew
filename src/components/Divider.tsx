import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {colors} from '../utils/colors';

const Divider = ({style}: {style?: StyleProp<ViewStyle>}) => {
  return (
    <View style={[styles.divider, {backgroundColor: colors.divider}, style]} />
  );
};

export default Divider;

export const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth * 3,
  },
});
