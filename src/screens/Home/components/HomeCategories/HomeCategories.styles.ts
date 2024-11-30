import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../../../utils/colors";
import { fontFamilySemiBold } from "../../../../utils/constants";

const { width, height } = Dimensions.get('window')

export const styles = EStyleSheet.create({
    bottom10: {
        paddingBottom: '10rem',
    },
    categoriesText: {
        fontSize: '16rem',
        fontFamily: fontFamilySemiBold,
        marginTop: '20rem',
        marginBottom: '10rem',
        marginLeft: '10rem',
    },
    cardView: {
        width: width - 5,
        alignSelf: 'center',
        borderRadius: '10rem',
        borderWidth: '1rem',
        borderColor: colors.lightBlue,
        backgroundColor: colors.touchHighlightGray,
    },
    categoryImage: {
        height: '130rem',
        width: width - 5,
        borderRadius: '10rem',
        backgroundColor: colors.lightBlue,
        marginBottom: '5rem'
    },
})