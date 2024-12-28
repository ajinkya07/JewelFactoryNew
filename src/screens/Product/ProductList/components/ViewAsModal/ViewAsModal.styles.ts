import { colors } from "../../../../../utils/colors";
import { fontFamilyBold, fontFamilyMedium, fontFamilyRegular, fontFamilySemiBold } from "../../../../../utils/constants";
import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
    modalView: {
        justifyContent: "flex-end",
        marginBottom: '0rem',
        marginHorizontal: '0rem'
    },
    modalViewContainer: {
        borderTopLeftRadius: '14rem',
        borderTopRightRadius: '14rem',
        backgroundColor: colors.white,
        paddingBottom: '20rem',
    },
    contentStyle: {
        paddingTop: '10rem',
        paddingBottom: '60rem'
    },
    titleText: {
        color: colors.black,
        fontFamily: fontFamilyBold,
        fontSize: '20rem',
        marginLeft: '14rem',
        marginTop: '20rem',
    },
    subtitleText: {
        color: colors.black,
        fontFamily: fontFamilyRegular,
        fontSize: '14rem',
        marginLeft: '14rem',
        marginTop: '5rem',
        marginBottom: '30rem'
    },
    divider: {
        alignSelf: 'center',
        height: '3rem',
        width: '80rem',
        backgroundColor: colors.lightGray,
        marginTop: '8rem',
        borderRadius: '4rem'
    },
    hitSlop10: {
        right: '10rem',
        left: '10rem',
        top: '10rem',
        bottom: '10rem',
    },
    btnContainer: {
        alignItems: 'center',
        marginVertical: '15rem',
    },
    viewAsItemView: {
        height: '200rem',
        width: '200rem',
        borderWidth: '1rem',
        borderColor: colors.gray,
        padding: '10rem',
        alignSelf: 'center',
    },
    squareView: {
        height: '80rem',
        width: '80rem',
        margin: '5rem',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowDownAbsView: {
        position: 'absolute',
        bottom: '40rem',
        right: '70rem',
        height: '20rem',
        width: '20rem',
    },
    arrowDownAbsViewForRightSwipe: {
        position: 'absolute',
        bottom: '40rem',
        right: '50rem',
        height: '20rem',
        width: '20rem',
    },
    downArrowImg: {
        height: '40rem',
        width: undefined,
        aspectRatio: 1,
        tintColor: colors.black,
    },
    rectangleView: {
        height: '80rem',
        width: '180rem',
        margin: '5rem',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    horizontalRectangle: {
        height: '180rem',
        width: '80rem',
        margin: '5rem',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    singleSquare: {
        height: '180rem',
        width: '180rem',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    singleAbsView: {
        position: 'absolute',
        bottom: '40rem',
        right: '100rem',
        height: '20rem',
        width: '20rem',
    },
    padding10: {
        paddingHorizontal: '10rem'
    },
    rightArrow: {
        transform: [{ rotate: '-90deg' }]
    }
})