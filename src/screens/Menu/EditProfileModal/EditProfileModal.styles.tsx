import EStyleSheet from 'react-native-extended-stylesheet';
import RootStore from '../../../stores/RootStore';
import {colors} from '../../../utils/colors';
import {fontFamilyMedium, fontFamilySemiBold} from '../../../utils/constants';

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
  content: {
    paddingHorizontal: '15rem',
    paddingVertical: '20rem',
  },
  sectionTitle: {
    fontSize: '16rem',
    color: colors.black,
    fontFamily: fontFamilySemiBold,
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
});
