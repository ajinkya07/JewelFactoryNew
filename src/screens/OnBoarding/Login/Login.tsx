import {Text, View} from 'react-native';
import {Observer} from 'mobx-react';
import {styles} from './Login.styles';
import RootStore from '../../../stores/RootStore';

const Login = () => {
  return (
    <Observer>
      {() => (
        <View style={styles.container}>
          <Text
            onPress={() =>
              RootStore.appStore.handleScreenNavigation('Register')
            }>
            Login
          </Text>
        </View>
      )}
    </Observer>
  );
};
export default Login;
