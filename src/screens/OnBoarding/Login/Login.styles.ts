import EStyleSheet from "react-native-extended-stylesheet";
import { fontFamilyBold, fontFamilyLight, fontFamilyMedium, fontFamilyRegular, fontFamilySemiBold } from "../../../utils/helper";
import { colors } from "../../../utils/colors";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get('window')

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
    input: {
        height: '50rem',
        width: width - 40,
        borderColor: colors.lightGray,
        borderWidth: '0.5rem',
        borderRadius: "12rem",
        paddingHorizontal: '10rem'
    },
    passwordInputTop: {
        marginTop: '20rem'
    },
    btnContainer: {
        marginTop: '40rem',
    },
    forgotPassword: {
        marginTop: '40rem',
        fontSize: '14rem',
        fontFamily: fontFamilySemiBold,
        textAlign: 'center',
        color: colors.hyperlinkColor
    },
    dontHaveAcc: {
        marginTop: height * 0.2,
        fontSize: '16rem',
        fontFamily: fontFamilySemiBold,
        textAlign: 'center',
        color: colors.black,
    },
    register: {
        marginTop: height * 0.2,
        fontSize: '16rem',
        fontFamily: fontFamilyBold,
        textAlign: 'center',
        color: colors.brandColor
    }

})