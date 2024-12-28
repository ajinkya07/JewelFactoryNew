import EStyleSheet from "react-native-extended-stylesheet";
import { fontFamilyBold, fontFamilyMedium, fontFamilyRegular, fontFamilySemiBold } from "../../../../utils/constants";
import { colors } from "../../../../utils/colors";

export const styles = EStyleSheet.create({
    modalView: {
        justifyContent: "flex-end",
        marginBottom: '0rem',
        marginHorizontal: '0rem',
    },
    modalViewContainer: {
        borderTopLeftRadius: '14rem',
        borderTopRightRadius: '14rem',
        backgroundColor: colors.white,
        paddingBottom: '40rem',
        paddingHorizontal: '20rem',
        maxHeight: '80%'
    },
    titleText: {
        color: colors.black,
        fontFamily: fontFamilyBold,
        fontSize: '20rem',
        marginTop: '20rem',
    },
    subtitleText: {
        color: colors.gray,
        fontFamily: fontFamilyMedium,
        fontSize: '14rem',
        marginTop: '5rem',
    },
    divider: {
        alignSelf: 'center',
        height: '3rem',
        width: '80rem',
        backgroundColor: colors.lightGray,
        marginTop: '8rem',
        borderRadius: '4rem'
    },
    content: {
        marginTop: '30rem',
    },
    categoryTitle: {
        color: colors.black,
        fontFamily: fontFamilySemiBold,
        fontSize: '16rem',
        textTransform: 'capitalize'
    },
    categorySubTitle: {
        color: colors.black,
        fontFamily: fontFamilyMedium,
        fontSize: '14rem',
        textTransform: 'capitalize'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30rem'
    },
    marginTop10: {
        marginTop: '10rem'
    },
    marginLeft10: {
        marginLeft: '10rem'
    },
    detailsText: {
        color: colors.black,
        fontFamily: fontFamilyMedium,
        fontSize: '15rem',
        textTransform: 'capitalize',
        marginLeft: '10rem',
        marginTop: '10rem'
    },
    detailsSubText: {
        color: colors.black,
        fontFamily: fontFamilyRegular,
        fontSize: '14rem',
        textTransform: 'capitalize',
        marginLeft: '10rem'
    },
    itemDivider: {
        marginTop: '20rem',
        borderBottomWidth: '1rem',
        borderColor: colors.lightGray,
    }
});