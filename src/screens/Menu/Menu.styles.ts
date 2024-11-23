import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../utils/colors";

export const styles = EStyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    container: {
        flex: 1,
        paddingHorizontal: '20rem',
        backgroundColor: colors.white
    },
    scrollContainer: {
        backgroundColor: colors.bgColor
    },
    title: {
        fontSize: '16rem',
        fontFamily: 'Manrope-Medium',
    },
    menuListContainer: {
        flex: 1,
        marginHorizontal: 4,
    },
    viewRightStyle: {
        borderWidth: '1rem',
        borderRadius: '20rem',
        paddingHorizontal: '13rem',
        paddingVertical: '4rem',
        marginRight: '10rem',
    },
    groupStyle: {
        marginTop: '8rem',
        borderRadius: '12rem',
        overflow: 'hidden',
    },

})