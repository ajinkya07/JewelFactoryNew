//import liraries
import React, {Component, useEffect, useState} from 'react';
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
import CartWishlistItem from '../components/CartWishlistItem/CartWishlistItem';
import NoDataFoundComponent from '../../../components/NoDataFoundComponent/NoDataFoundComponent';
import TopTab from '../components/Tabs/Tabs';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../components/PressableComponent/PressableComponent';
import {strings} from '../../../utils/strings';
import CartWeightModal from '../components/CartWeightModal/CartWeightModal';
import PlaceOrderModal from '../components/PlaceOrderModal/PlaceOrderModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderComponent from '../../../components/Header/HeaderComponent';

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

  const handleScroll = (value: boolean) => hideButtonsOnScroll(value);

  return (
    <SafeAreaView style={styles.container}>
      <>
        <HeaderComponent showAppIcon={true} isBack={false} />
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
            {/* <TopTab /> */}

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
                      onPressMoveTo={() => null}
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
      </>

      <CartWeightModal
        isModalVisible={RootStore.cartStore.showCartWeightModal}
        setModalVisible={() => {
          RootStore.cartStore.setFields('showCartWeightModal', false);
        }}
        data={RootStore.cartStore.cartWeightData}
      />

      <PlaceOrderModal
        isModalVisible={RootStore.cartStore.showPlaceOrderModal}
        setModalVisible={() => {
          RootStore.cartStore.setFields('showPlaceOrderModal', false);
        }}
        userData={userData}
      />
    </SafeAreaView>
  );
});

export default Cart;
