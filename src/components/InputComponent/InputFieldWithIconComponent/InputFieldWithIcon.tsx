import React from 'react';
import {View, Dimensions, TouchableOpacity, Text, Image} from 'react-native';
import {colors} from '../../../utils/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {fontFamilyMedium} from '../../../utils/constants';
import InputComponent from '../InputComponent';

const InputFieldWithIcon = ({
  iconSource,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  readOnly = false,
  onPress,
}: {
  iconSource: any;
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  keyboardType?: string;
  readOnly?: boolean;
  onPress?: () => void;
}) => (
  <View style={styles.inputContainer}>
    <Image source={iconSource} style={styles.iconStyle} />
    {readOnly ? (
      <TouchableOpacity style={styles.input} onPress={onPress}>
        <Text style={[styles.textStyle, !value && {color: colors.gray}]}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>
    ) : (
      <InputComponent
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    )}
  </View>
);

export default InputFieldWithIcon;

const {width} = Dimensions.get('window');

const styles = EStyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.pressedBtnColor,
    fontFamily: fontFamilyMedium,
    marginTop: '15rem',
    width: width - 80,
    paddingVertical: '10rem',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    left: '5rem',
  },
  iconStyle: {
    right: '10rem',
    tintColor: colors.iconsTintColor,
    width: '24rem',
    height: '24rem',
    marginTop: '15rem',
  },
  textStyle: {
    fontFamily: fontFamilyMedium,
    fontSize: '16rem',
    color: colors.black,
  },
});
