import EStyleSheet from "react-native-extended-stylesheet";
import RootStore from "../../stores/RootStore";
import { colors } from "../../utils/colors";
import { fontFamilyBold, fontFamilyMedium } from "../../utils/constants";

export const styles = EStyleSheet.create({
    modalStyle: {
        justifyContent: 'flex-end',
        marginBottom: '0rem',
        marginHorizontal: '0rem',
    },
    modalContent: {
        height: RootStore.appStore.screenHeight,
        backgroundColor: colors.white
    },
    container: {
        flex: 1,
    },
    closeButtonContainer: {
        marginTop: '40rem',
        marginLeft: '20rem',
    },
    closeBtn: {
        height: '16rem',
        width: null,
        aspectRatio: 1,
    },
    subContainer: {
        marginHorizontal: '20rem',
        marginTop: '80rem',
    },
    timer: {
        height: '50rem',
        width: '50rem'
    },
    headerText: {
        textAlign: 'left',
        fontSize: '30rem',
        marginTop: '20rem',
        fontFamily: fontFamilyBold,
    },
    descText: {
        fontSize: '16rem',
        marginTop: '10rem',
        color: colors.gray,
        fontFamily: fontFamilyMedium,
    },
});