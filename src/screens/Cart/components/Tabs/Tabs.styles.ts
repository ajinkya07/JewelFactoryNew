import EStyleSheet from 'react-native-extended-stylesheet';
import { colors } from '../../../../utils/colors';

export const styles = EStyleSheet.create({
  titleText: {
    paddingHorizontal: '8rem',
    paddingTop: '8rem',
    color: colors.black,
  },
  topBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    height: '4rem',
    borderRadius: '10rem',
    backgroundColor: colors.black,
  },
  headerContainer: {
    height: '50rem',
    borderBottomWidth: '1rem',
    borderBottomColor: colors.gray,
    backgroundColor: colors.white,
  },
  contentContainer: { columnGap: '4rem', paddingHorizontal: '20rem' },
})

