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
export class ProductStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  isProductListApiLoading = false;
  productListData = [];

  setFields(eName, data) {
    this[eName] = data;
    console.log(eName, data);
  }

  resetFields() {
    this.isProductListApiLoading = false;
    this.productListData = [];
  }

  getProductListApi = data => {
    console.log('getProductListApi', data);

    if (this.isProductListApiLoading) {
      return true;
    }
    this.setFields('isProductListApiLoading', true);

    axios
      .post(urls.ProductGrid.url, data, header)
      .then(res => {
        console.log('getProductList', res.data);

        if (res.data.ack === '1') {
          const {products} = res.data?.data;
          this.setFields('productListData', products);
        } else {
          this.setFields('productListData', []);
          showToast({title: res?.data?.msg});
        }
        this.setFields('isProductListApiLoading', false);
      })
      .catch(function (error) {
        console.log('error', error);
        this.setFields('productListData', []);

        showToast({title: error});
        this.setFields('isProductListApiLoading', false);
      });
  };
}

export default ProductStore;
