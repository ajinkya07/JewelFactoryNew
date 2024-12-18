import AppStore from './AppStore';
import CartStore from './CartStore';
import HomeStore from './HomeStore';
import LoginStore from './LoginStore';
import MenuStore from './MenuStore';
import ProductStore from './ProductStore';
class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.loginStore = new LoginStore(this);
    this.homeStore = new HomeStore(this);
    this.productStore = new ProductStore(this);
    this.cartStore = new CartStore(this);
    this.menuStore = new MenuStore(this);
  }
}

export default new RootStore();
