import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../../../../utils/colors";
import { fontFamilyBold, fontFamilyMedium } from "../../../../../utils/constants";

const { width, height } = Dimensions.get('window')
// alignItems: 'center',
// justifyContent: 'center',

const CARD_WIDTH = width / 2 - 10
const CARD_MARGIN_LEFT = '5rem'

export const styles = EStyleSheet.create({
    imageContainer: {
        width: CARD_WIDTH,
        borderRadius: '12rem',
        backgroundColor: colors.white,
        paddingBottom: '10rem',
        marginLeft: CARD_MARGIN_LEFT,
        marginTop: '20rem',
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2.2,
    },
    imageStyle: {
        width: '100%',
        height: '170rem',
        borderTopLeftRadius: '12rem',
        borderTopRightRadius: '12rem',
        backgroundColor: colors.brandColorOpacity,
    },
    hitSlop10: {
        right: 10,
        left: 10,
        top: 10,
        bottom: 10,
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
        width: '24rem',
        height: '24rem',
        tintColor: colors.brandColor
    },
    productInfo: {
        backgroundColor: colors.white,
        marginBottom: '5rem',
        marginHorizontal: '5rem'
    },
    infoTitle: {
        flex: 1,
        color: colors.black,
        fontSize: '12rem',
        fontFamily: fontFamilyMedium,
    },
    quantityText: {
        marginTop: '4rem',
        color: colors.black,
        fontSize: '16rem',
        fontFamily: fontFamilyBold,
    }
})