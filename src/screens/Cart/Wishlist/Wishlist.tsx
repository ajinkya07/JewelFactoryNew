import React, {useEffect, useState} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {styles} from './Wishlist.styles';
import {observer} from 'mobx-react';
import RootStore from '../../../stores/RootStore';
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent';
import CartWishlistItem from '../components/CartWishlistItem/CartWishlistItem';
import NoDataFoundComponent from '../../../components/NoDataFoundComponent/NoDataFoundComponent';

const Wishlist = observer((props: any) => {
  const userId = RootStore.appStore.userId;
  const wishlistData = RootStore.cartStore.wishlistData;

  useEffect(() => {
    wishlistData.length === 0 ? callApis() : null;
  }, []);

  const callApis = () => {
    RootStore.cartStore.callCartWishlistApis(userId);
  };

  const onRefresh = () => {
    callApis();
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        style={styles.scrollStyle}
        contentContainerStyle={styles.contentContainerStyle}>
        <>
          {RootStore.cartStore.isCartApiLoading ? (
            <LoadingComponent />
          ) : wishlistData.length > 0 ? (
            <>
              {wishlistData.map((item, index) => {
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
    </>
  );
});

export default Wishlist;
