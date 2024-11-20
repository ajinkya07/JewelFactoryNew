import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import IconPack from '../../utils/IconPack';
import {styles} from './SplashScreen.styles';

const SplashVideoScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={IconPack.APP_LOGO}
        style={styles.appLogo}
        resizeMode="contain"
      />
      {/* <Video
        source={IconPack.APP_LOGO_VIDEO}
        onError={err => {
          onEnd();
        }}
        style={styles.backgroundVideo}
        resizeMode="cover"
        disableFocus
        playWhenInactive
        onEnd={() => onEnd()}
      /> */}
    </View>
  );
};

export default SplashVideoScreen;
