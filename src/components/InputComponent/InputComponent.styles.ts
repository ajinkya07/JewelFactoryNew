import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";
import { colors } from "../../utils/colors";

const { height, width } = Dimensions.get('window')

export const styles = EStyleSheet.create({

    input: {
        height: '50rem',
        width: width - 40,
        borderColor: colors.lightGray,
        borderWidth: '0.5rem',
        borderRadius: "8rem",
        paddingHorizontal: '10rem',
        color: colors.black
    },
})