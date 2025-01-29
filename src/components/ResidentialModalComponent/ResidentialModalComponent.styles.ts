// ResidentialModalComponent.styles.ts
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../utils/colors';
import {fontFamilyBold} from '../../utils/constants';

export const styles = EStyleSheet.create({
  modalStyle: {
    justifyContent: 'flex-end',
    marginBottom: '0rem',
    marginHorizontal: '0rem',
  },
  modalContent: {
    height: '500rem',
    backgroundColor: colors.white,
    borderRadius: '14rem',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  divider: {
    alignSelf: 'center',
    height: '3rem',
    width: '80rem',
    backgroundColor: colors.lightGray,
    marginTop: '8rem',
    borderRadius: '4rem',
  },
  titleText: {
    color: colors.black,
    fontFamily: fontFamilyBold,
    fontSize: '20rem',
    marginLeft: '14rem',
    marginTop: '20rem',
  },
  dropdownContainer: {
    paddingHorizontal: '15rem',
    paddingTop: '20rem',
    paddingBottom: '100rem',
    zIndex: 1,
  },
  dropdown: {
    borderColor: colors.iconsTintColor,
    borderRadius: '8rem',
    borderWidth: 1,
    height: '45rem',
    marginTop: '20rem',
  },
  dropdownListContainer: {
    borderWidth: 1,
    borderColor: colors.iconsTintColor,
    borderRadius: '8rem',
    marginTop: '20rem',
  },
});
