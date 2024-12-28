import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../../../../utils/colors";
import { fontFamilyBold, fontFamilyMedium } from "../../../../../utils/constants";

const { width, height } = Dimensions.get('window')
// alignItems: 'center',
// justifyContent: 'center',

const CARD_WIDTH = width - 10
const CARD_MARGIN_LEFT = '5rem'

export const styles = EStyleSheet.create({
    imageContainer: {
        width: CARD_WIDTH,
        borderRadius: '14rem',
        backgroundColor: colors.white,
        paddingBottom: '10rem',
        marginLeft: CARD_MARGIN_LEFT,
        marginTop: '10rem',
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2.2,
    },
    imageStyle: {
        width: '100%',
        height: '250rem',
        borderTopLeftRadius: '14rem',
        borderTopRightRadius: '14rem',
        backgroundColor: colors.pressedColorOpacity,
    },
    hitSlop10: {
        right: '20rem',
        left: '20rem',
        top: '20rem',
        bottom: '20rem',
    },
    wishlistCartContiner: {
        flexDirection: 'row',
        marginTop: '5rem',
        justifyContent: 'space-evenly',
        width: '100%',
        alignItems: 'center',
    },
    flexRow2: {
        flexDirection: 'row',
        marginTop: '10rem',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    wishlistView: {
        height: '30rem',
        width: '30rem',
        marginTop: '10rem'
    },
    wishlistIcon: {
        width: '28rem',
        height: '28rem',
        tintColor: colors.brandColor
    },
    productInfo: {
        backgroundColor: colors.white,
        marginBottom: '5rem',
        marginHorizontal: '20rem'
    },
    infoTitle: {
        flex: 1,
        color: colors.black,
        fontSize: '14rem',
        fontFamily: fontFamilyMedium,
    },
    quantityText: {
        marginTop: '6rem',
        color: colors.black,
        fontSize: '18rem',
        fontFamily: fontFamilyBold,
    }
})