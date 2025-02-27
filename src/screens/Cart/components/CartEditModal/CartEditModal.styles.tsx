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
    height: '550rem',
    backgroundColor: colors.white,
    borderRadius: '10rem',
  },
  container: {
    flex: 1,
  },
  upperDivider: {
    alignSelf: 'center',
    height: '3rem',
    backgroundColor: colors.lightGray,
    marginTop: '8rem',
    borderRadius: '4rem',
    width: '20%',
  },
  stickySearchButtonContainer: {
    paddingHorizontal: '15rem',
    paddingBottom: '10rem',
  },
  content: {
    paddingHorizontal: '15rem',
    paddingVertical: '20rem',
  },
  sectionTitle: {
    fontSize: '20rem',
    color: colors.black,
    fontFamily: fontFamilyBold,
    marginTop: '15rem',
    marginLeft: '14rem',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    left: '5rem',
  },
  dropdown: {
    paddingVertical: '20rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '20rem',
  },
  dropdownText: {
    color: colors.gray,
    fontFamily: fontFamilyMedium,
  },
  topMargin: {
    marginTop: '20rem',
  },
});
