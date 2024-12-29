import {makeAutoObservable} from 'mobx';
import axios from 'axios';
import {urls} from '../network/urls';
import {showToast} from '../utils/helper';

const header = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
};
export class CartStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  isCartApiLoading = false;
  cartData = [];
  isWishlistApiLoading = false;
  wishlistData = [];
  isCartSummaryApiLoading = false;
  cartSummaryData = {};
  isCartWeightApiLoading = false;
  cartWeightData = [];
  showCartWeightModal = false;
  isPlaceOrderFromCartApiLoading = false;
  showPlaceOrderModal = false;
  isMoveProductApiLoading = false;
  selectedCartWishlistTabIndex = 0;
  isDeleteCartWishlistItemApiLoading = false;

  setFields(eName, data) {
    this[eName] = data;
  }

  resetFields() {
    this.isCartApiLoading = false;
    this.cartData = [];
    this.isWishlistApiLoading = false;
    this.wishlistData = [];
    this.isCartSummaryApiLoading = false;
    this.cartSummaryData = {};
    this.isCartWeightApiLoading = false;
    this.cartWeightData = [];
    this.showCartWeightModal = false;
    this.isPlaceOrderFromCartApiLoading = false;
    this.showPlaceOrderModal = false;
    this.isMoveProductApiLoading = false;
    this.selectedCartWishlistTabIndex = 0;
    this.isDeleteCartWishlistItemApiLoading = false;
  }

  // cart api
  getCartDataApi = data => {
    console.log('getCartData', data);

    if (this.isCartApiLoading) {
      return true;
    }
    this.setFields('isCartApiLoading', true);
    this.setFields('cartData', []);

    axios
      .post(urls.CartData.url, data, header)
      .then(res => {
        console.log('getCartData', res.data);

        if (res.data.ack === '1') {
          this.setFields('cartData', res.data.data);
        }
        this.setFields('isCartApiLoading', false);
      })
      .catch(function (error) {
        this.setFields('isCartApiLoading', false);
        console.log('error', error);
      });
  };

  // wishlist api
  getWishlistDataApi = data => {
    console.log('getWishlistDataApi', data);

    if (this.isWishlistApiLoading) {
      return true;
    }
    this.setFields('isWishlistApiLoading', true);
    this.setFields('wishlistData', []);

    axios
      .post(urls.CartData.url, data, header)
      .then(res => {
        console.log('getWishlistDataApi', res.data);

        if (res.data.ack === '1') {
          this.setFields('wishlistData', res.data.data);
        }
        this.setFields('isWishlistApiLoading', false);
      })
      .catch(function (error) {
        console.log('error', error);
        this.setFields('isWishlistApiLoading', false);
      });
  };

  // cart weight api
  getCartWeightApi = data => {
    console.log('getCartWeightApi', data);

    if (this.isCartWeightApiLoading) {
      return true;
    }
    this.setFields('isCartWeightApiLoading', true);

    axios
      .post(urls.CartWeight.url, data, header)
      .then(res => {
        console.log('getCartWeightApi', res.data);

        if (res.data.ack === '1') {
          this.setFields('cartWeightData', res.data.data);
          this.setFields('showCartWeightModal', true);
        } else {
          showToast({title: res?.data?.msg});
        }
        this.setFields('isCartWeightApiLoading', false);
      })
      .catch(function (error) {
        showToast({title: error});
        this.setFields('isCartWeightApiLoading', false);
      });
  };

  // place order from cart api
  placeOrderFromCartApi = data => {
    console.log('placeOrderFromCartApi', data);

    if (this.isPlaceOrderFromCartApiLoading) {
      return true;
    }
    this.setFields('isPlaceOrderFromCartApiLoading', true);

    axios
      .post(urls.PlaceOrderFromCart.url, data, header)
      .then(res => {
        console.log('placeOrderFromCartApi', res.data);

        if (res.data.ack === '1') {
          showToast({title: res?.data?.msg, type: 'success'});
        } else {
          showToast({title: res?.data?.msg});
        }
        this.setFields('isPlaceOrderFromCartApiLoading', false);
        this.setFields('showPlaceOrderModal', false);
        this.callCartWishlistApis();
      })
      .catch(function (error) {
        showToast({title: error});
        this.setFields('isPlaceOrderFromCartApiLoading', false);
      });
  };

  // move Product To Cart Wishlist api
  moveProductToCartWishlist = data => {
    console.log('moveProductToCartWishlist', data);

    if (this.isMoveProductApiLoading) {
      return true;
    }
    this.setFields('isMoveProductApiLoading', true);

    axios
      .post(urls.MoveProduct.url, data, header)
      .then(res => {
        console.log('moveProductToCartWishlist', res.data);

        if (res.data.ack === '1') {
          showToast({title: res?.data?.msg, type: 'success'});
        } else {
          showToast({title: res?.data?.msg});
        }
        this.setFields('isMoveProductApiLoading', false);
        this.callCartWishlistApis();
      })
      .catch(function (error) {
        showToast({title: error});
        this.setFields('isMoveProductApiLoading', false);
      });
  };

  // move Product To Cart Wishlist api
  deleteCartWishListProduct = data => {
    console.log('deleteCartWishListProduct', data);

    if (this.isDeleteCartWishlistItemApiLoading) {
      return true;
    }
    this.setFields('isDeleteCartWishlistItemApiLoading', true);

    axios
      .post(urls.DeleteFromCartWishList.url, data, header)
      .then(res => {
        console.log('deleteCartWishListProduct', res.data);

        if (res.data.ack === '1') {
          showToast({title: res?.data?.msg, type: 'success'});
        } else {
          showToast({title: res?.data?.msg});
        }
        this.setFields('isDeleteCartWishlistItemApiLoading', false);
        this.callCartWishlistApis();
      })
      .catch(function (error) {
        showToast({title: error});
        this.setFields('isDeleteCartWishlistItemApiLoading', false);
      });
  };

  callCartWishlistApis = id => {
    const cartParams = new FormData();
    cartParams.append('user_id', id || this.rootStore.appStore.userId);
    cartParams.append('table', 'cart');

    this.getCartDataApi(cartParams);

    const wishlistParams = new FormData();
    wishlistParams.append('user_id', id || this.rootStore.appStore.userId);
    wishlistParams.append('table', 'wishlist');

    this.getWishlistDataApi(wishlistParams);
  };

  callCartSumaryApi = id => {
    const params = new FormData();
    params.append('user_id', id || this.rootStore.appStore.userId);
    this.getCartWeightApi(params);
  };
}

export default CartStore;
