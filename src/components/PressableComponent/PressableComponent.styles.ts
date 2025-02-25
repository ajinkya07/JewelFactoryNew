import {Dimensions} from 'react-native';
import {colors} from '../../utils/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {fontFamilyBold} from '../../utils/constants';

const {width} = Dimensions.get('window');

export const styles = EStyleSheet.create({
  defaultStyle: {
    alignItems: 'center',
  },
  primaryBtnContainer: {
    flexDirection: 'row',
    borderRadius: '12rem',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.brandColor,
    height: '52rem',
    width: width - 40,
  },
  primaryBtnPressable: {
    borderRadius: '12rem',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.pressedBtnColor,
    paddingHorizontal: '12rem',
    paddingVertical: '8rem',
    height: '52rem',
    width: width - 40,
  },
  primaryBtnDisabled: {
    opacity: 0.5,
  },
  primaryBtnText: {
    fontSize: '16rem',
    fontFamily: fontFamilyBold,
    textAlign: 'center',
    color: colors.white,
  },
  textButton: {
    fontSize: '14rem',
    color: colors.white,
    fontFamily: fontFamilyBold,
  },
  secBtnText: {
    color: colors.black,
    fontFamily: fontFamilyBold,
  },
  secBtnPressable: {
    backgroundColor: `${colors.brandColor}1A`,
  },
  secBtnContainer: {
    backgroundColor: colors.brandColor,
  },
  pairButtonContainer: {
    flex: 1,
    marginHorizontal: '5rem',
  },
  rightPairButtonContainer: {
    marginLeft: '5rem',
  },
  pairButtonPressable: {
    width: '100%',
  },
});
