import { Platform, StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";
import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    scrollStyle: {
        flex: 1,
        padding: '14rem',
    },
    contentContainerStyle: {
        flex: 1,
    },
    viewContainer: {
        marginTop: '10rem',
        backgroundColor: colors.white,
        flex: 1,
    },
    flex: {
        flex: 1,
        backgroundColor: colors.white,
    },
    collectionCount: {
        color: colors.white,
    },
    title: {
        color: colors.black,
    },
    subTitle: {
        color: colors.gray,
    },
    countContainer: {
        width: '46rem',
        height: '46rem',
        borderRadius: '23rem',
        backgroundColor: colors.bgColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '18rem',
    },
    textContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: '10rem',
        marginTop: '10rem',
    },
    borderStyle: {
        borderColor: '#d2d2d2',
        borderWidth: 0.7,
        marginTop: '20rem',
    },
});