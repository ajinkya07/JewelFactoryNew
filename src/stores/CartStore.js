import {makeAutoObservable} from 'mobx';
import axios from 'axios';
import {urls} from '../network/urls';
import {isDefined, showToast} from '../utils/helper';

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

  setFields(eName, data) {
    this[eName] = data;
  }

  resetFields() {
    this.isCartApiLoading = false;
    this.cartData = [];
    this.isWishlistApiLoading = false;
    this.wishlistData = [];
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
          showToast({title: res?.data?.msg});
          this.setFields('cartData', []);
        }
        this.setFields('isCartApiLoading', false);
      })
      .catch(function (error) {
        console.log('error', error);
        showToast({title: error});
        this.setFields('isCartApiLoading', false);
        this.setFields('cartData', []);
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
}

export default CartStore;
