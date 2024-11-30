import EStyleSheet from "react-native-extended-stylesheet";
import { fontFamilyBold, fontFamilySemiBold } from "../../../utils/constants";
import { colors } from "../../../utils/colors";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
        paddingBottom: '90rem'
    },
    categoryTextStyle: {
        fontSize: '18rem',
        fontFamily: fontFamilySemiBold,
        color: colors.black,
        marginBottom: '5rem',
        marginLeft: '12rem',
        marginTop: '30rem',
        textTransform: 'capitalize'
    },
    productsCountText: {
        fontSize: '13rem',
        color: colors.black,
        marginBottom: '26rem',
        marginLeft: '12rem',
        fontFamily: fontFamilySemiBold,
    },
    verticleLine: {
        height: '50%',
        width: '2rem',
        backgroundColor: colors.divider,
    },
    filterTextView: {
        alignItems: 'center',
        width: width / 3,
        height: '80rem',
        justifyContent: 'center'
    },
    filterTextStyle: {
        color: colors.black,
        fontSize: '14rem',
        fontFamily: fontFamilyBold,
    },
    filterRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    bottomViewContainer: {
        height: '80rem',
        justifyContent: 'flex-end',
        borderTopWidth: "1rem",
        borderTopColor: colors.lightGray,
        backgroundColor: colors.lightBlue
    },
    flex: {
        flex: 1,
        alignSelf: 'center',
    },
});
