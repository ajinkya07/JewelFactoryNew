import EStyleSheet from 'react-native-extended-stylesheet';
import { colors } from '../../../../utils/colors';
import { fontFamilyBold } from '../../../../utils/constants';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window')

export const styles = EStyleSheet.create({
  topBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    height: '3rem',
    borderRadius: '10rem',
    backgroundColor: colors.black,
  },
  titleText: {
    paddingHorizontal: '8rem',
    color: colors.black,
    fontSize: '16rem',
    fontFamily: fontFamilyBold,
    textTransform: 'capitalize',
  },
  tabIcon: {
    height: '16rem',
    width: '16rem',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '8rem',
  },
  headerContainer: {
    width: width,
    height: '40rem',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0EFEF',
    backgroundColor: colors.white,
    marginBottom: '5rem'
  },
  contentContainer: {
    columnGap: width / 2,
    // columnGap: '20rem',
    // paddingHorizontal: '20rem',
  },
})

