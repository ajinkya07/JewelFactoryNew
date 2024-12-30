import {makeAutoObservable, runInAction} from 'mobx';
import axios from 'axios';
import {urls} from '../network/urls';
import {isDefined, showToast} from '../utils/helper';
import {strings} from '../utils/strings';

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
  isSortByParamsApiLoading = false;
  sortByParamsData = [];
  isFilterByParamsApiLoading = false;
  filterByParamsData = {};
  isAddProductToWishlistApiLoading = false;
  isProductUpdated = false;
  isAddProductToCartApiLoading = false;
  isAddRemoveToCartByOneCartApiLoading = false;
  minGrossWeight = '';
  maxGrossWeight = '';
  minNetWeight = '';
  maxNetWeight = '';
  minPrice = '';
  maxPrice = '';
  isApplyFilterApiLoading = false;
  isProductDetailsApiLoading = false;
  productDetailsData = {};
  isAddToCartFromDetailsLoading = false;
  isAddToWishlistFromDetailsLoading = false;

  setFields(eName, data) {
    this[eName] = data;
  }

  resetFields() {
    this.isProductListApiLoading = false;
    this.productListData = [];
    this.isSortByParamsApiLoading = false;
    (this.sortByParamsData = []), (this.isFilterByParamsApiLoading = false);
    this.filterByParamsData = {};
    this.isAddProductToWishlistApiLoading = false;
    this.isProductUpdated = false;
    this.isAddProductToCartApiLoading = false;
    this.isAddRemoveToCartByOneCartApiLoading = false;
    this.minGrossWeight = '';
    this.maxGrossWeight = '';
    this.minNetWeight = '';
    this.maxNetWeight = '';
    this.minPrice = '';
    this.maxPrice = '';
    this.isApplyFilterApiLoading = false;
    this.isProductDetailsApiLoading = false;
    this.productDetailsData = {};
    this.isAddToCartFromDetailsLoading = false;
    this.isAddToWishlistFromDetailsLoading = false;
  }

  // product list api
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
        runInAction(() => {
          this.productListData = [];
          this.isProductListApiLoading = false;
        });
        showToast({title: strings.globalErrorMsg});
      });
  };

  // sort by parameters api
  getSortByParameters = data => {
    if (this.isSortByParamsApiLoading) {
      return true;
    }
    this.setFields('isSortByParamsApiLoading', true);

    axios
      .post(urls.sortByParams.url, data, header)
      .then(res => {
        if (res.data.ack === '1') {
          this.setFields('sortByParamsData', res.data.data);
        } else {
          this.setFields('sortByParamsData', []);
        }
        this.setFields('isSortByParamsApiLoading', false);
      })
      .catch(function (error) {
        this.setFields('sortByParamsData', []);
        this.setFields('isSortByParamsApiLoading', false);
      });
  };

  // filter parameters api
  getFilterByParameters = data => {
    if (this.isFilterByParamsApiLoading) {
      return true;
    }
    this.setFields('isFilterByParamsApiLoading', true);

    axios
      .post(urls.FilterParams.url, data, header)
      .then(res => {
        if (res.data.ack === '1') {
          this.setFields('filterByParamsData', res.data.data);
        } else {
          this.setFields('filterByParamsData', []);
        }
        this.setFields('isFilterByParamsApiLoading', false);
      })
      .catch(function (error) {
        this.setFields('filterByParamsData', []);
        this.setFields('isFilterByParamsApiLoading', false);
      });
  };

  // add to wishlist api
  addProductToWishlist = data => {
    if (this.isAddProductToWishlistApiLoading) {
      return true;
    }
    this.setFields('isAddProductToWishlistApiLoading', true);
    this.setFields('isProductUpdated', false);

    axios
      .post(urls.addToCartWishlist.url, data, header)
      .then(res => {
        if (res.data.ack === '1') {
          showToast({type: 'success', title: res.data?.msg});
          this.setFields('isProductUpdated', true);
        } else {
          showToast({title: res.data?.msg});
          this.setFields('isProductUpdated', false);
        }
        this.setFields('isAddProductToWishlistApiLoading', false);
      })
      .catch(function (error) {
        showToast({title: res.data?.msg});
        this.setFields('isProductUpdated', false);
        this.setFields('isAddProductToWishlistApiLoading', false);
      });
  };

  // add to cart api
  addProductToCart = data => {
    console.log('addProductToCart', data);

    if (this.isAddProductToCartApiLoading) {
      return true;
    }
    this.setFields('isAddProductToCartApiLoading', true);
    this.setFields('isProductUpdated', false);

    axios
      .post(urls.addToCartWishlist.url, data, header)
      .then(res => {
        console.log('addProductToCart res', res.data);

        if (res.data.ack === '1') {
          this.setFields('isProductUpdated', true);
          showToast({type: 'success', title: res.data?.msg});
        } else {
          showToast({title: res.data?.msg});
          this.setFields('isProductUpdated', false);
        }
        this.setFields('isAddProductToCartApiLoading', false);
      })
      .catch(function (error) {
        showToast({title: res.data?.msg});
        this.setFields('isProductUpdated', false);
        this.setFields('isAddProductToCartApiLoading', false);
      });
  };

  // add to cart by one  api
  addRemoveProductToCartByOne = data => {
    console.log('addProductToCartPlusOne', data);

    if (this.isAddRemoveToCartByOneCartApiLoading) {
      return true;
    }
    this.setFields('isAddRemoveToCartByOneCartApiLoading', true);
    this.setFields('isProductUpdated', false);

    axios
      .post(urls.addToCartGridAdd.url, data, header)
      .then(res => {
        console.log('addProductToCartPlusOne res', res.data);

        if (res.data.ack === '1') {
          this.setFields('isProductUpdated', true);
          showToast({type: 'success', title: res.data?.msg});
        } else {
          showToast({title: res.data?.msg});
          this.setFields('isProductUpdated', false);
        }
        this.setFields('isAddRemoveToCartByOneCartApiLoading', false);
      })
      .catch(function (error) {
        showToast({title: res.data?.msg});
        this.setFields('isProductUpdated', false);
        this.setFields('isAddRemoveToCartByOneCartApiLoading', false);
      });
  };

  // add to cart by one  api
  applyFilterProducts = data => {
    console.log('applyFilterProducts', data);

    if (this.isApplyFilterApiLoading) {
      return true;
    }
    this.setFields('isApplyFilterApiLoading', true);
    this.setFields('isProductUpdated', false);

    axios
      .post(urls.addToCartGridAdd.url, data, header)
      .then(res => {
        console.log('applyFilterProducts res', res.data);

        if (res.data.ack === '1') {
          this.setFields('isProductUpdated', true);
          showToast({type: 'success', title: res.data?.msg});
        } else {
          showToast({title: res.data?.msg});
          this.setFields('isProductUpdated', false);
        }
        this.setFields('isApplyFilterApiLoading', false);
      })
      .catch(function (error) {
        showToast({title: res.data?.msg});
        this.setFields('isProductUpdated', false);
        this.setFields('isApplyFilterApiLoading', false);
      });
  };

  // product Details Api  api
  productDetailsApi = data => {
    console.log('productDetailsApi', data);

    if (this.isProductDetailsApiLoading) {
      return true;
    }
    this.setFields('isProductDetailsApiLoading', true);

    axios
      .post(urls.ProductDetails.url, data, header)
      .then(res => {
        console.log('productDetailsApi res', res.data);

        if (res.data.ack === '1') {
          this.setFields('productDetailsData', res.data?.data[0]);
        } else {
          showToast({title: res.data?.msg});
        }
        this.setFields('isProductDetailsApiLoading', false);
      })
      .catch(function (error) {
        showToast({title: res.data?.msg});
        this.setFields('isProductDetailsApiLoading', false);
      });
  };

  // add to cart from details api
  addToCartFromDetailsApi = (data, isAddToCart) => {
    console.log('addToCartFromDetailsApi', data);

    if (
      this.isAddToCartFromDetailsLoading ||
      this.isAddToWishlistFromDetailsLoading
    ) {
      return true;
    }
    this.setFields(
      isAddToCart
        ? 'isAddToCartFromDetailsLoading'
        : 'isAddToWishlistFromDetailsLoading',
      true,
    );

    axios
      .post(urls.AddToCartFromDetails.url, data, header)
      .then(res => {
        console.log('addToCartFromDetailsApi res', res.data);

        if (res.data.ack === '1') {
          showToast({type: 'success', title: res.data?.msg});
        } else {
          showToast({title: res.data?.msg});
        }
        this.setFields(
          isAddToCart
            ? 'isAddToCartFromDetailsLoading'
            : 'isAddToWishlistFromDetailsLoading',
          false,
        );
      })
      .catch(function (error) {
        showToast({title: res.data?.msg});
        this.setFields(
          isAddToCart
            ? 'isAddToCartFromDetailsLoading'
            : 'isAddToWishlistFromDetailsLoading',
          false,
        );
      });
  };
}

export default ProductStore;
