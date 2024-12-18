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
export class MenuStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  isExclusiveDataApiLoading = false;
  exclusiveData = {};

  setFields(eName, data) {
    this[eName] = data;
  }

  resetFields() {
    this.isExclusiveDataApiLoading = false;
    this.exclusiveData = {};
  }

  exclusiveDataApi = data => {
    console.log('exclusiveDataApi', data);

    if (this.isExclusiveDataApiLoading) {
      return true;
    }
    this.setFields('isExclusiveDataApiLoading', true);

    axios
      .post(urls.Exclusive.url, data, header)
      .then(res => {
        console.log('exclusiveDataApires', res.data);

        if (res.data.ack === '1') {
          this.setFields('exclusiveData', res.data);
        }
        showToast({title: res.data.msg});
        this.setFields('isExclusiveDataApiLoading', false);
        this.rootStore.appStore.handleScreenNavigationGoBack();
      })
      .catch(function (error) {
        console.log('error', error);
        showToast({title: error});
        this.setFields('isExclusiveDataApiLoading', false);
        this.rootStore.appStore.handleScreenNavigationGoBack();
      });
  };
}

export default MenuStore;
