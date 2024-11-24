import { Linking } from "react-native";

export const isDefined = <T>(value: T): value is NonNullable<T> => {
  return value !== null && value !== '' && value !== undefined;
};

export const fontFamilyLight = 'Manrope-Light';
export const fontFamilyRegular = 'Manrope-Regular';
export const fontFamilyMedium = 'Manrope-Medium'
export const fontFamilySemiBold = 'Manrope-SemiBold';
export const fontFamilyBold = 'Manrope-Bold'

export const openLink = (url: string) => {
  isDefined(url) ? Linking.openURL(url) : ''
}