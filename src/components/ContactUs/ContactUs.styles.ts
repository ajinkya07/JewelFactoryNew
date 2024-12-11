import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../utils/colors";
import { fontFamilyBold, fontFamilyMedium, fontFamilyRegular, fontFamilySemiBold } from "../../utils/constants";

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
        paddingBottom: '40rem',
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
        fontSize: '16rem',
        marginLeft: '14rem',
        marginTop: '10rem',
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
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    callusRow: {
        paddingVertical: '40rem',
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginLeft: '-20rem',
        alignItems: 'center',
    },
    imgStyle: {
        width: '30rem',
        height: '30rem',
    },
    closeImg: {
        width: '16rem',
        height: '16rem'
    },
    whatsappText: {
        color: colors.black,
        fontFamily: fontFamilySemiBold,
        fontSize: '16rem',
        marginTop: '10rem',
    }
});