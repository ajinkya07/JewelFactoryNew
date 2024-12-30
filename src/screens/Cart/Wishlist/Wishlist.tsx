import React, {useEffect} from 'react';
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
    callApis();
  }, []);

  const callApis = () => {
    RootStore.cartStore.callCartWishlistApis(userId);
  };

  const onRefresh = () => {
    callApis();
  };

  const moveFromWishlist = (item: any) => {
    const moveToData = new FormData();
    moveToData.append('user_id', userId);
    moveToData.append('to_table', 'cart');
    moveToData.append('from_table', 'wishlist');
    moveToData.append('id', item.cart_wish_id);

    RootStore.cartStore.moveProductToCartWishlist(moveToData);
  };

  const deleteCartWishlistItem = (item: any) => {
    const deleteData = new FormData();
    deleteData.append('user_id', userId);
    deleteData.append('table', 'wishlist');
    deleteData.append('id', item.cart_wish_id);

    RootStore.cartStore.deleteCartWishListProduct(deleteData);
  };

  const onPressEdit = () => {
    RootStore.appStore.setFields('isComingSoonVisible', true);
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
          {RootStore.cartStore.isWishlistApiLoading ? (
            <LoadingComponent />
          ) : wishlistData.length > 0 ? (
            <>
              {wishlistData.map((item, index) => {
                return (
                  <CartWishlistItem
                    key={`wishlist-${index}`}
                    item={item}
                    onPressEdit={() => onPressEdit()}
                    onPressMoveTo={() => moveFromWishlist(item)}
                    onPressDelete={() => deleteCartWishlistItem(item)}
                    isFromCart={false}
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
