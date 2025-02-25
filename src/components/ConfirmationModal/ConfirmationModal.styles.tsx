import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../utils/colors';
import {fontFamilyBold, fontFamilyMedium} from '../../utils/constants';

export const styles = EStyleSheet.create({
  modalStyle: {
    justifyContent: 'flex-end',
    marginBottom: '0rem',
    marginHorizontal: '0rem',
  },
  modalContent: {
    height: '300rem',
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
  sectionTitle: {
    fontSize: '20rem',
    color: colors.black,
    fontFamily: fontFamilyBold,
    marginTop: '15rem',
    marginLeft: '14rem',
  },
  subtitle: {
    fontSize: '16rem',
    color: colors.black,
    fontFamily: fontFamilyMedium,
    marginTop: '15rem',
    marginHorizontal: '14rem',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10rem',
  },
  button: {
    marginTop: '10rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleButton: {
    width: '50%',
  },
});
