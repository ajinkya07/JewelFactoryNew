import {makeAutoObservable} from 'mobx';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {urls} from '../network/urls';
const header = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
};
class LoginStore {
  constructor() {
    makeAutoObservable(this);
  }

  loginUserDataApiState = 'pending';
  loginUserData = [];

  registerUserDataApiState = 'pending';
  registerUserData = 0;

  getOtpApiState = 'pending';
  otpData = [];

  forgotPasswordApiState = 'pending';
  forgotPasswordData = [];

  loginErrorText = '';
  registerErrorText = '';
  getOtpErrorText = '';
  resetPasswordErrorText = '';

  userId = '';

  emailId = '';

  fullName = '';

  mobileNumber = '';

  deleteAccountApiState = 'pending';

  setFields(eName, data) {
    this[eName] = data;
    console.log(eName, data);
  }

  resetFields() {
    this.loginUserDataApiState = 'pending';
    this.loginUserData = [];

    this.registerUserDataApiState = 'pending';
    this.registerUserData = [];

    this.getOtpApiState = 'pending';
    this.otpData = [];

    this.forgotPasswordApiState = 'pending';
    this.forgotPasswordData = [];

    this.loginErrorText = '';
    this.registerErrorText = '';
    this.getOtpErrorText = '';
    this.resetPasswordErrorText = '';

    this.userId = '';

    this.emailId = '';

    this.fullName = '';

    this.mobileNumber = '';
    this.deleteAccountApiState = 'pending';
  }

  onLoginUser = (data, props) => {
    console.log('onLoginUser', data);

    if (this.loginUserDataApiState == 'loading') {
      return true;
    }
    this.loginUserDataApiState = 'loading';
    this.setFields('loginErrorText', '');

    axios
      .post(urls.Login.url, data, header)
      .then(res => {
        console.log('onLoginUser', res);
        if (res.data.ack === '1') {
          this.loginUserDataApiState = 'done';

          this.loginUserData = res.data?.data;

          let user_id = res.data?.data?.user_id;
          let email_id = res.data?.data?.email_id;
          let full_name = res.data?.data?.full_name;
          let mobile_number = res.data?.data?.mobile_number;

          this.userId = `${user_id}`;
          this.emailId = `${email_id}`;
          this.fullName = `${full_name}`;
          this.mobileNumber = `${mobile_number}`;

          AsyncStorage.setItem('userId', `${user_id}`);
          AsyncStorage.setItem('emailId', email_id);
          AsyncStorage.setItem('fullName', full_name);
          AsyncStorage.setItem('mobileNumber', mobile_number);

          props.navigation.navigate('Home');
        } else {
          this.loginUserDataApiState = 'error';
          this.setFields('loginErrorText', res.data?.msg);
        }
      })
      .catch(function (error) {
        console.log('error', error);
        this.loginUserDataApiState = 'error';
      });
  };

  onRegisterUser = (data, props) => {
    if (this.registerUserDataApiState == 'loading') {
      return true;
    }
    this.registerUserDataApiState = 'loading';
    this.setFields('registerErrorText', '');

    axios
      .post(urls.Register.url, data, header)
      .then(res => {
        if (res.data.ack === '1') {
          console.log('onLoginUser', res.data);
          this.registerUserDataApiState = 'done';
          this.registerUserData = res.data?.data;
          Toast.show({
            type: 'success',
            text1: 'Done',
            text2: `${res.data?.msg} `,
            position: 'bottom',
          });
          props.navigation.goBack();

          props.navigation.navigate('Login');
        } else {
          this.setFields('registerErrorText', res.data?.msg);
          this.registerUserDataApiState = 'error';
        }
      })
      .catch(function (error) {
        this.registerUserDataApiState = 'error';
      });
  };

  getOTP = (data, props) => {
    if (this.getOtpApiState == 'loading') {
      return true;
    }
    this.getOtpApiState = 'loading';

    axios
      .post(urls.Otp.url, data, header)
      .then(res => {
        console.log('getOTP', res.data);
        if (res.data.ack === '1') {
          this.getOtpApiState = 'done';
          this.otpData = res.data?.data;
          props.navigation.navigate('Otp');
        } else {
          this.getOtpApiState = 'error';
        }
      })
      .catch(function (error) {
        console.log('getOTP', error);
        this.getOtpApiState = 'error';
      });
  };

  resetPassword = (data, props) => {
    console.log('resetPassword data', data);
    if (this.forgotPasswordApiState == 'loading') {
      return true;
    }
    this.forgotPasswordApiState = 'loading';
    this.setFields('resetPasswordErrorText', '');

    axios
      .post(urls.ForgotPassword.url, data, header)
      .then(res => {
        if (res.data.ack === '1') {
          console.log('resetPassword', res.data);
          this.forgotPasswordApiState = 'done';
          this.forgotPasswordData = res.data?.data;
          Toast.show({
            type: 'success',
            text1: 'Done',
            text2: `${res.data?.msg} `,
            position: 'bottom',
          });
          props.navigation.navigate('Login');
        } else {
          this.setFields('resetPasswordErrorText', res.data?.msg);
          this.forgotPasswordApiState = 'error';
        }
      })
      .catch(function (error) {
        this.forgotPasswordApiState = 'error';
      });
  };

  deleteAccountApi = data => {
    console.log('deleteAccountApi data', data);
    if (this.deleteAccountApiState == 'loading') {
      return true;
    }
    this.deleteAccountApiState = 'loading';

    axios
      .post(urls.DeleteAccount.url, data, header)
      .then(res => {
        if (res.data.ack === '1') {
          console.log('deleteAccountApi', res.data);
          this.deleteAccountApiState = 'done';
          Toast.show({
            type: 'success',
            text1: 'Done',
            text2: `${res.data?.msg} `,
            position: 'bottom',
          });
          AsyncStorage.setItem('userId', '');
          AsyncStorage.setItem('emailId', '');
          AsyncStorage.setItem('fullName', '');

          this.userId = '';
        } else {
          this.deleteAccountApiState = 'error';
        }
      })
      .catch(function (error) {
        this.deleteAccountApiState = 'error';
        Toast.show({
          type: 'error',
          text1: 'Oops',
          text2: 'Something went wrong',
          position: 'bottom',
        });
      });
  };
}
export default new LoginStore();
