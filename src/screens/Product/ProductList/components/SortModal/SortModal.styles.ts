import { Platform, StyleSheet } from "react-native";
import { colors } from "../../../../../utils/colors";
import { fontFamilyBold, fontFamilyMedium, fontFamilyRegular, fontFamilySemiBold } from "../../../../../utils/constants";
import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
    modalView: {
        justifyContent: "flex-end",
        marginBottom: '0rem',
        marginHorizontal: '0rem'
    },
    modalViewContainer: {
        borderTopLeftRadius: '14rem',
        borderTopRightRadius: '14rem',
        backgroundColor: colors.white,
        paddingBottom: '20rem',
    },
    titleText: {
        color: colors.black,
        fontFamily: fontFamilyBold,
        fontSize: '20rem',
        marginLeft: '14rem',
        marginTop: '20rem',
    },
    subtitleText: {
        color: colors.black,
        fontFamily: fontFamilyRegular,
        fontSize: '14rem',
        marginLeft: '14rem',
        marginTop: '5rem',
        marginBottom: '10rem'
    },
    divider: {
        alignSelf: 'center',
        height: '3rem',
        width: '80rem',
        backgroundColor: colors.lightGray,
        marginTop: '8rem',
        borderRadius: '4rem'
    },
    sortView: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    sortByRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '15rem',
        paddingLeft: '14rem',
    },
    sortByRowPressed: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.pressedColorOpacity,
        paddingVertical: '15rem',
        paddingLeft: '14rem',
    },
    radioCircle: {
        height: '18rem',
        width: '18rem',
        borderRadius: '50rem',
        borderWidth: '1rem',
        borderColor: colors.brandColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: '9rem',
        height: '9rem',
        borderRadius: '25rem',
        backgroundColor: colors.pressedBtnColor,
    },
    radioText: {
        fontSize: '15rem',
        color: colors.black,
        fontFamily: fontFamilyMedium,
        marginLeft: '10rem',
    },
    hitSlop10: {
        right: '10rem',
        left: '10rem',
        top: '10rem',
        bottom: '10rem',
    },
    btnContainer: {
        alignItems: 'center',
        marginVertical: '15rem',
    },
    downArrow: {
        width: '14rem',
        height: '14rem',
        marginLeft: '20rem'
    },
    upArrow: {
        width: '14rem',
        height: '14rem',
        marginLeft: '20rem',
        transform: [{ rotate: '180deg' }]
    }
})