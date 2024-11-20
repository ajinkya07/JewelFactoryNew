import AppStore from './AppStore';
import LoginStore from './LoginStore';
class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
  }
}

export default new RootStore();
