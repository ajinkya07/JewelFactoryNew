import {ScrollView, Text, View} from 'react-native';
import {observer} from 'mobx-react';
import {styles} from './ForgotPassword.styles';
import RootStore from '../../../stores/RootStore';
import {strings} from '../../../utils/strings';
import {SafeAreaView} from 'react-native';
import {useState} from 'react';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../components/PressableComponent/PressableComponent';
import InputComponent from '../../../components/InputComponent/InputComponent';
import {
  showToast,
  validateMobNum,
  validatePassword,
} from '../../../utils/helper';
import {Section} from '../../../utils/types';
import {constants} from '../../../utils/constants';
import HeaderComponent from '../../../components/Header/HeaderComponent';

const ForgotPassword = () => {
  const [inputs, setLoginInputs] = useState({
    mobileNo: '',
    newPassword: '',
  });

  const onChangeText = (key: string, value: string) => {
    setLoginInputs({
      ...inputs,
      [key]: value,
    });
  };

  const onPressForgotPassword = () => {
    const {mobileNo, newPassword} = inputs;
    let error = '';
    try {
      if (mobileNo == '') {
        error = strings.enterMobileNo;
        throw new Error();
      } else if (!validateMobNum(mobileNo)) {
        error = strings.enterValidMobileNo;
        throw new Error();
      } else if (newPassword == '') {
        error = strings.enterPassword;
        throw new Error();
      } else if (!validatePassword(newPassword)) {
        error = strings.enterValidPassword;
        throw new Error();
      } else {
        const inputData = inputs;

        const params = new FormData();
        params.append('mobile_number', mobileNo);

        RootStore.loginStore.otpApi(params, inputData, Section.FORGOT_PASSWORD);
      }
    } catch (err) {
      console.log('err', err);
      showToast({title: error});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent rightIcon1={false} showDivider={false} />

      <ScrollView
        bounces={false}
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <>
          <View style={styles.nameView}>
            <Text style={styles.resetPassword}>
              {strings.resetYourPasswordHere}
            </Text>
            <Text style={styles.enterMobNoText}>
              {strings.enterRegisteredMobileNo}
            </Text>
          </View>
          <View style={styles.inputView}>
            <InputComponent
              value={inputs.mobileNo}
              onChangeText={(value: string) => onChangeText('mobileNo', value)}
              placeholder={strings.mobileNo}
              maxLength={constants.MOBILE_NUMBER_MAX_LENGTH}
              returnKeyType="next"
              keyboardType="number-pad"
            />

            <InputComponent
              value={inputs.newPassword}
              onChangeText={(value: string) =>
                onChangeText('newPassword', value)
              }
              placeholder={strings.newPassword}
              style={styles.passwordInputTop}
            />
          </View>
          <PressableComponent
            btnType={PRESSABLE_BTN_TYPE.PRIMARY}
            text={strings.getOtp}
            containerStyle={styles.btnContainer}
            onPress={onPressForgotPassword}
            isLoading={RootStore.loginStore.isOtpApiLoading}
          />
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(ForgotPassword);
