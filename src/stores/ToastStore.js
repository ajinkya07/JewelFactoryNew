import {makeAutoObservable} from 'mobx';

export class ToastStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  emojiText = '🎊';
  titleText = '';
  descriptionText = '';
  isShowToast = false;
  duration = 3000;
  isBoldTitle = false;
  hasRightBtn = false;
  btnLabel = '';
  onBtnPress = () => {};
  isToastAvailable = true;

  setFields(eName, data) {
    this[eName] = data;
  }

  showToast(
    title,
    description,
    duration = 3000,
    emoji,
    isBoldTitle,
    btnConfig,
  ) {
    this.emojiText = emoji;
    this.titleText = title;
    this.descriptionText = description;
    this.duration = duration;
    this.isShowToast = true;
    this.isBoldTitle = isBoldTitle;

    //Button in toast
    if (btnConfig) {
      this.hasRightBtn = btnConfig.align === 'right';
      this.btnLabel = btnConfig.label;
      this.onBtnPress = btnConfig.onPress;
    }
  }

  setToastAvailable = value => {
    this.setFields('isToastAvailable', value);
  };

  resetFields() {
    this.isShowToast = false;
    this.duration = 3000;
    this.emojiText = '🎊';
    this.titleText = '';
    this.descriptionText = '';
    this.isBoldTitle = false;
    this.hasRightBtn = false;
    this.btnLabel = '';
    this.onBtnPress = () => {};
    isToastAvailable = true;
  }
}
export default ToastStore;
