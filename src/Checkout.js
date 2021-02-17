import React from 'react';
import './Checkout.css';
import Subtotal from "./Subtotal";
import { useStateValue } from './StateProvider';

function Checkout() {
  const [{basket}, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img 
          className="checkout__ad"
          src="https://m.media-amazon.com/images/G/31/prime/Pay/LPA/WelcomePackNew/HO_Welcome_Pack_Desktop_New._CB406238166_.jpg"
        />
        <div>
          <h2 className="checkout__title">Your Shopping Basket</h2>
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal items={basket} />
      </div>
    </div>
  )
}

export default Checkout
