import React from 'react';
import {View} from 'react-native';
import {styles} from './Customise.styles';
import {observer} from 'mobx-react';
import WebView from 'react-native-webview';
import {urls} from '../../network/urls';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

var userId = 1;
const Customise = () => {
  const url = `${urls.Customise}?user_id=${userId}`;

  const onErrorWebview = () => {
    //
  };

  return (
    <View style={styles.container}>
      <WebView
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
        source={{uri: url}}
        originWhitelist={['*']}
        allowsInlineMediaPlayback
        javaScriptEnabled
        scalesPageToFit
        allowInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState
        javaScriptEnabledAndroid
        geolocationEnabled={true}
        useWebkit
        renderLoading={() => <LoadingComponent />}
        onError={onErrorWebview}
        onHttpError={onErrorWebview}
      />
    </View>
  );
};

export default observer(Customise);
