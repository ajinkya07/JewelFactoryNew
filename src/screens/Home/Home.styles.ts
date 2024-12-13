import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../utils/colors";

const { width, height } = Dimensions.get('window')

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    scrollStyle: {
        paddingBottom: '20rem',
    },
    contentContainerStyle: {
        justifyContent: 'center',
        flexGrow: 1
    },
    loader: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    cardView: {
        width: width - 5,
        alignSelf: 'center',
        borderRadius: '10rem',
        borderWidth: '1rem',
        borderColor: colors.lightBlue,
        backgroundColor: colors.touchHighlightGray,
    },
    imageView: {
        width: width / 2 + 20
    },
    categoryImage: {
        height: '110rem',
        width: width - 5,
        borderRadius: '10rem',
        backgroundColor: colors.gray,
    },
})