import EStyleSheet from "react-native-extended-stylesheet";
import { fontFamilySemiBold } from "../../utils/helper";

export const styles = EStyleSheet.create({
  touchContainer: {
    paddingHorizontal: '16rem',
    paddingVertical: '12rem',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightArrowSide: {
    height: '14rem',
    width: undefined,
    aspectRatio: 512 / 512,
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    marginTop: '2rem',
  },
  iconContainer: {
    borderRadius: '20rem',
    height: '40rem',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '8rem',
  },
  viewRightStyle: {
    marginRight: '10rem',
  },
  titleStyle: {
    fontSize: '16rem',
    fontFamily: fontFamilySemiBold,
  }
});