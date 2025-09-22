import React from 'react';
import CartWishlistTopTabs from './components/CartWishlistTopTabs/CartWishlistTopTabs';
import {SafeAreaView} from 'react-native';
import HeaderComponent from '../../components/Header/HeaderComponent';
import EStyleSheet from 'react-native-extended-stylesheet';
import {observer} from 'mobx-react';

const CartWishlist = (props: any) => {
  const hideHeader = props?.route?.params?.hideHeader || false;

  return (
    <SafeAreaView style={styles.container}>
      <>
        <HeaderComponent showAppIcon={!hideHeader} isBack={hideHeader} />
        <CartWishlistTopTabs />
      </>
    </SafeAreaView>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});

export default observer(CartWishlist);
