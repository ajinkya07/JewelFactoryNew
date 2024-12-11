import {makeAutoObservable, action} from 'mobx';
import {Platform} from 'react-native';
import * as NavigationService from '../utils/NavigationService';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import {isTablet} from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

const height = initialWindowMetrics?.frame?.height || 812;
const width = initialWindowMetrics?.frame?.width || 375;

const hRem = height / 772;
// figma screen height
const newHRem = height / 812;
const wRem = width / 375;

const NUMBERS = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
  {id: 7},
  {id: 8},
  {id: 9},
  {
    id: 10,
  },
  {id: 0},
  {
    id: 11,
  },
];

export class AppStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  hRem = hRem;

  newHRem = newHRem;

  wRem = wRem;

  numbers = NUMBERS;

  screenWidth = width;

  screenHeight = height;

  isiOS = Platform.OS === 'ios';

  isAndroid = Platform.OS === 'android';

  showSplashScreeniOS = Platform.OS === 'ios';

  isTablet = isTablet();

  isLoading = false;

  userId = '';
  isNetworkConnected = true;
  showPreLogin = true;
  isLoggedIn = false;
  isComingSoonVisible = false;
  isContactUsModalVisible = false;

  setFields(eName, data) {
    this[eName] = data;
  }

  handleScreenNavigation(navigateTo, params) {
    NavigationService.navigate(navigateTo, params || {});
  }

  handleScreenNavigationGoBack(params) {
    NavigationService.goBack(params || {});
  }

  handleResetStack(navigateTo, params) {
    NavigationService.resetStack(navigateTo, params || {});
  }

  get isIphoneX() {
    return (
      this.isiOS &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (height === 780 ||
        width === 780 ||
        height === 812 ||
        width === 812 ||
        height === 844 ||
        width === 844 ||
        height === 852 ||
        width === 852 ||
        height === 896 ||
        width === 896 ||
        height === 926 ||
        width === 926 ||
        height === 932 ||
        width === 932)
    );
  }

  logout() {
    AlertBox(
      '',
      'Are you sure you want to logout?',
      'No',
      () => {
        //do nothing
      },
      'Yes',
      action(() => {
        resetStoreOnLogout();
      }),
    );
  }

  resetFields() {
    this.userId = '';
    this.showPreLogin = true;
    this.isLoggedIn = false;
  }

  // Reset store fields
  resetStoreOnLogout = () => {
    const keys = ['fullName', 'userStatus', 'mobileNumber', 'emailId'];

    this.resetFields();
    AsyncStorage.multiRemove(keys);

    AsyncStorage.setItem('userId', '');
    AsyncStorage.setItem('showPreLogin', 'true');
    AsyncStorage.setItem('isLoggedIn', 'false');
  };
}
export default AppStore;
