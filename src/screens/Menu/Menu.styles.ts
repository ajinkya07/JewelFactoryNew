import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../utils/colors";
import { fontFamilyBold, fontFamilySemiBold } from "../../utils/constants";

export const styles = EStyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    contentContainer: {
        paddingHorizontal: '10rem',
        backgroundColor: colors.white,
        paddingBottom: '90rem'
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
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
        marginTop: '70rem',
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