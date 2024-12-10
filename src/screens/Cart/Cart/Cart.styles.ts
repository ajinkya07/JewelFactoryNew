import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { fontFamilyMedium } from "../../../utils/constants";

const { width, height } = Dimensions.get('window')

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    scrollStyle: {
        flex: 1,
        padding: '20rem',
    },
    contentContainerStyle: {
        paddingBottom: '50rem',
    },
    loader: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
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