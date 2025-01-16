import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../../../utils/colors';
import {fontFamilyBold, fontFamilySemiBold} from '../../../../utils/constants';

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
    color: colors.black,
    fontFamily: fontFamilyBold,
    fontSize: '22rem',
    marginLeft: '14rem',
    marginTop: '20rem',
  },
  listItem: {
    paddingVertical: '10rem',
    paddingHorizontal: '14rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmarkIcon: {
    width: '20rem',
    height: '20rem',
    marginRight: '20rem',
  },
  listItemText: {
    fontSize: '16rem',
    fontFamily: fontFamilySemiBold,
    color: colors.black,
  },
  section: {
    marginBottom: '30rem',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginHorizontal: '10rem',
  },
  listContaier: {
    marginTop: '20rem',
  },
});
