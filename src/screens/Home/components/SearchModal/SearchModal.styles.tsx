import EStyleSheet from 'react-native-extended-stylesheet';
import RootStore from '../../../../stores/RootStore';
import {colors} from '../../../../utils/colors';
import {
  fontFamilyBold,
  fontFamilyMedium,
  fontFamilySemiBold,
} from '../../../../utils/constants';

export const styles = EStyleSheet.create({
  modalStyle: {
    justifyContent: 'flex-end',
    marginBottom: '0rem',
    marginHorizontal: '0rem',
  },
  modalContent: {
    height: RootStore.appStore.screenHeight,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
  },
  stickySearchButtonContainer: {
    paddingHorizontal: '15rem',
    paddingBottom: '10rem',
  },
  flexContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: '15rem',
    paddingVertical: '20rem',
  },
  sectionTitle: {
    fontSize: '16rem',
    color: colors.black,
    fontFamily: fontFamilySemiBold,
  },
  parentSectionTitle: {
    fontSize: '17rem',
    color: colors.pressedBtnColor,
    marginBottom: '10rem',
    fontFamily: fontFamilySemiBold,
  },
  searchBox: {
    borderWidth: 2,
    borderColor: colors.golden,
    borderRadius: '12rem',
    padding: '12rem',
    marginBottom: '12rem',
    marginTop: '5rem',
  },
  placeholderText: {
    color: colors.black,
    fontFamily: fontFamilyBold,
    textAlign: 'center',
    fontSize: '16rem',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20rem',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.pressedBtnColor,
    padding: '10rem',
    fontFamily: fontFamilyMedium,
    width: '150rem',
    marginTop: '10rem',
    height: '40rem',
  },
  andText: {
    paddingHorizontal: '10rem',
    color: colors.black,
    fontFamily: fontFamilyMedium,
  },
  section: {
    marginBottom: '5rem',
  },
  devider: {
    width: '100%',
    height: 2,
    backgroundColor: colors.borderGray,
    alignSelf: 'center',
    marginBottom: '15rem',
  },
  dropdown: {
    marginBottom: '10rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoriesContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10rem',
  },
  dropdownText: {
    color: colors.gray,
    fontFamily: fontFamilyMedium,
  },
  dropdownTextGray: {
    color: colors.gray,
    fontFamily: fontFamilyMedium,
    marginTop: '10rem',
  },
  dropdownTextBlack: {
    color: colors.black,
    fontFamily: fontFamilyMedium,
  },
  searchButton: {
    backgroundColor: colors.pressedBtnColor,
    borderRadius: '25rem',
    padding: '15rem',
    alignItems: 'center',
    // marginTop: '30rem',
  },
  searchButtonText: {
    color: colors.white,
    fontSize: '16rem',
    fontFamily: fontFamilyBold,
  },
  iconStyle: {
    width: '20rem',
    height: '20rem',
  },
  meltingView: {
    top: '10rem',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '15rem',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray,
  },
  dividerText: {
    paddingHorizontal: 10,
    color: colors.gray,
    fontSize: '14rem',
  },
});
