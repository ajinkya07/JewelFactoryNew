import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../../utils/colors";
import { fontFamilyBold, fontFamilyMedium, } from "../../../utils/constants";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    verifyMobileNoView: {
        marginTop: '80rem'
    },
    verifyMobileText: {
        color: colors.black,
        fontSize: '20rem',
        textAlign: 'left',
        marginHorizontal: '20rem',
        marginBottom: '5rem',
        fontFamily: fontFamilyBold,
    },
    enterMobNoText: {
        color: colors.gray,
        fontSize: '12rem',
        textAlign: 'left',
        marginHorizontal: '20rem',
        fontFamily: fontFamilyMedium,
    },
    otpView: {
        marginHorizontal: '20rem',
        marginTop: '60rem',
    },
    otpInputStyle: {
        width: '60rem',
        height: '60rem',
        color: colors.black,
        borderRadius: '10rem',
        borderColor: colors.divider,
        borderWidth: '1rem',
        fontSize: '18rem',
    },
    otpInputHighlightStyle: {
        width: '60rem',
        height: '60rem',
        color: colors.brandColor,
        fontSize: '18rem',
        borderRadius: '10rem',
        borderColor: colors.brandColor,
    },
    otpContainerStyle: {
        height: '100rem',
        alignSelf: 'center',
    },
    btnContainer: {
        marginTop: '50rem',
        alignItems: 'center',
    },
    resendOtpBtn: {
        marginTop: '10rem',
        alignItems: 'flex-start',
        marginHorizontal: '20rem',
    },
    resendOtpBtnTouchable: {
        alignItems: 'flex-start',
        borderRadius: '8rem',
        padding: '6rem'
    },
    resendOtpText: {
        color: colors.hyperlinkColor,
        textAlign: 'left'
    }
});