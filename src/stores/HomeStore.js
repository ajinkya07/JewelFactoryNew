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
  homepageData = [];
  basePath = '';
  carouselData = [];
  collectionData = [];
  finalCollectionData = [];
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

  setFields(eName, data) {
    this[eName] = data;
    console.log(eName, data);
  }

  resetFields() {
    this.isHomeApiLoading = false;
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

    isAllParametersApiLoading = false;
    allParameterData = {};
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
      .catch(function (error) {
        console.log('error', error);
        showToast({title: error});
        this.setFields('isHomeApiLoading', false);
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
        console.log('allParameters', res.data);

        if (isDefined(res?.data)) {
          this.setFields('allParameterData', res.data);
        } else {
          showToast({title: res?.data?.msg});
        }
        this.setFields('isAllParametersApiLoading', false);
      })
      .catch(function (error) {
        console.log('error', error);
        showToast({title: error});
        this.setFields('isAllParametersApiLoading', false);
      });
  };
}

export default HomeStore;
