import React from 'react';
import {View, TextInput, Image} from 'react-native';
import {styles} from './InputComponent.styles';
import {colors} from '../../utils/colors';
import {Pressable} from 'react-native';
import {isDefined} from '../../utils/helper';

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
    lightGray = colors.gray,
    editable = true,
    iconSource,
    onPressIconSource,
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
        autoCapitalize={'none'}
        maxLength={maxLength}
        editable={editable}
        secureTextEntry={secureTextEntry || false}
      />
      {isDefined(iconSource) && (
        <Pressable
          onPress={() => onPressIconSource()}
          style={{
            position: 'absolute',
            right: 15,
            top: 35,
          }}>
          <Image
            source={iconSource}
            style={{height: 20, width: 20, tintColor: colors.black}}
          />
        </Pressable>
      )}
    </View>
  );
};

export default InputComponent;
