import { colors } from "../../../../utils/colors";
import { strings } from "../../../../utils/strings";
import Cart from "../../Cart/Cart";
import Wishlist from "../../Wishlist/Wishlist";

export const getCartWishlistTabs = [{
  cart: {
    name: strings.cart,
    key: 'cart',
    component: Cart,
    backgroundColor: colors.brandColor,

  },
  wishlist: {
    name: strings.wishlist,
    key: 'wishlist',
    component: Wishlist,
    backgroundColor: colors.black,
  },
}]


