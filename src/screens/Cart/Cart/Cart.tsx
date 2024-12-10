//import liraries
import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import {styles} from './Cart.styles';
import {observer} from 'mobx-react';
import RootStore from '../../../stores/RootStore';
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent';
import HeaderComponent from '../../../components/Header/HeaderComponent';
import CartWishlistItem from '../components/CartWishlistItem/CartWishlistItem';
import NoDataFoundComponent from '../../../components/NoDataFoundComponent/NoDataFoundComponent';
import TopTab from '../components/Tabs/Tabs';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../components/PressableComponent/PressableComponent';
import {strings} from '../../../utils/strings';

const Cart = observer(() => {
  useEffect(() => {
    // callApis();
  }, []);

  const callApis = () => {
    const userId = global.userId;

    const cartParams = new FormData();
    cartParams.append('user_id', userId);
    cartParams.append('table', 'cart');

    RootStore.cartStore.getCartDataApi(cartParams);

    const wishlistParams = new FormData();
    wishlistParams.append('user_id', userId);
    wishlistParams.append('table', 'wishlist');

    RootStore.cartStore.getWishlistDataApi(wishlistParams);
  };

  const onRefresh = () => {
    callApis();
  };

  const onPressCartWeight = () => {
    //
  };

  const onPressPlaceOrder = () => {
    //
  };

  const showHeader = false;
  const cartData = RootStore.cartStore.cartData;
  return (
    <SafeAreaView style={styles.container}>
      {showHeader && (
        <HeaderComponent rightIcon1={true} onFirstIconPress={() => null} />
      )}
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          style={styles.scrollStyle}
          contentContainerStyle={styles.contentContainerStyle}>
          <>
            {/* <TopTab /> */}

            {RootStore.cartStore.isCartApiLoading ? (
              <View style={styles.loader}>
                <LoadingComponent />
              </View>
            ) : cartData.length > 0 ? (
              <>
                {cartData.map((item, index) => {
                  return <CartWishlistItem key={`cart-${index}`} item={item} />;
                })}
              </>
            ) : (
              <NoDataFoundComponent />
            )}
          </>
        </ScrollView>

        {!RootStore.cartStore.isCartApiLoading && (
          <View style={styles.btnContainer}>
            <PressableComponent
              btnType={PRESSABLE_BTN_TYPE.PRIMARY}
              text={strings.cartWeight}
              containerStyle={styles.btn}
              pressableStyle={styles.btn}
              onPress={onPressCartWeight}
            />
            <PressableComponent
              btnType={PRESSABLE_BTN_TYPE.PRIMARY}
              text={strings.placeOrder}
              containerStyle={styles.btn}
              pressableStyle={styles.btn}
              onPress={onPressPlaceOrder}
            />
          </View>
        )}
      </>
    </SafeAreaView>
  );
});

export default Cart;
