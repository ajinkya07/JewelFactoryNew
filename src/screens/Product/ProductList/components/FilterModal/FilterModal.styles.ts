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
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '20rem',
        marginHorizontal: '14rem',
    },
    titleText: {
        color: colors.black,
        fontFamily: fontFamilyBold,
        fontSize: '20rem',
    },
    subtitleText: {
        color: colors.black,
        fontFamily: fontFamilyRegular,
        fontSize: '14rem',
        marginLeft: '14rem',
        marginBottom: '30rem'
    },
    divider: {
        alignSelf: 'center',
        height: '3rem',
        width: '80rem',
        backgroundColor: colors.lightGray,
        marginTop: '8rem',
        borderRadius: '4rem'
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
    itemContainer: {
        paddingTop: '20rem',
        paddingBottom: '30rem',
        backgroundColor: colors.pressedColorOpacity,
        marginHorizontal: '8rem',
        borderRadius: '10rem'
    },
    content: {
        marginHorizontal: '40rem',
        justifyContent: 'center',
    },
    marker: {
        backgroundColor: colors.black,
        width: '22rem',
        height: '22rem',
        borderRadius: '11rem',
    },
    valueRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    marginTop: {
        marginTop: '10rem'
    },
    weightText: {
        color: colors.black,
        fontFamily: fontFamilyRegular,
        fontSize: '18rem',
        marginLeft: '14rem',
        textAlign: 'center'
    },
    valueText: {
        color: colors.black,
        fontFamily: fontFamilyRegular,
        fontSize: '16rem',
    },
    markerHeight: {
        height: '2rem'
    },
    resetPressed: {
        alignSelf: 'flex-start',
        borderRadius: '8rem',
        padding: '6rem'
    },
    reset: {
        fontSize: '16rem',
        fontFamily: fontFamilyBold,
        color: colors.hyperlinkColor,
    },
})