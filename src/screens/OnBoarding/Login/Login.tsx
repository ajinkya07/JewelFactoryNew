import {Text, TextInput, View} from 'react-native';
import {observer} from 'mobx-react';
import {styles} from './Login.styles';
import RootStore from '../../../stores/RootStore';
import {strings} from '../../../utils/strings';
import {SafeAreaView} from 'react-native';
import {useState} from 'react';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../components/PressableComponent/PressableComponent';

const Login = () => {
  const [inputs, setLoginInputs] = useState({
    mobileNo: '',
    password: '',
  });

  const onPressLogin = () => {
    RootStore.appStore.setFields('showPreLogin', false);
    RootStore.appStore.setFields('isLoggedIn', true);
    // RootStore.appStore.handleScreenNavigation('Home');
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
      <View style={styles.nameView}>
        <Text style={styles.title}>{strings.welcome}</Text>
        <Text style={styles.appName}>{strings.appName}</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          value={inputs.mobileNo}
          onChangeText={value => onChangeText('mobileNo', value)}
          style={styles.input}
          placeholder="Mobile Number"
        />
        <TextInput
          value={inputs.password}
          onChangeText={value => onChangeText('password', value)}
          style={[styles.input, styles.passwordInputTop]}
          placeholder="Phone Number"
        />
      </View>
      <PressableComponent
        btnType={PRESSABLE_BTN_TYPE.PRIMARY}
        text={strings.login}
        containerStyle={styles.btnContainer}
        pressableStyle={styles.btnContainer}
        onPress={onPressLogin}
      />

      <Text style={styles.forgotPassword} onPress={onPressForgotPassword}>
        {strings.forgotPassText}
      </Text>
      <Text style={styles.dontHaveAcc}>
        {strings.dontHaveAccount}
        <Text style={styles.register} onPress={onPressRegister}>
          {strings.register}
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default observer(Login);
