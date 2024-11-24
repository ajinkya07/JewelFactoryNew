import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../utils/colors";
import { fontFamilyBold, fontFamilyMedium, fontFamilySemiBold } from "../../utils/helper";

export const styles = EStyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        flex: 1,
        paddingHorizontal: '10rem',
        backgroundColor: colors.white,
    },
    scrollContainer: {
        backgroundColor: colors.bgColor,
    },
    menuListContainer: {
        flex: 1,
        marginHorizontal: '4rem',
        marginTop: '20rem',
    },
    viewRightStyle: {
        borderWidth: '1rem',
        borderRadius: '20rem',
        paddingHorizontal: '13rem',
        paddingVertical: '4rem',
        marginRight: '10rem',
    },
    menuItemsView: {
        marginTop: '20rem',
    },
    groupStyle: {
        marginTop: '12rem',
        borderRadius: '12rem',
        overflow: 'hidden',
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: '20rem',
        fontFamily: fontFamilyBold
    },
    editText: {
        fontSize: '16rem',
        fontFamily: fontFamilyBold,
        color: colors.hyperlinkColor,
    },
    footer: {
        marginTop: '50rem',
    },
    editPressed: {
        alignSelf: 'flex-start',
        borderRadius: '8rem',
        padding: '6rem'
    },
    version: {
        fontSize: '12rem',
        fontFamily: fontFamilySemiBold,
        color: colors.textNote
    },
    madeWithLove: {
        fontSize: '16rem',
        fontFamily: fontFamilyBold,
        color: colors.black,
        marginTop: '5rem',
    },
    muskseed: {
        fontSize: '16rem',
        fontFamily: fontFamilyBold,
        color: colors.hyperlinkColor,
        textDecorationLine: 'underline'
    },

})