import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../../../utils/colors";

const { width, height } = Dimensions.get('window')

export const styles = EStyleSheet.create({
    bottom10: {
        paddingBottom: '10rem',
        marginTop: '20rem'
    },
    cardView: {
        width: width,
        alignSelf: 'center',
        borderWidth: '1rem',
        borderColor: colors.lightBlue,
        backgroundColor: colors.touchHighlightGray,
    },
    imageView: {
        width: width
    },
    image: {
        alignItems: 'center',
        height: '230rem',
        width: width,
        backgroundColor: colors.gray,
    },
})