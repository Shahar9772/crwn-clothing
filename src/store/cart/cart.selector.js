import { createSelector } from 'reselect';

import {
  CartCount,
  CartTotal,
} from '../../utils/reducer/cart/cart.reducer.utils';

const selectCartReducer = (state) => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  CartCount(cartItems)
);
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  CartTotal(cartItems)
);
