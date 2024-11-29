import AppStore from './AppStore';
import LoginStore from './LoginStore';
class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.loginStore = new LoginStore(this);
  }
}

export default new RootStore();
