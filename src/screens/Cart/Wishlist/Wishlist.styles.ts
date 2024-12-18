import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { fontFamilyMedium } from "../../../utils/constants";

const { width } = Dimensions.get('window')

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    scrollStyle: {
        flex: 1,
        padding: '14rem',
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingBottom: '50rem',
    },
    title: {
        fontSize: '16rem',
        fontFamily: fontFamilyMedium,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '10rem',
        paddingVertical: '10rem'
    },
    btn: {
        width: width / 2 - 30
    },
})