import EStyleSheet from "react-native-extended-stylesheet";
import { fontFamilyBold, fontFamilyMedium, } from "../../../utils/helper";
import { colors } from "../../../utils/colors";
import { Dimensions } from "react-native";


export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: '20rem',
    },
    nameView: {
        marginTop: '70rem'
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
        marginTop: '80rem'
    },
    passwordInputTop: {
        marginTop: '15rem'
    },
    btnContainer: {
        marginTop: '40rem',
    },


})