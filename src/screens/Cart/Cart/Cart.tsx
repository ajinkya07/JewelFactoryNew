//import liraries
import React, {useEffect, useState} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import {styles} from './Cart.styles';
import {observer} from 'mobx-react';
import RootStore from '../../../stores/RootStore';
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent';
import CartWishlistItem from '../components/CartWishlistItem/CartWishlistItem';
import NoDataFoundComponent from '../../../components/NoDataFoundComponent/NoDataFoundComponent';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../components/PressableComponent/PressableComponent';
import {strings} from '../../../utils/strings';
import CartWeightModal from '../components/CartWeightModal/CartWeightModal';
import PlaceOrderModal from '../components/PlaceOrderModal/PlaceOrderModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePickerComponent from '../components/DatePickerComponent/DatePickerComponent';

const Cart = observer((props: any) => {
  const userId = RootStore.appStore.userId;
  const cartData = RootStore.cartStore.cartData;

  const [hideButtons, hideButtonsOnScroll] = useState(false);
  var userData = {fullName: '', mobileNo: '', email: ''};

  useEffect(() => {
    cartData.length === 0 ? callApis() : null;
  }, []);

  const callApis = () => {
    RootStore.cartStore.callCartWishlistApis(userId);
  };

  const onRefresh = () => {
    callApis();
  };

  const onPressCartWeight = () => {
    RootStore.cartStore.callCartSumaryApi(userId);
  };

  const onPressPlaceOrder = async () => {
    const name = await AsyncStorage.getItem('fullName');
    const mobile = await AsyncStorage.getItem('mobileNumber');
    const email = await AsyncStorage.getItem('emailId');

    if (name) {
      userData.fullName = name;
    }
    if (mobile) {
      userData.mobileNo = mobile;
    }
    if (email) {
      userData.email = email;
    }

    RootStore.cartStore.setFields('showPlaceOrderModal', true);
  };

  const moveFromWishlist = (item: any) => {
    console.log('moveFromWishlist', item);

    const moveToData = new FormData();
    moveToData.append('user_id', userId);
    moveToData.append('to_table', 'cart');
    moveToData.append('from_table', 'wishlist');
    moveToData.append('id', item.cart_wish_id);

    RootStore.cartStore.moveProductToCartWishlist(moveToData);
  };

  const moveFromCart = async (item: any) => {
    console.log('moveFromCart', item);

    const moveToData1 = new FormData();
    moveToData1.append('user_id', userId);
    moveToData1.append('to_table', 'wishlist');
    moveToData1.append('from_table', 'cart');
    moveToData1.append('id', item.cart_wish_id);

    RootStore.cartStore.moveProductToCartWishlist(moveToData1);
  };

  const handleScroll = (value: boolean) => hideButtonsOnScroll(value);

  return (
    <>
      <ScrollView
        // onMomentumScrollBegin={() => handleScroll(true)}
        // onMomentumScrollEnd={() => handleScroll(false)}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        style={styles.scrollStyle}
        contentContainerStyle={styles.contentContainerStyle}>
        <>
          {RootStore.cartStore.isCartApiLoading ? (
            <LoadingComponent />
          ) : cartData.length > 0 ? (
            <>
              {cartData.map((item, index) => {
                return (
                  <CartWishlistItem
                    key={`cart-${index}`}
                    item={item}
                    onPressEdit={() => null}
                    onPressMoveTo={(item: string, index: number) =>
                      RootStore.cartStore.selectedCartWishlistTabIndex == 0
                        ? moveFromCart(item)
                        : moveFromWishlist(item)
                    }
                    onPressDelete={() => null}
                  />
                );
              })}
            </>
          ) : (
            <NoDataFoundComponent />
          )}
        </>
      </ScrollView>

      {cartData.length > 0 && !hideButtons && (
        <View style={styles.btnContainer}>
          <PressableComponent
            btnType={PRESSABLE_BTN_TYPE.PRIMARY}
            text={strings.cartSummary}
            containerStyle={styles.btn}
            pressableStyle={styles.btn}
            onPress={onPressCartWeight}
            isLoading={RootStore.cartStore.isCartWeightApiLoading}
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

      {RootStore.cartStore.showCartWeightModal && (
        <CartWeightModal
          isModalVisible={RootStore.cartStore.showCartWeightModal}
          setModalVisible={() => {
            RootStore.cartStore.setFields('showCartWeightModal', false);
          }}
          data={RootStore.cartStore.cartWeightData}
        />
      )}

      {RootStore.cartStore.showPlaceOrderModal && (
        <PlaceOrderModal
          isModalVisible={RootStore.cartStore.showPlaceOrderModal}
          setModalVisible={() => {
            RootStore.cartStore.setFields('showPlaceOrderModal', false);
          }}
          userDetails={userData}
        />
      )}
    </>
  );
});

export default Cart;
