import { CART_ACTION_TYPES } from './cart.types';

import {
  addCartItem,
  removeCartItem,
  clearCartItem,
} from '../../utils/reducer/cart/cart.reducer.utils';

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    case CART_ACTION_TYPES.ADD_CART_ITEM:
      return { ...state, cartItems: addCartItem(state.cartItems, payload) };
    case CART_ACTION_TYPES.REMOVE_CART_ITEM:
      return { ...state, cartItems: removeCartItem(state.cartItems, payload) };
    case CART_ACTION_TYPES.CLEAR_CART_ITEM:
      return { ...state, cartItems: clearCartItem(state.cartItems, payload) };
    case CART_ACTION_TYPES.CLEAR_CART:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
