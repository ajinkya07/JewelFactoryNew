import {ScrollView, Text, View} from 'react-native';
import {observer} from 'mobx-react';
import {strings} from '../../../utils/strings';
import {SafeAreaView} from 'react-native';
import {useState} from 'react';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../components/PressableComponent/PressableComponent';
import InputComponent from '../../../components/InputComponent/InputComponent';
import {styles} from './Register.styles';
import {
  showToast,
  validateEmail,
  validateMobNum,
  validatePassword,
} from '../../../utils/helper';
import RootStore from '../../../stores/RootStore';
import {constatnts} from '../../../utils/constants';
import {Section} from '../../../utils/types';
import HeaderComponent from '../../../components/Header/HeaderComponent';

const Register = () => {
  const [inputs, setLoginInputs] = useState({
    name: '',
    email: '',
    mobileNo: '',
    password: '',
  });

  const onChangeText = (key: string, value: string) => {
    setLoginInputs({
      ...inputs,
      [key]: value,
    });
  };

  const onPressRegister = () => {
    const {name, mobileNo, email, password} = inputs;
    let error = '';
    try {
      if (name === '') {
        error = strings.enterName;
        throw new Error();
      }
      if (mobileNo === '') {
        error = strings.enterMobileNo;
        throw new Error();
      }
      if (!validateMobNum(mobileNo)) {
        error = strings.enterValidMobileNo;
        throw new Error();
      }
      if (email === '') {
        error = strings.enterEmail;
        throw new Error();
      }
      if (!validateEmail(email)) {
        error = strings.enterValidEmail;
        throw new Error();
      }
      if (password == '') {
        error = strings.enterPassword;
        throw new Error();
      }
      if (!validatePassword(password)) {
        error = strings.enterValidPassword;
        throw new Error();
      } else {
        const registerData = {
          email: email,
          mobileNo: mobileNo,
          name: name,
          password: password,
        };
        const params = new FormData();

        params.append('mobile_number', mobileNo);
        params.append('email_id', email);

        RootStore.loginStore.otpApi(params, registerData, Section.REGISTER);
      }
    } catch (err) {
      console.log('error', error);
      showToast({title: error});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent rightIcon1={true} showDivider={false} />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        <View style={styles.nameView}>
          <Text style={styles.title}>{strings.welcome}</Text>
          <Text style={styles.appName}>{strings.appName}</Text>
        </View>
        <View style={styles.inputView}>
          <InputComponent
            value={inputs.name}
            onChangeText={(value: string) => onChangeText('name', value)}
            placeholder={strings.name}
            returnKeyType="next"
          />
          <InputComponent
            value={inputs.mobileNo}
            onChangeText={(value: string) => onChangeText('mobileNo', value)}
            style={styles.inputTop}
            placeholder={strings.mobileNo}
            maxLength={constatnts.MOBILE_NUMBER_MAX_LENGTH}
            returnKeyType="next"
            keyboardType="number-pad"
          />
          <InputComponent
            value={inputs.email}
            onChangeText={(value: string) => onChangeText('email', value)}
            style={styles.inputTop}
            placeholder={strings.email}
            returnKeyType="next"
            keyboardType="email-address"
          />
          <InputComponent
            value={inputs.password}
            onChangeText={(value: string) => onChangeText('password', value)}
            style={styles.inputTop}
            placeholder={strings.password}
            returnKeyType="done"
          />
        </View>
        <PressableComponent
          btnType={PRESSABLE_BTN_TYPE.PRIMARY}
          text={strings.register}
          containerStyle={styles.btnContainer}
          onPress={onPressRegister}
          isLoading={RootStore.loginStore.isOtpApiLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(Register);
