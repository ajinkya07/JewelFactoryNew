import 'react-native-gesture-handler';
import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Routes from './Routes';
import {LogBox} from 'react-native';

export class App extends Component {
  state = {
    showSplashScreen: true,
  };

  componentDidMount() {
    LogBox.ignoreAllLogs();
    this.setState({showSplashScreen: true});
    SplashScreen.hide();
  }

  setSplashScreen = () => {
    this.setState({showSplashScreen: false});
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
