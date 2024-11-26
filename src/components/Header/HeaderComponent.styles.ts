import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../utils/colors";
import { fontFamilyBold, fontFamilyMedium } from "../../utils/helper";

export const styles = EStyleSheet.create({
    headerStyle: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        minHeight: '48rem',
        backgroundColor: colors.white,
    },
    headerText: {
        fontSize: '16rem',
        fontFamily: fontFamilyBold,
        letterSpacing: 0.5,
    },
    rightText: {
        marginRight: '10rem',
    },
    headerViewContentStyle: {},
    headerInnerContentStyle: {
        flex: 1,
        marginLeft: '8rem',
    },
    wishlistCount: {
        backgroundColor: colors.brandColor,
        position: 'absolute',
        top: -6,
        width: '16rem',
        height: '16rem',
        borderRadius: '8rem',
        left: '8rem',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wishlistCountText: {
        fontSize: '10rem',
        fontFamily: fontFamilyMedium,
        colors: colors.white,
    },
    imageIconStyle: {
        width: '20rem',
        height: '20rem',
    },
    flexRow: {
        flexDirection: 'row',
    },
})