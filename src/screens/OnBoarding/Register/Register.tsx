import {Text, View} from 'react-native';
import {observer} from 'mobx-react';
import {strings} from '../../../utils/strings';
import {SafeAreaView} from 'react-native';
import {useState} from 'react';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../components/PressableComponent/PressableComponent';
import InputComponent from '../../../components/InputComponent/InputComponent';
import {styles} from './Register.styles';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();

  const [inputs, setLoginInputs] = useState({
    name: '',
    email: '',
    company: '',
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
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nameView}>
        <Text style={styles.title}>{strings.welcome}</Text>
        <Text style={styles.appName}>{strings.appName}</Text>
      </View>
      <View style={styles.inputView}>
        <InputComponent
          value={inputs.name}
          onChangeText={(value: string) => onChangeText('name', value)}
          placeholder={strings.name}
        />
        <InputComponent
          value={inputs.email}
          onChangeText={(value: string) => onChangeText('email', value)}
          style={styles.inputTop}
          placeholder={strings.email}
        />
        <InputComponent
          value={inputs.mobileNo}
          onChangeText={(value: string) => onChangeText('mobileNo', value)}
          style={styles.inputTop}
          placeholder={strings.mobileNo}
        />
        <InputComponent
          value={inputs.company}
          onChangeText={(value: string) => onChangeText('company', value)}
          style={styles.inputTop}
          placeholder={strings.company}
        />

        <InputComponent
          value={inputs.password}
          onChangeText={(value: string) => onChangeText('password', value)}
          style={styles.inputTop}
          placeholder={strings.password}
        />
      </View>
      <PressableComponent
        btnType={PRESSABLE_BTN_TYPE.PRIMARY}
        text={strings.register}
        containerStyle={styles.btnContainer}
        onPress={onPressRegister}
      />
    </SafeAreaView>
  );
};

export default observer(Register);
