import React from 'react';
import CartWishlistTopTabs from './components/CartWishlistTopTabs/CartWishlistTopTabs';
import {SafeAreaView} from 'react-native';
import HeaderComponent from '../../components/Header/HeaderComponent';
import EStyleSheet from 'react-native-extended-stylesheet';

const CartWishlist = () => {
  return (
    <SafeAreaView style={styles.container}>
      <>
        <HeaderComponent showAppIcon={true} isBack={false} />
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

export default CartWishlist;
