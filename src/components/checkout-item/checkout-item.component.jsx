import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, quantity, price } = cartItem;

  const { clearItemFromCart, removeItemFromCart, addItemToCart } =
    useContext(CartContext);

  const removeItemHandler = () => removeItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const clearItemHandler = () => clearItemFromCart(cartItem);

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <button
          className='arrow'
          disabled={quantity === 1}
          onClick={removeItemHandler}
        >
          &#10094;
        </button>
        <span className='value'>{quantity}</span>
        <button className='arrow' onClick={addItemHandler}>
          &#10095;
        </button>
      </span>
      <span className='price'>{price}</span>
      <span>
        <div className='remove-button' onClick={clearItemHandler}>
          &#10005;
        </div>
      </span>
    </div>
  );
};

export default CheckoutItem;
