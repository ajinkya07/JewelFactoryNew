import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

const { height, width } = Dimensions.get('window')

export const styles =
  StyleSheet.create({
    defaultStyle: {
      alignItems: 'center',
    },
    primaryBtnContainer: {
      flexDirection: 'row',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: colors.brandColor,
      borderWidth: 0,
      height: 32,
      width: width - 40,
    },
    primaryBtnPressable: {
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: colors.brandColor,
      borderWidth: 0,
      paddingHorizontal: 12,
      paddingVertical: 8,
      height: 32,
      width: width - 40,
    },
    primaryBtnDisabled: {
      opacity: 0.5,
    },
    primaryBtnText: {
      fontSize: 16,
      textAlign: 'center',
      color: colors.white,
    },
    textButton: {
      fontSize: 14,
      color: colors.white,
    },
    secBtnText: {
      color: colors.black,
    },
    secBtnPressable: {
      backgroundColor: `${colors.brandColor}1A`,
    },
    secBtnContainer: {
      backgroundColor: colors.brandColor,
    },
  });

