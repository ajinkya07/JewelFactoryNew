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
export class MenuStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  isExclusiveDataApiLoading = false;
  exclusiveData = {};
  isEditModalVisible = false;
  isResidentialModalVisible = false;
  isStateListApiLoading = false;
  isCityListApiLoading = false;
  isUpdateProfileApiLoading = false;
  updateProfileData = {};
  residentialData = null;

  setFields(eName, data) {
    this[eName] = data;
  }

  resetFields() {
    this.isExclusiveDataApiLoading = false;
    this.exclusiveData = {};
    this.isEditModalVisible = false;
    this.isResidentialModalVisible = false;
    this.isStateListApiLoading = false;
    this.isCityListApiLoading = false;
    this.isUpdateProfileApiLoading = false;
    this.updateProfileData = {};
    this.residentialData = null;
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

  getStateList = data => {
    console.log('getStateList', data);
    if (this.isStateListApiLoading) {
      return true;
    }
    this.setFields('isStateListApiLoading', true);

    axios
      .post(urls.GetStateList.url, data, header)
      .then(res => {
        if (isDefined(res?.data)) {
          this.setFields('allParameterData', res.data);
        } else {
          showToast({title: res?.data?.msg});
        }
        this.setFields('isStateListApiLoading', false);
      })
      .catch(function (error) {
        console.log('error', error);
        showToast({title: error});
        this.setFields('isStateListApiLoading', false);
      });
  };

  getCityList = data => {
    console.log('getCityList', data);
    if (this.isCityListApiLoading) {
      return true;
    }
    this.setFields('isCityListApiLoading', true);

    axios
      .post(urls.GetCityList.url, data, header)
      .then(res => {
        if (isDefined(res?.data)) {
          this.setFields('allParameterData', res.data);
        } else {
          showToast({title: res?.data?.msg});
        }
        this.setFields('isCityListApiLoading', false);
      })
      .catch(function (error) {
        console.log('error', error);
        showToast({title: error});
        this.setFields('isCityListApiLoading', false);
      });
  };

  updateProfileApi = data => {
    console.log('updateProfileApi', data);

    if (this.isUpdateProfileApiLoading) {
      return true;
    }
    this.setFields('isUpdateProfileApiLoading', true);

    axios
      .post(urls.UpdateProfile.url, data, header)
      .then(res => {
        console.log('updateProfileApires', res.data);

        if (res.data.ack === '1') {
          this.setFields('updateProfileData', res.data);
          showToast({title: res.data.msg});
        }

        this.setFields('isUpdateProfileApiLoading', false);
      })
      .catch(error => {
        console.log('error', error);
        showToast({title: error});
        this.setFields('isUpdateProfileApiLoading', false);
      });
  };
}

export default MenuStore;
