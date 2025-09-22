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
export class HomeStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  isHomeApiLoading = false;
  isHomeApiError = false;
  homepageData = [];
  basePath = '';
  carouselData = [];
  collectionData = [];
  finalCollectionData = [];
  imagePath = {
    large_image: '',
    small_image: '',
    thumb_image: '',
    zoom_image: '',
  };
  searchCollectionData = [];

  isAllParametersApiLoading = false;
  allParameterData = {};
  isSearchModalVisible = false;
  isSearchByCodeModalVisible = false;
  isMeltingOptionsModalVisible = false;
  isAccordionModalVisible = false;
  isProductStatusModalVisible = false;
  productCategories = [];
  productStatus = '1';
  meltingOptions = [];
  isGetProfileApiLoading = false;
  getProfileData = [];
  setFields(eName, data) {
    this[eName] = data;
  }

  resetFields() {
    this.isHomeApiLoading = false;
    this.isHomeApiError = false;
    this.homepageData = [];
    this.basePath = '';
    this.carouselData = [];
    this.collectionData = [];
    this.finalCollectionData = [];
    this.finalCollectionData = [];
    this.imagePath = {
      large_image: '',
      small_image: '',
      thumb_image: '',
      zoom_image: '',
    };
    this.searchCollectionData = [];

    this.isAllParametersApiLoading = false;
    this.allParameterData = {};
    this.isSearchModalVisible = false;
    this.isSearchByCodeModalVisible = false;
    this.isMeltingOptionsModalVisible = false;
    this.isAccordionModalVisible = false;
    this.isProductStatusModalVisible = false;
    this.productCategories = [];
    this.productStatus = '1';
    this.meltingOptions = [];
    this.isGetProfileApiLoading = false;
    this.getProfileData = [];
  }

  getHomeDataApi = data => {
    console.log('getHomeDataApi', data);

    if (this.isHomeApiLoading) {
      return true;
    }
    this.setFields('isHomeApiLoading', true);

    axios
      .post(urls.HomePage.url, data, header)
      .then(res => {
        console.log('getHomeDataApi', res.data);

        if (res.data.ack === '1') {
          const {
            base_path,
            brand_banner,
            collection,
            final_collection,
            image_path,
            search_collection,
          } = res.data.data;
          this.setFields('homepageData', res.data?.data);
          this.setFields('basePath', base_path);
          this.setFields('carouselData', brand_banner);
          this.setFields('collectionData', collection);
          this.setFields('finalCollectionData', final_collection);
          this.setFields('imagePath', image_path);
          this.setFields('searchCollectionData', search_collection);
        } else {
          showToast({title: res?.data?.msg});
        }
        this.setFields('isHomeApiLoading', false);
      })
      .catch(error => {
        console.log('error', error);
        showToast({title: JSON.stringify(error)});
        this.setFields('isHomeApiLoading', false);
        this.setFields('isHomeApiError', true);
      });
  };

  getAllParameterApi = data => {
    console.log('getAllParameterApi', data);
    if (this.isAllParametersApiLoading) {
      return true;
    }
    this.setFields('isAllParametersApiLoading', true);

    axios
      .post(urls.AllParameter.url, data, header)
      .then(res => {
        console.log('getAllParameterApi', res?.data);

        if (isDefined(res?.data)) {
          this.setFields('allParameterData', res.data);
        } else {
          showToast({title: res?.data?.msg});
        }
        this.setFields('isAllParametersApiLoading', false);
      })
      .catch(error => {
        console.log('AllParameter error', error);
        showToast({title: JSON.stringify(error)});
        this.setFields('isAllParametersApiLoading', false);
      });
  };

  getProfilApi = data => {
    console.log('getProfilApi', data);
    if (this.isGetProfileApiLoading) {
      return true;
    }
    this.setFields('isGetProfileApiLoading', true);

    axios
      .post(urls.GetProfile.url, data, header)
      .then(res => {
        if (isDefined(res?.data)) {
          this.setFields('getProfileData', res.data?.data);
        } else {
          showToast({title: res?.data?.msg});
        }
        this.setFields('isGetProfileApiLoading', false);
      })
      .catch(error => {
        console.log('error', error);
        showToast({title: JSON.stringify(error)});
        this.setFields('isGetProfileApiLoading', false);
      });
  };
}

export default HomeStore;
