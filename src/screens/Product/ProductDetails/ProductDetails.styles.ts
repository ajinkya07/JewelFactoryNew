import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../../utils/colors';
import {
  fontFamilyMedium,
  fontFamilyRegular,
  fontFamilySemiBold,
} from '../../../utils/constants';

const {width} = Dimensions.get('window');

export const styles = EStyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.white,
  },
  carouselView: {
    marginHorizontal: '5rem',
    alignItems: 'center',
    overflow: 'hidden',
  },
  categoryName: {
    fontSize: '18rem',
    fontFamily: fontFamilySemiBold,
  },
  title: {
    fontSize: '16rem',
    fontFamily: fontFamilyMedium,
    textAlign: 'center',
    marginBottom: '20rem',
    marginTop: '5rem',
  },
  image: {
    height: '280rem',
    resizeMode: 'contain',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '8rem',
  },
  dot: {
    width: '6rem',
    height: '6rem',
    borderRadius: '3rem',
    marginHorizontal: '4rem',
  },
  activeDot: {
    backgroundColor: colors.black,
  },
  inactiveDot: {
    backgroundColor: colors.lightGray,
  },
  remarksInput: {
    padding: '5rem',
    fontSize: '14rem',
    flex: 1,
    fontFamily: fontFamilyMedium,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '5rem',
  },
  descriptionSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '5rem',
  },
  detailLabel: {
    fontSize: '15rem',
    fontFamily: fontFamilyRegular,
  },
  detailValue: {
    fontSize: '15rem',
    fontFamily: fontFamilyRegular,
  },
  descriptionContainer: {
    width: '100%',
    marginTop: '16rem',
  },
  descriptionTitle: {
    fontSize: '16rem',
    fontFamily: fontFamilySemiBold,
    color: colors.black,
    marginBottom: '5rem',
  },
  gradient: {
    height: '45rem',
    borderTopRightRadius: '4rem',
    borderBottomRightRadius: '4rem',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100rem',
  },
  text: {
    fontSize: '14rem',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '16rem',
  },
  quantityLabel: {
    fontSize: '12rem',
    fontFamily: fontFamilyRegular,
  },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    borderRadius: '14rem',
    width: '28rem',
    height: '28rem',
    marginRight: '10rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityValue: {
    fontSize: '18rem',
    color: colors.black,
    marginRight: '10rem',
  },
  quantityNo: {
    fontSize: '20rem',
    fontFamily: fontFamilyMedium,
  },
  remarkContainerView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: '10rem',
    height: '45rem',
    borderRadius: '4rem',
    borderWidth: '0.3rem',
    borderColor: colors.smokeGray,
  },
  wishListIcon: {
    width: '24rem',
    height: '24rem',
    marginRight: '10rem',
    tintColor: colors.iconsTintColor,
  },
  wishListIconView: {
    alignItems: 'flex-end',
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  quantityView: {
    width: '28rem',
    height: '28rem',
    borderRadius: '14rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentView: {
    alignItems: 'flex-start',
    marginHorizontal: '20rem',
  },
  btnContainer: {
    marginTop: '10rem',
  },
  customInput: {
    marginTop: '10rem',
  },
  addToCartBtnContainer: {
    alignItems: 'center',
    marginHorizontal: '10rem',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '10rem',
    paddingVertical: '10rem',
  },
  btn: {
    width: width / 2 - 30,
  },
});
