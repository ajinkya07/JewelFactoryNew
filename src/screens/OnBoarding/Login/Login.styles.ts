import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../../utils/colors";
import { Dimensions } from "react-native";
import { fontFamilyBold, fontFamilyMedium, fontFamilySemiBold } from "../../../utils/constants";

const { height, width } = Dimensions.get('window')

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '20rem',
        alignSelf: 'center'
    },
    nameView: {
        marginTop: '70rem',
    },
    appName: {
        fontSize: '40rem',
        fontFamily: fontFamilyBold,
        textAlign: 'left',
        marginTop: '-5rem',
        color: colors.brandColor,
    },
    title: {
        fontSize: '26rem',
        fontFamily: fontFamilyMedium,
        textAlign: 'left',
        color: colors.gray
    },
    inputView: {
        marginTop: '80rem'
    },
    passwordInputTop: {
        marginTop: '20rem'
    },
    btnContainer: {
        marginTop: '40rem',
    },
    forgotPassword: {
        color: colors.hyperlinkColor,
        textAlign: 'left'
    },
    forgotPasswordBtn: {
        marginTop: '40rem',
        alignItems: 'center',
    },
    forgotPasswordBtnTouchable: {
        alignItems: 'center',
        borderRadius: '8rem',
        padding: '6rem'
    },
    resendOtpText: {
        color: colors.hyperlinkColor,
        textAlign: 'left'
    },
    dontHaveAcc: {
        fontSize: '16rem',
        fontFamily: fontFamilySemiBold,
        textAlign: 'center',
        color: colors.black,
        marginTop: '6rem'
    },
    register: {
        fontSize: '16rem',
        fontFamily: fontFamilyBold,
        textAlign: 'center',
        color: colors.hyperlinkColor,
    },
    flexRow: {
        marginTop: height * 0.2,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    registerBtn: {
        alignItems: 'center',
    },
    registerBtnTouchable: {
        alignItems: 'center',
        borderRadius: '8rem',
        padding: '6rem'
    }

})