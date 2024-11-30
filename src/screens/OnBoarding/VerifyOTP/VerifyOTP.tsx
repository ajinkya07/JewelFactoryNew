import React, {useMemo, useState} from 'react';
import {View, Text, SafeAreaView, Platform, Keyboard} from 'react-native';
import {Observer} from 'mobx-react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {strings} from '../../../utils/strings';
import PressableComponent, {
  PRESSABLE_ALIGN,
  PRESSABLE_BTN_TYPE,
} from '../../../components/PressableComponent/PressableComponent';
import RootStore from '../../../stores/RootStore';
import {styles} from './VerifyOTP.styles';
import {getDeviceId, isDefined, showToast} from '../../../utils/helper';
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent';
import {colors} from '../../../utils/colors';
import {Section} from '../../../utils/types';

const VerifyOTP = (props: any) => {
  const [code, saveCode] = useState('');
  const [finalOtp, finalEnteredOtp] = useState('');

  const inputData = props.route.params?.inputs;
  const receivedOtp = props.route.params.otp;
  const section = props.route.params.section;
  const isRegisterSection = section == Section.REGISTER;
  const {name, mobileNo, email, password, newPassword} = inputData;

  const forgotPasswordApiCall = () => {
    const params = new FormData();

    params.append('mobile_number', mobileNo);
    params.append('otp', receivedOtp);
    params.append('password', newPassword);

    RootStore.loginStore.forgotPasswordApi(params);
  };

  const registerApiCall = async () => {
    const reg_source = Platform.OS === 'ios' ? 'ios' : 'android';
    const deviceId = await getDeviceId();

    const params = new FormData();
    params.append('full_name', name);
    params.append('mobile_number', mobileNo);
    params.append('email_id', email);
    params.append('password', password);
    params.append('reg_source', reg_source);
    params.append('device_id', deviceId);

    RootStore.loginStore.verifyOtpRegisterApi(params);
  };

  const submitOtp = () => {
    let error = '';
    try {
      if (finalOtp.length !== 4) {
        error = strings.enterOtp;
        throw new Error();
      }
      if (finalOtp !== receivedOtp.toString()) {
        error = strings.enterValidOtp;
        throw new Error();
      } else {
        if (isDefined(inputData)) {
          isRegisterSection ? registerApiCall() : forgotPasswordApiCall();
        } else {
          showToast({title: strings.defaultToastText2});
        }
      }
    } catch (err) {
      console.log('err', err);
      showToast({title: error || strings.defaultToastText2});
    }
  };

  const resendOtp = () => {
    saveCode('');
    finalEnteredOtp('');

    const params = new FormData();
    params.append('mobile_number', mobileNo);
    isRegisterSection ? params.append('email_id', email) : null;

    RootStore.loginStore.otpApi(params, inputData, section);
  };

  const getLoadingState = useMemo(() => {
    return isRegisterSection
      ? RootStore.loginStore.isVerifyOtpRegisterApiLoading
      : RootStore.loginStore.isForgotPasswordApiLoading;
  }, [RootStore.loginStore]);

  return (
    <Observer>
      {() => (
        <SafeAreaView style={styles.container}>
          <View style={styles.verifyMobileNoView}>
            <Text style={styles.verifyMobileText}>
              {strings.verifyMobileNo}
            </Text>

            {isDefined(mobileNo) && (
              <Text style={styles.enterMobNoText}>
                {strings.enterOtpSentTo} {mobileNo.slice(-4)}
              </Text>
            )}
          </View>

          <View style={styles.otpView}>
            <OTPInputView
              pinCount={4}
              codeInputFieldStyle={styles.otpInputStyle}
              codeInputHighlightStyle={styles.otpInputHighlightStyle}
              style={styles.otpContainerStyle}
              onCodeChanged={code => saveCode(code)}
              onCodeFilled={finalCode => {
                finalEnteredOtp(finalCode);
                Keyboard.dismiss();
              }}
              autoFocusOnLoad={true}
            />
          </View>

          <PressableComponent
            btnType={PRESSABLE_BTN_TYPE.TEXT}
            text={strings.resendOtp}
            containerStyle={styles.resendOtpBtn}
            pressableStyle={styles.resendOtpBtnTouchable}
            align={PRESSABLE_ALIGN.LEFT}
            colorConfig={{
              pressedBgColor: colors.hyperlinkPressed,
            }}
            textStyle={styles.resendOtpText}
            onPress={resendOtp}
          />

          <View style={styles.btnContainer}>
            <PressableComponent
              btnType={PRESSABLE_BTN_TYPE.PRIMARY}
              text={strings.submit}
              containerStyle={styles.btnContainer}
              onPress={submitOtp}
              isLoading={getLoadingState}
            />
          </View>

          {RootStore.loginStore.isOtpApiLoading && <LoadingComponent />}
        </SafeAreaView>
      )}
    </Observer>
  );
};

export default VerifyOTP;
