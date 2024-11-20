import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../utils/colors";

export const styles = EStyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    appLogo: {
      height: '12rem',
      width: undefined,
      aspectRatio: 528 / 512,
    },
  });