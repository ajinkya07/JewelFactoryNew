import EStyleSheet from "react-native-extended-stylesheet";
import { fontFamilyBold, fontFamilyMedium } from "../../../utils/constants";
import { colors } from "../../../utils/colors";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '20rem',
        alignSelf: 'center'
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
    inputTop: {
        marginTop: '15rem'
    },
    btnContainer: {
        marginTop: '40rem',
    },
})