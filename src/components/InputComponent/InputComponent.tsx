import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {styles} from './InputComponent.styles';
import {colors} from '../../utils/colors';

const InputComponent = (props: any) => {
  const {
    value,
    placeholder,
    secureTextEntry = false,
    maxLength,
    autoCapitalize = 'sentences',
    onInputBlur = () => {},
    onInputFocus = () => {},
    style,
    onChangeText,
    lightGray = colors.lightGray,
  } = props;
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        value={value}
        onChangeText={(value: string) => onChangeText(value)}
        style={[styles.input, style]}
        placeholder={placeholder}
        keyboardAppearance={'light'}
        contextMenuHidden
        placeholderTextColor={lightGray}
      />
    </View>
  );
};

export default InputComponent;
