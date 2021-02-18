import React from 'react';
import './Checkout.css';
import Subtotal from "./Subtotal";
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import FlipMove from 'react-flip-move';

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img 
          className="checkout__ad"
          src="https://m.media-amazon.com/images/G/31/prime/Pay/LPA/WelcomePackNew/HO_Welcome_Pack_Desktop_New._CB406238166_.jpg"
        />
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>
          <FlipMove>
          {
            basket?.map((item, i) => <CheckoutProduct 
              key={i}
              id={item.id}
              image={item.image}
              price={item.price}
              rating={item.rating}
              title={item.title}
            />)
          }
          </FlipMove>
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
