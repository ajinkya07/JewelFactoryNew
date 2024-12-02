import AppStore from './AppStore';
import HomeStore from './HomeStore';
import LoginStore from './LoginStore';
import ProductStore from './ProductStore';
class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.loginStore = new LoginStore(this);
    this.homeStore = new HomeStore(this);
    this.productStore = new ProductStore(this);
  }
}

export default new RootStore();
