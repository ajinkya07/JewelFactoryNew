import {Text, View} from 'react-native';
import {Observer} from 'mobx-react';
import {styles} from './Register.styles';
import RootStore from '../../../stores/RootStore';

const Register = () => {
  return (
    <Observer>
      {() => (
        <View style={styles.container}>
          <Text
            onPress={() => RootStore.appStore.handleScreenNavigationGoBack()}>
            Register
          </Text>
        </View>
      )}
    </Observer>
  );
};
export default Register;
