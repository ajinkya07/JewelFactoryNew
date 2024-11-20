import {Text, View} from 'react-native';
import {Observer} from 'mobx-react';
import {styles} from './ForgotPassword.styles';

const ForgotPassword = () => {
  return (
    <Observer>
      {() => (
        <View style={styles.container}>
          <Text>ForgotPassword</Text>
        </View>
      )}
    </Observer>
  );
};
export default ForgotPassword;
