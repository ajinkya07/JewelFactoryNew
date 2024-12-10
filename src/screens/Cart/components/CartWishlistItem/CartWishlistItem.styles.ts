import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../../../utils/colors";
import { fontFamilyBold, fontFamilyMedium, fontFamilySemiBold } from "../../../../utils/constants";

export const styles = EStyleSheet.create({
    container: {
        marginBottom: '40rem'
    },
    flexRow: {
        flexDirection: 'row',
    },
    imgStyle: {
        width: '80rem',
        height: '80rem',
        borderRadius: '5rem',
    },
    rightView: {
        marginLeft: '20rem'
    },
    rightValueText: {
        textAlign: 'right',
        marginLeft: '20rem'
    },
    title: {
        color: colors.black,
        fontSize: '16rem',
        fontFamily: fontFamilySemiBold,
        textTransform: 'capitalize',
        marginBottom: '10rem',
    },
    flexRowJustify: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    keyValueText: {
        color: colors.black,
        fontSize: '14rem',
        fontFamily: fontFamilyMedium,
        textTransform: 'capitalize',
        marginBottom: '5rem',
    },
    moreDetailText: {
        color: colors.black,
        fontSize: '16rem',
        fontFamily: fontFamilyMedium
    },
    marginTop: {
        marginTop: '20rem'
    },
    marginBottom: {
        marginBottom: '20rem'
    },
    downArrow: {
        height: '14rem',
        width: '14rem',
        tintColor: colors.gray,
        transform: [{ rotate: '90deg' }]
    },
    bottomImgView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabCartBottomImg: {
        width: '16rem',
        height: '16rem',
        marginRight: '5rem',
        tintColor: colors.black,
    },
    updateItemText: {
        color: colors.black,
        fontSize: '14rem',
        fontFamily: fontFamilySemiBold
    },
})