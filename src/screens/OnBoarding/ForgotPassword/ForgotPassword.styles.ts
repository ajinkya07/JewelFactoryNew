import EStyleSheet from "react-native-extended-stylesheet";
import { fontFamilyBold, fontFamilyMedium, } from "../../../utils/constants";
import { colors } from "../../../utils/colors";


export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '20rem',
        alignSelf: 'center'
    },
    nameView: {
        marginTop: '80rem'
    },
    resetPassword: {
        color: colors.black,
        fontSize: '20rem',
        textAlign: 'left',
        marginBottom: '5rem',
        fontFamily: fontFamilyBold,
    },
    enterMobNoText: {
        color: colors.gray,
        fontSize: '14rem',
        textAlign: 'left',
        fontFamily: fontFamilyMedium,
    },
    appName: {
        fontSize: '40rem',
        fontFamily: fontFamilyBold,
        textAlign: 'left',
        marginTop: '-5rem',
        color: colors.brandColor
    },
    title: {
        fontSize: '26rem',
        fontFamily: fontFamilyMedium,
        textAlign: 'left',
        color: colors.gray
    },
    inputView: {
        marginTop: '90rem'
    },
    passwordInputTop: {
        marginTop: '15rem'
    },
    btnContainer: {
        marginTop: '40rem',
    },


})