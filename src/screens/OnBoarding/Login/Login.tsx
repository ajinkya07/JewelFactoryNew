import {ScrollView, Text, View} from 'react-native';
import {observer} from 'mobx-react';
import {styles} from './Login.styles';
import RootStore from '../../../stores/RootStore';
import {strings} from '../../../utils/strings';
import {SafeAreaView} from 'react-native';
import {useState} from 'react';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../components/PressableComponent/PressableComponent';
import InputComponent from '../../../components/InputComponent/InputComponent';
import {getDeviceId, showToast, validateMobNum} from '../../../utils/helper';
import {constatnts} from '../../../utils/constants';
import {colors} from '../../../utils/colors';

const Login = () => {
  const [inputs, setLoginInputs] = useState({
    mobileNo: '',
    password: '',
  });

  const onPressLogin = async () => {
    let error = '';
    try {
      if (inputs.mobileNo == '') {
        error = strings.enterMobileNo;
        throw new Error();
      }
      if (!validateMobNum(inputs.mobileNo)) {
        error = strings.enterValidMobileNo;
        throw new Error();
      }
      if (inputs.password == '') {
        error = strings.enterPassword;
        throw new Error();
      } else {
        const data = new FormData();
        data.append('mobile_number', inputs.mobileNo);
        data.append('password', inputs.password);
        data.append('login_type', 'client');
        data.append('device_id', getDeviceId());

        RootStore.loginStore.loginApi(data);
      }
    } catch (err) {
      console.log('error', error);
      showToast({title: error});
    }
  };

  const onChangeText = (key: string, value: string) => {
    setLoginInputs({
      ...inputs,
      [key]: value,
    });
  };

  const onPressForgotPassword = () => {
    RootStore.appStore.handleScreenNavigation('ForgotPassword');
  };

  const onPressRegister = () => {
    RootStore.appStore.handleScreenNavigation('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.nameView}>
          <Text style={styles.title}>{strings.welcome}</Text>
          <Text style={styles.appName}>{strings.appName}</Text>
        </View>
        <View style={styles.inputView}>
          <InputComponent
            value={inputs.mobileNo}
            onChangeText={(value: string) => onChangeText('mobileNo', value)}
            placeholder={strings.mobileNo}
            maxLength={constatnts.MOBILE_NUMBER_MAX_LENGTH}
            returnKeyType="next"
            keyboardType="number-pad"
          />

          <InputComponent
            value={inputs.password}
            onChangeText={(value: string) => onChangeText('password', value)}
            style={styles.passwordInputTop}
            placeholder={strings.password}
            returnKeyType="done"
          />
        </View>
        <PressableComponent
          btnType={PRESSABLE_BTN_TYPE.PRIMARY}
          text={strings.login}
          containerStyle={styles.btnContainer}
          onPress={onPressLogin}
          isLoading={RootStore.loginStore.isLoginApiLoading}
        />

        <PressableComponent
          btnType={PRESSABLE_BTN_TYPE.TEXT}
          text={strings.forgotPassText}
          containerStyle={styles.forgotPasswordBtn}
          pressableStyle={styles.forgotPasswordBtnTouchable}
          colorConfig={{
            pressedBgColor: colors.hyperlinkPressed,
          }}
          textStyle={styles.forgotPassword}
          onPress={onPressForgotPassword}
        />
        <Text style={styles.dontHaveAcc}>
          {strings.dontHaveAccount}
          <Text style={styles.register} onPress={onPressRegister}>
            {strings.register}
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(Login);
