import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../../../utils/colors';
import {fontFamilyBold, fontFamilyMedium} from '../../../../utils/constants';

export const styles = EStyleSheet.create({
  modalStyle: {
    justifyContent: 'flex-end',
    marginBottom: '0rem',
    marginHorizontal: '0rem',
  },
  modalContent: {
    height: '350rem',
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
    color: colors.black,
    fontFamily: fontFamilyBold,
    fontSize: '20rem',
    marginLeft: '14rem',
    marginTop: '20rem',
  },
  closeBtn: {
    height: '16rem',
    width: null,
    aspectRatio: 1,
    tintColor: colors.white,
  },
  searchContainer: {
    marginVertical: '20rem',
  },
  searchContainerFocused: {
    marginTop: '10rem',
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
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    fontFamily: fontFamilyMedium,
    paddingVertical: '8rem',
    fontSize: '16rem',
    color: colors.black,
    marginHorizontal: '10rem',
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
    marginBottom: '20rem',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10rem',
  },
  checkbox: {
    width: '20rem',
    height: '20rem',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
    marginRight: '20rem',
  },
  checkboxSelected: {
    backgroundColor: colors.pressedBtnColor,
    borderColor: colors.pressedBtnColor,
  },
  divider: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginHorizontal: '10rem',
  },
});
