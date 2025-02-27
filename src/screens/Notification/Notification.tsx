import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import NoDataFoundComponent from '../../components/NoDataFoundComponent/NoDataFoundComponent';
import {observer} from 'mobx-react';
import HeaderComponent from '../../components/Header/HeaderComponent';

const Notification = (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent isBack={true} rightIcon1={false} />
      <View style={styles.centeredView}>
        <NoDataFoundComponent />
      </View>
    </SafeAreaView>
  );
};

export default observer(Notification);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
