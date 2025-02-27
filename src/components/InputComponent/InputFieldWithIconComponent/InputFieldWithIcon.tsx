import React from 'react';
import {View, Dimensions, TouchableOpacity, Text, Image} from 'react-native';
import {colors} from '../../../utils/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {fontFamilyMedium} from '../../../utils/constants';
import InputComponent from '../InputComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const InputFieldWithIcon = ({
  iconSource,
  vectorIcon,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  readOnly = false,
  onPress,
  editable,
}: {
  iconSource?: any;
  vectorIcon?: {
    library?: string;
    name: string;
    size?: number;
    color?: string;
  };
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  keyboardType?: string;
  readOnly?: boolean;
  onPress?: () => void;
}) => {
  const renderVectorIcon = () => {
    if (!vectorIcon) return null;

    const {
      library,
      name,
      size = 24,
      color = colors.iconsTintColor,
    } = vectorIcon;

    switch (library) {
      case 'MaterialCommunityIcons':
        return (
          <MaterialCommunityIcons
            name={name}
            size={size}
            color={color}
            style={styles.iconStyle}
          />
        );
      case 'FontAwesome5':
        return (
          <FontAwesome5
            name={name}
            size={size}
            color={color}
            style={styles.iconStyle}
          />
        );
      case 'Ionicons':
      default:
        return (
          <Ionicons
            name={name}
            size={size}
            color={color}
            style={styles.iconStyle}
          />
        );
    }
  };

  return (
    <View style={styles.inputContainer}>
      {iconSource ? (
        <Image source={iconSource} style={styles.iconStyle} />
      ) : vectorIcon ? (
        renderVectorIcon()
      ) : null}

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
          editable={editable}
        />
      )}
    </View>
  );
};

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
