import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../../../utils/colors';
import {fontFamilySemiBold} from '../../../../utils/constants';

export const styles = EStyleSheet.create({
  selectToggle: {
    padding: '10rem',
  },
  selectToggleText: {
    fontSize: '16rem',
    color: colors.black,
    fontFamily: fontFamilySemiBold,
  },
  container: {
    marginHorizontal: '-11rem',
    marginTop: '10rem',
    marginBottom: '20rem',
  },
});
