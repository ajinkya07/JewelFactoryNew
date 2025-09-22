import React, {Component} from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../utils/colors';
import {strings} from '../utils/strings';
import {observer} from 'mobx-react';

const RetryComponent = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMsg}>{strings.serverFailedMsg}</Text>
      <Text style={styles.errorMsg2} onPress={onPress}>
        {strings.retry}
      </Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  errorMsg: {
    fontSize: '14rem',
    textAlign: 'center',
    color: colors.black,
  },
  errorMsg2: {
    marginTop: 5,
    fontSize: '14rem',
    textAlign: 'center',
    color: colors.hyperlinkColor,
  },
});

export default observer(RetryComponent);
