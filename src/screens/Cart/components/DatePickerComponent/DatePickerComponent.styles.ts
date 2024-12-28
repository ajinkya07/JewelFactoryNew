import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../../../utils/colors";
import { fontFamilySemiBold } from "../../../../utils/constants";

export const styles = EStyleSheet.create({
    container: {
        margin: 0
    },
    content: {
        backgroundColor: colors.white
    },
    closeContainer: {
        alignItems: 'flex-end',
        height: '30rem',
        justifyContent: 'center',
        marginRight: '20rem',
        marginBottom: "10rem"
    },
    close: {
        fontSize: '16rem',
        color: colors.black,
        fontFamily: fontFamilySemiBold
    }
})