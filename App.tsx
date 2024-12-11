import 'react-native-gesture-handler';
import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Routes from './src/Routes';
import {LogBox} from 'react-native';
import {notificationService} from './src/notification/notificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {local} from './src/notification/Local';

export class App extends Component {
  state = {
    showSplashScreen: true,
  };

  componentDidMount = () => {
    LogBox.ignoreAllLogs(true);
    LogBox.uninstall();

    this.setState({showSplashScreen: true});
    SplashScreen.hide();

    notificationService.registerAppWithFCM();
    notificationService.register(this.onRegister, this.onNotification);
  };

  setSplashScreen = () => {
    this.setState({showSplashScreen: false});
  };

  onRegister = (token: string) => {
    AsyncStorage.setItem('fcmToken', token);
  };

  onNotification = (notify: any) => {
    const options = {
      soundName: 'default',
      playSound: true,
    };

    local.showNotification(0, notify.title, notify.subtitle, notify, options);
  };

  render() {
    return (
      <>
        <Routes />
      </>
    );
  }
}

export default App;
