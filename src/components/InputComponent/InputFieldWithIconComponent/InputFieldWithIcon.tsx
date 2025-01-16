import {View, Dimensions} from 'react-native';
import React from 'react';
import InputComponent from '../InputComponent';
import {Image} from 'react-native';
import {colors} from '../../../utils/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {fontFamilyMedium} from '../../../utils/constants';

const InputFieldWithIcon = ({
  iconSource,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
}: any) => (
  <View style={styles.inputContainer}>
    <Image source={iconSource} style={styles.iconStyle} />
    <InputComponent
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={colors.gray}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
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
});
