import EStyleSheet from 'react-native-extended-stylesheet';

import {fontFamilyBold, fontFamilyMedium} from '../../../utils/constants';
import {colors} from '../../../utils/colors';

export const styles = EStyleSheet.create({
  modalStyle: {
    justifyContent: 'flex-end',
    marginBottom: '0rem',
    marginHorizontal: '0rem',
  },
  modalContent: {
    height: '500rem',
    backgroundColor: colors.white,
    borderRadius: '10rem',
  },
  upperDivider: {
    alignSelf: 'center',
    height: '3rem',
    backgroundColor: colors.lightGray,
    marginTop: '8rem',
    borderRadius: '4rem',
    width: '20%',
  },
  pressableCloseBtn: {
    position: 'absolute',
    right: '10rem',
  },
  sectionTitle: {
    fontSize: '20rem',
    color: colors.black,
    fontFamily: fontFamilyBold,
    marginTop: '15rem',
    marginLeft: '14rem',
  },
  closeBtn: {
    height: '16rem',
    width: null,
    aspectRatio: 1,
    tintColor: colors.white,
  },
  searchLabel: {
    fontSize: '14rem',
    color: colors.pressedBtnColor,
    marginBottom: '5rem',
    fontFamily: fontFamilyMedium,
    marginHorizontal: '10rem',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginVertical: '20rem',
  },
  input: {
    fontFamily: fontFamilyMedium,
    marginTop: '10rem',
    height: '150rem',
  },
  searchIconContainer: {
    marginLeft: '12rem',
    marginHorizontal: '10rem',
  },
  iconStyle: {
    tintColor: colors.pressedBtnColor,
    width: '20rem',
    height: '20rem',
  },
  section: {
    marginTop: '10rem',
    alignItems: 'center',
  },
  searchBox: {
    borderRadius: '25rem',
    padding: '12rem',
    backgroundColor: colors.pressedBtnColor,
    width: '50%',
  },
  placeholderText: {
    color: colors.white,
    fontFamily: fontFamilyBold,
    textAlign: 'center',
    fontSize: '16rem',
  },
  paraView: {
    maxWidth: '90%',
    marginLeft: '14rem',
  },
  paraText: {
    fontSize: '16rem',
    color: colors.black,
    fontFamily: fontFamilyMedium,
    marginTop: '15rem',
  },
});
