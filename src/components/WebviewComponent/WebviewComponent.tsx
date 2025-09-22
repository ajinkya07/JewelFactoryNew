import {Observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {Linking, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import WebView from 'react-native-webview';
import {fontFamilyMedium} from '../../utils/constants';
import {colors} from '../../utils/colors';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import BackHeader from '../BackHeader';

const WebviewComponent = (props: any) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        // @ts-ignore
        <BackHeader />
      ),
      headerTitle: props.route.params.title,
      headerTitleStyle: {
        fontFamily: fontFamilyMedium,
        fontSize: 16,
        color: colors.black,
      },
      headerStyle: {
        backgroundColor: colors.white,
      },
      headerTitleAlign: 'center',
    });
  }, [colors.black, props.navigation, props.route.params.title]);

  const onErrorWebview = () => {
    //
  };

  console.log('props?.route?.params?.url,', props?.route?.params?.url);

  return (
    <Observer>
      {() => (
        <View style={styles.container}>
          <WebView
            source={{
              uri: props?.route?.params?.url,
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            androidHardwareAccelerationDisabled={true}
            renderLoading={() => <LoadingComponent />}
            onError={onErrorWebview}
            onHttpError={onErrorWebview}
            setSupportMultipleWindows={false}
            userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
            originWhitelist={['*']}
            allowsInlineMediaPlayback
            scalesPageToFit
            allowInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            javaScriptEnabledAndroid
            geolocationEnabled={true}
            useWebkit
          />
        </View>
      )}
    </Observer>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebviewComponent;
