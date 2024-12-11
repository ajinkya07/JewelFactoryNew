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
        } else {
          this.setFields('cartData', []);
        }
        this.setFields('isCartApiLoading', false);
      })
      .catch(function (error) {
        this.setFields('isCartApiLoading', false);
        this.setFields('cartData', []);

        console.log('error', error);
        showToast({title: error});
      });
  };

  // wishlist api
  getWishlistDataApi = data => {
    console.log('getWishlistDataApi', data);

    if (this.isWishlistApiLoading) {
      return true;
    }
    this.setFields('isWishlistApiLoading', true);

    axios
      .post(urls.CartData.url, data, header)
      .then(res => {
        console.log('getWishlistDataApi', res.data);

        if (res.data.ack === '1') {
          this.setFields('wishlistData', res.data.data);
        } else {
          showToast({title: res?.data?.msg});
        }
        this.setFields('isWishlistApiLoading', false);
      })
      .catch(function (error) {
        console.log('error', error);
        showToast({title: error});
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
        this.callCartSumaryApi();
      })
      .catch(function (error) {
        showToast({title: error});
        this.setFields('isPlaceOrderFromCartApiLoading', false);
      });
  };

  callCartWishlistApis = id => {
    const cartParams = new FormData();
    cartParams.append('user_id', id);
    cartParams.append('table', 'cart');

    this.getCartDataApi(cartParams);

    const wishlistParams = new FormData();
    wishlistParams.append('user_id', id);
    wishlistParams.append('table', 'wishlist');

    this.getWishlistDataApi(wishlistParams);
  };

  callCartSumaryApi = id => {
    const params = new FormData();
    params.append('user_id', id);
    this.getCartWeightApi(params);
  };
}

export default CartStore;
