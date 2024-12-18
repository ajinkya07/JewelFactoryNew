import { colors } from "../../../../utils/colors";
import IconPack from "../../../../utils/IconPack";
import { strings } from "../../../../utils/strings";
import Cart from "../../Cart/Cart";
import Wishlist from "../../Wishlist/Wishlist";

export const getCartWishlistTabs = () => {
  return {
    cart: {
      name: strings.cart,
      key: 'cart',
      component: Cart,
      source: IconPack.CART
    },
    wishlist: {
      name: strings.wishlist,
      key: 'wishlist',
      component: Wishlist,
      source: IconPack.WISHLIST_EMPTY
    }
  }
}

