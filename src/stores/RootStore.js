import AppStore from './AppStore';
import HomeStore from './HomeStore';
import LoginStore from './LoginStore';
class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.loginStore = new LoginStore(this);
    this.homeStore = new HomeStore(this);
  }
}

export default new RootStore();
