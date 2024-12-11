import {makeAutoObservable} from 'mobx';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {urls} from '../network/urls';
import {Platform} from 'react-native';
import {showToast} from '../utils/helper';
import {constatnts} from '../utils/constants';

const header = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
};
export class LoginStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  isLoginApiLoading = false;
  loginUserData = [];

  isVerifyOtpRegisterApiLoading = false;
  registerUserData = 0;

  isOtpApiLoading = false;
  otpData = [];

  isForgotPasswordApiLoading = false;
  forgotPasswordData = [];

  getOtpErrorText = '';
  resetPasswordErrorText = '';

  emailId = '';
  fullName = '';
  mobileNumber = '';
  deleteAccountApiState = false;

  setFields(eName, data) {
    this[eName] = data;
    console.log(eName, data);
  }

  resetFields() {
    this.isLoginApiLoading = false;
    this.loginUserData = [];

    this.isVerifyOtpRegisterApiLoading = false;
    this.registerUserData = [];

    this.isOtpApiLoading = false;
    this.otpData = [];

    this.isForgotPasswordApiLoading = false;
    this.forgotPasswordData = [];

    this.getOtpErrorText = '';
    this.resetPasswordErrorText = '';

    this.emailId = '';
    this.fullName = '';
    this.mobileNumber = '';
    this.deleteAccountApiState = false;
  }

  // Login
  loginApi = data => {
    console.log('onLoginUser', data);

    if (this.isLoginApiLoading) {
      return true;
    }
    this.setFields('isLoginApiLoading', true);

    axios
      .post(urls.Login.url, data, header)
      .then(res => {
        console.log('onLoginUser', res.data);
        this.setFields('isLoginApiLoading', false);

        if (res.data.ack === '1') {
          const {user_status} = res.data.data;
          if (user_status === constatnts.AVAILABLE) {
            this.sendFcmToken();

            this.setLoginData(res.data);

            this.rootStore.appStore.setFields('showPreLogin', false);
            this.rootStore.appStore.setFields('isLoggedIn', true);
          } else {
            showToast({title: res?.data?.msg});
          }
        } else {
          showToast({title: res?.data?.msg});
        }
      })
      .catch(function (error) {
        console.log('error', error);
        showToast({title: error});
        this.setFields('isLoginApiLoading', false);
      });
  };

  // OTP for Register and forgot password
  otpApi = (data, registerData, section) => {
    if (this.isOtpApiLoading == true) {
      return true;
    }
    this.setFields('isOtpApiLoading', true);

    axios
      .post(urls.SendOtp.url, data, header)
      .then(res => {
        console.log('otpApi', res.data);
        this.setFields('isOtpApiLoading', false);

        if (res.data.ack === '1') {
          const {otp} = res.data?.data;

          showToast({type: 'success', title: res?.data?.msg});

          this.rootStore.appStore.handleScreenNavigation('VerifyOTP', {
            inputs: registerData,
            otp: otp,
            section: section,
          });
        } else {
          showToast({title: res?.data?.msg});
        }
      })
      .catch(function (error) {
        console.log('otpApi', error);
        this.setFields('isOtpApiLoading', false);
        showToast({title: error});
      });
  };

  // Register
  verifyOtpRegisterApi = data => {
    if (this.isVerifyOtpRegisterApiLoading) {
      return true;
    }
    this.setFields('isVerifyOtpRegisterApiLoading', true);

    axios
      .post(urls.Register.url, data, header)
      .then(res => {
        console.log('registerApi', res.data);
        if (res.data.ack === '1') {
          this.setFields('isVerifyOtpRegisterApiLoading', false);

          this.registerUserData = res.data?.data;

          showToast({type: 'success', title: res?.data?.msg});

          this.rootStore.appStore.handleScreenNavigationGoBack();
          this.rootStore.appStore.handleScreenNavigation('Login');
        } else {
          showToast({title: res?.data?.msg});

          this.setFields('isVerifyOtpRegisterApiLoading', false);
        }
      })
      .catch(function (error) {
        this.setFields('isVerifyOtpRegisterApiLoading', false);
        showToast({title: error});
      });
  };

  forgotPasswordApi = data => {
    console.log('resetPassword data', data);
    if (this.isForgotPasswordApiLoading) {
      return true;
    }
    this.setFields('isForgotPasswordApiLoading', true);

    axios
      .post(urls.ChangePassword.url, data, header)
      .then(res => {
        if (res.data.ack === '1') {
          console.log('forgotPasswordApi', res.data);

          this.setFields('isForgotPasswordApiLoading', false);
          showToast({type: 'success', title: res.data.msg});

          this.rootStore.appStore.handleScreenNavigation('Login');
        } else {
          showToast({title: res.data.msg});
          this.setFields('isForgotPasswordApiLoading', false);
        }
      })
      .catch(function (error) {
        showToast({title: error});
        this.setFields('isForgotPasswordApiLoading', false);
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
            title: 'Done',
            subtitle: `${res.data?.msg} `,
            position: 'bottom',
          });
        } else {
          this.deleteAccountApiState = 'error';
        }
      })
      .catch(function (error) {
        this.deleteAccountApiState = 'error';
        Toast.show({
          type: 'error',
          title: 'Oops',
          subtitle: 'Something went wrong',
          position: 'bottom',
        });
      });
  };

  setLoginData(data) {
    this.rootStore.appStore.setFields(
      'userId',
      String(data.data?.user_id) || '',
    );
    AsyncStorage.setItem('userId', String(data.data?.user_id));
    AsyncStorage.setItem('fullName', String(data.data?.full_name));
    AsyncStorage.setItem('userStatus', String(data.data?.user_status));
    AsyncStorage.setItem('mobileNumber', String(data.data?.mobile_number));
    AsyncStorage.setItem('emailId', String(data.data?.email_id));
    AsyncStorage.setItem('showPreLogin', 'false');
    AsyncStorage.setItem('isLoggedIn', 'true');
  }

  // FCM Token Api
  sendFcmTokenApi(data) {
    axios
      .post(urls.sendFCMToken.url, data, header)
      .then(res => {})
      .catch(function (error) {
        // error
      });
  }

  sendFcmToken = async id => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    let platform = Platform.OS === 'ios' ? 'ios' : 'android';

    const fcmData = new FormData();

    fcmData.append('worker_id', id);
    fcmData.append('type', 'client');
    fcmData.append('gcm_no', fcmToken);
    fcmData.append('platform', platform);

    this.sendFcmTokenApi(fcmData);
  };
}

export default LoginStore;
