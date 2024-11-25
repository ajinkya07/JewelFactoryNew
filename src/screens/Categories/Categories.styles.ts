import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../utils/colors";
import { fontFamilyBold } from "../../utils/helper";

const { width, height } = Dimensions.get('window')

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    bottom10: {
        paddingBottom: '10rem',
        marginTop: '20rem'
    },
    cardTop: {
        marginTop: '10rem',
    },
    cardView: {
        flexDirection: "row",
        width: width - 10,
        alignItems: "flex-start",
        alignSelf: 'center',
        borderRadius: '10rem',
        marginTop: '10rem',
        borderWidth: '1rem',
        borderColor: colors.lightBlue,
    },
    nameView: {
        width: width / 2 + 20
    },
    imageView: {
        alignItems: 'flex-end',
        flex: 1,
    },
    imageBgBorder: {
        borderRadius: '10rem',
    },
    categoryImage: {
        height: '110rem',
        width: width / 2 - 40,
        borderTopRightRadius: '10rem',
        borderBottomRightRadius: '10rem',
        backgroundColor: colors.gray,
    },
    categoryTitle: {
        marginTop: '20rem',
        marginLeft: '15rem',
        marginRight: '10rem',
        fontSize: '16rem',
        fontFamily: fontFamilyBold,
        color: colors.black,
        letterSpacing: 0.2,
    },
    categorySubTitle: {
        marginLeft: '15rem',
        marginRight: '10rem',
        marginTop: '2rem',
        fontSize: '12rem',
        fontFamily: fontFamilyBold,
        color: colors.gray,
        letterSpacing: 0.2,
    },
})