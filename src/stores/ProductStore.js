import {makeAutoObservable, runInAction} from 'mobx';
import axios from 'axios';
import {urls} from '../network/urls';
import {showToast} from '../utils/helper';
import {strings} from '../utils/strings';
import RootStore from './RootStore';

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
  isProductListApiError = false;
  productListData = [];
  isSortByParamsApiLoading = false;
  sortByParamsData = [];
  isFilterByParamsApiLoading = false;
  filterByParamsData = {};
  isAddProductToWishlistApiLoading = false;
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
  isSearchByCodeApiLoading = false;
  SearchByCodeData = [];
  isProductSearchApiLoading = false;
  selectedProductName = '';

  isProductUpdatedForCart = false;
  addProductToCartData = null;

  isProductUpdatedForPlusOne = false;
  addRemoveProductToCartByOneData = null;

  isProductUpdatedForWishlist = false;
  addProductToWishlistData = null;

  isProductUpdated = false;

  setFields(eName, data) {
    this[eName] = data;
  }

  resetFields() {
    this.isProductListApiLoading = false;
    this.isProductListApiError = false;
    this.productListData = [];
    this.isSortByParamsApiLoading = false;
    this.sortByParamsData = [];
    this.isFilterByParamsApiLoading = false;
    this.filterByParamsData = {};
    this.isAddProductToWishlistApiLoading = false;
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
    this.isSearchByCodeApiLoading = false;
    this.SearchByCodeData = [];
    this.isProductSearchApiLoading = false;
    this.selectedProductName = '';

    this.isProductUpdatedForCart = false;
    this.addProductToCartData = null;

    this.isProductUpdatedForPlusOne = false;
    this.addRemoveProductToCartByOneData = null;

    this.isProductUpdatedForWishlist = false;
    this.addProductToWishlistData = null;

    this.isProductUpdated = false;
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
        if (res.data.ack === '1') {
          const {products} = res.data?.data;
          this.setFields('productListData', products);
        } else {
          this.setFields('productListData', []);
          showToast({title: res?.data?.msg});
        }
        this.setFields('isProductListApiLoading', false);
      })
      .catch(error => {
        console.log('error', error);
        this.setFields('isProductListApiLoading', false);
        this.setFields('isProductListApiError', true);
        showToast({title: JSON.stringify(error)});
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
      .catch(error => {
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
      .catch(error => {
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
    this.setFields('isProductUpdatedForWishlist', false);
    this.setFields('isProductUpdatedForPlusOne', false);
    this.setFields('isProductUpdatedForCart', false);

    axios
      .post(urls.addToCartWishlist.url, data, header)
      .then(res => {
        if (res.data.ack === '1') {
          showToast({type: 'success', title: res.data?.msg});
          this.setFields('isProductUpdatedForWishlist', true);
          this.setFields('addProductToWishlistData', res.data);
        } else {
          showToast({title: res.data?.msg});
          this.setFields('isProductUpdatedForWishlist', false);
          this.setFields('addProductToWishlistData', null);
        }
        this.setFields('isAddProductToWishlistApiLoading', false);
      })
      .catch(error => {
        showToast({title: strings.globalErrorMsg});
        this.setFields('isProductUpdatedForWishlist', false);
        this.setFields('isAddProductToWishlistApiLoading', false);
        this.setFields('addProductToWishlistData', null);
      });
  };

  // add to cart api
  addProductToCart = data => {
    if (this.isAddProductToCartApiLoading) {
      return true;
    }
    this.setFields('isAddProductToCartApiLoading', true);
    this.setFields('isProductUpdatedForCart', false);
    this.setFields('isProductUpdatedForPlusOne', false);
    this.setFields('isProductUpdatedForWishlist', false);

    axios
      .post(urls.addToCartWishlist.url, data, header)
      .then(res => {
        if (res.data.ack === '1') {
          this.setFields('isProductUpdatedForCart', true);
          this.setFields('addProductToCartData', res.data);

          showToast({type: 'success', title: res.data?.msg});
        } else {
          showToast({title: res.data?.msg});
          this.setFields('isProductUpdatedForCart', false);
          this.setFields('addProductToCartData', null);
        }
        this.setFields('isAddProductToCartApiLoading', false);
      })
      .catch(error => {
        showToast({title: strings.globalErrorMsg});
        this.setFields('isProductUpdatedForCart', false);
        this.setFields('isAddProductToCartApiLoading', false);
        this.setFields('addProductToCartData', null);
      });
  };

  // add to cart by one  api
  addRemoveProductToCartByOne = data => {
    if (this.isAddRemoveToCartByOneCartApiLoading) {
      return true;
    }
    this.setFields('isAddRemoveToCartByOneCartApiLoading', true);
    this.setFields('isProductUpdatedForPlusOne', false);
    this.setFields('isProductUpdatedForCart', false);
    this.setFields('isProductUpdatedForWishlist', false);

    axios
      .post(urls.addToCartGridAdd.url, data, header)
      .then(res => {
        console.log('addProductToCartPlusOne res', res.data);

        if (res.data.ack === '1') {
          this.setFields('isProductUpdatedForPlusOne', true);
          this.setFields('addRemoveProductToCartByOneData', res.data);
          showToast({type: 'success', title: res.data?.msg});
        } else {
          showToast({title: res.data?.msg});
          this.setFields('isProductUpdatedForPlusOne', false);
          this.setFields('addRemoveProductToCartByOneData', null);
        }
        this.setFields('isAddRemoveToCartByOneCartApiLoading', false);
      })
      .catch(error => {
        showToast({title: strings.globalErrorMsg});
        this.setFields('isProductUpdatedForPlusOne', false);
        this.setFields('isAddRemoveToCartByOneCartApiLoading', false);
        this.setFields('addRemoveProductToCartByOneData', null);
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
      .catch(error => {
        showToast({title: JSON.stringify(error)});
        this.isApplyFilterApiLoading = false;
        this.isProductUpdated = false;
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
      .catch(error => {
        showToast({title: JSON.stringify(error)});
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
      .catch(error => {
        showToast({title: JSON.stringify(error)});
        this.setFields(
          isAddToCart
            ? 'isAddToCartFromDetailsLoading'
            : 'isAddToWishlistFromDetailsLoading',
          false,
        );
      });
  };

  // Search by code api
  getSearchByCodeApi = data => {
    console.log('getSearchByCodeApi', data);

    if (this.isSearchByCodeApiLoading) {
      return true;
    }
    this.setFields('isSearchByCodeApiLoading', true);

    axios
      .post(urls.SearchByCodeGrid.url, data, header)
      .then(res => {
        console.log('getSearchByCode', res.data);

        if (res.data.ack === '1') {
          const {products} = res.data?.data;
          this.setFields('SearchByCodeData', products);
          this.setFields('productListData', products);
          RootStore.homeStore.setFields('isSearchByCodeModalVisible', false);
          RootStore.homeStore.setFields('isSearchModalVisible', false);
          RootStore.appStore.handleScreenNavigation('ProductList', {
            gridData: products,
            title: products?.col_name || '',
            isFromSearch: true,
          });
        } else {
          this.setFields('SearchByCodeData', []);
          showToast({title: res?.data?.msg});
        }
        this.setFields('isSearchByCodeApiLoading', false);
      })
      .catch(error => {
        console.log('error', error);
        runInAction(() => {
          this.SearchByCodeData = [];
          this.isSearchByCodeApiLoading = false;
        });
        showToast({title: JSON.stringify(error)});
      });
  };

  getProductSearchApi = data => {
    console.log('getProductSearchApi', data);

    if (this.isProductSearchApiLoading) {
      return true;
    }
    this.setFields('isProductSearchApiLoading', true);

    axios
      .post(urls.SearchGrid.url, data, header)
      .then(res => {
        console.log('getSearchByCode', res.data);

        if (res.data.ack === '1') {
          const {products} = res.data?.data;
          this.setFields('productListData', products);

          RootStore.homeStore.setFields('isSearchModalVisible', false);
          RootStore.appStore.handleScreenNavigation('ProductList', {
            gridData: products,
            title: products?.col_name || '',
            isFromSearch: true,
          });
        } else {
          showToast({title: res?.data?.msg});
        }
        this.setFields('isProductSearchApiLoading', false);
      })
      .catch(error => {
        console.log('error', error);
        runInAction(() => {
          this.isProductSearchApiLoading = false;
        });
        showToast({title: JSON.stringify(error)});
      });
  };
}

export default ProductStore;
