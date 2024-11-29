import { Linking } from "react-native";
import Toast from "react-native-toast-message";
import { strings } from "./strings";
import DeviceInfo from "react-native-device-info";
import { constatnts } from "./constants";

type showToastPropType = {
  type?: string,
  title?: string,
  subtitle?: string,
  position?: any
}

export const isDefined = <T>(value: T): value is NonNullable<T> => {
  return value !== null && value !== '' && value !== undefined;
};

export const getDeviceId = async () => {
  const deviceId = await DeviceInfo.getUniqueId();
  return deviceId
}


export const openLink = (url: string) => {
  isDefined(url) ? Linking.openURL(url) : ''
}


export const toUpperCase = (value: string) => {
  return isDefined(value) ? value.charAt(0).toUpperCase() + value.slice(1) : '';
};


export const validateEmail = (emailId: string) => {

  if (!isDefined(emailId)) {
    return true
  }

  const regex = /^[A-Za-z]([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const pattern = regex;
  if (!pattern.test(emailId)) {
    return false;
  } else {
    const strEmail = emailId.substring(emailId.indexOf("@") + 1, emailId.length);
    const reversed = strEmail.split("").join("");
    const str = reversed.split(".");
    if (str.length !== undefined && str.length > 1 && str.length < 4) {
      if (str.length === 2) {
        //gmail.com
        if (str[0].length > 1 && str[1].length > 1 && str[1].length < 4) {
          return true;
        }
        return false;

      } else if (str.length === 3) {
        //gmail.com.com
        if (
          str[0].length > 1 &&
          str[1].length > 1 &&
          str[1].length < 4 &&
          str.length > 2 &&
          str[2] !== undefined &&
          str[2].length > 1 &&
          str[2].length < 4
        ) {
          return true;
        }
        return false;

      }
    } else {
      return false;
    }
  }
  return false;
}


export const validatePassword = (password: string) => {
  return !(password.length < 4 || password.length > 20)

}

export const validateMobNum = (number: string) => {
  if (!isDefined(number)) {
    return true
  }
  else if (Number(number) < constatnts.MOBILE_NUMBER_MAX_LENGTH) {
    return true
  }
  else {
    const re = /^[0][5-9]\d{9}$|^[5-9]\d{9}$/;
    const mFormat = /([0-9]).*?\1{9,}/; // duplicate digit check || 9 duplicate digits are allowed to enter
    const whiteSpace = /^\s+$/; // Avoid space
    return re.test(number) && !mFormat.test(number) && !whiteSpace.test(number)
      ? true
      : false;
  }
};

export const showToast = ({ type = 'error', title = '', subtitle = '', position = 'bottom' }: showToastPropType) => {
  return Toast.show({
    type: type,
    text1: title,
    text2: subtitle,
    position: position,
  });
}
