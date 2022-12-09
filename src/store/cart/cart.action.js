import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

export const setIsCartOpen = (bool) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addCartItem = (item) =>
  createAction(CART_ACTION_TYPES.ADD_CART_ITEM, item);

export const removeCartItem = (item) =>
  createAction(CART_ACTION_TYPES.REMOVE_CART_ITEM, item);

export const clearCartItem = (item) =>
  createAction(CART_ACTION_TYPES.CLEAR_CART_ITEM, item);
