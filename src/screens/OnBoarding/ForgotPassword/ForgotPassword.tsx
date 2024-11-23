import {Text, View} from 'react-native';
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

const ForgotPassword = () => {
  const [inputs, setLoginInputs] = useState({
    newPassword: '',
    conformPassword: '',
  });

  const onChangeText = (key: string, value: string) => {
    setLoginInputs({
      ...inputs,
      [key]: value,
    });
  };

  const onPressForgotPassword = () => {
    RootStore.appStore.handleScreenNavigation('ForgotPassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nameView}>
        <Text style={styles.title}>{strings.welcome}</Text>
        <Text style={styles.appName}>{strings.appName}</Text>
      </View>
      <View style={styles.inputView}>
        <InputComponent
          value={inputs.newPassword}
          onChangeText={(value: string) => onChangeText('newPassword', value)}
          placeholder={strings.newPassword}
        />

        <InputComponent
          value={inputs.conformPassword}
          onChangeText={(value: string) =>
            onChangeText('conformPassword', value)
          }
          style={styles.passwordInputTop}
          placeholder={strings.conformPassword}
        />
      </View>
      <PressableComponent
        btnType={PRESSABLE_BTN_TYPE.PRIMARY}
        text={strings.next}
        containerStyle={styles.btnContainer}
        onPress={onPressForgotPassword}
      />
    </SafeAreaView>
  );
};

export default observer(ForgotPassword);
