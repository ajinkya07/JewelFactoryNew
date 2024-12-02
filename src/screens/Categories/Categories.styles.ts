import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../utils/colors";
import { fontFamilyBold, fontFamilyMedium, fontFamilySemiBold } from "../../utils/constants";

const { width, height } = Dimensions.get('window')

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    bottom10: {
        marginTop: '20rem',
    },
    scrollStyle: {
        paddingBottom: '10rem',
    },
    cardTop: {
        marginTop: '10rem',
    },
    cardView: {
        flexDirection: "row",
        width: width - 10,
        alignSelf: 'center',
        borderRadius: '10rem',
        marginTop: '10rem',
        borderColor: colors.lightBlue,
    },
    imageBgBorder: {
        borderRadius: '10rem',
    },
    categoryImage: {
        height: '110rem',
        width: width * 0.66,
        borderTopRightRadius: '10rem',
        borderBottomRightRadius: '10rem',
        backgroundColor: colors.lightBlue,
        overflow: 'hidden'
    },
    categoryTitle: {
        marginLeft: '10rem',
        marginRight: '10rem',
        fontSize: '16rem',
        fontFamily: fontFamilySemiBold,
        color: colors.black,
        textTransform: 'capitalize',
        flex: 1,
        marginTop: '20rem',
    },
})