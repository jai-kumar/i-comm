import React, { useState, useEffect } from 'react'
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const getClientSecret = async () => {
      console.log('amt: ',getBasketTotal(basket) * 100);
      const response = await axios({
        method: 'POST',
        url: `/payments/create?total=${(getBasketTotal(basket) * 100)}`
      })
      // .then(response => setClientSecret(response.data.clientSecret))
      // .catch(e => console.error(e));

      setClientSecret(response.data.clientSecret);
    }
    console.log('user: ',user);
    getClientSecret();
  }, [basket])

  console.log('the secret is -> ',clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {//
      // paymentIntent  is payment confirmation
      db.collection('users')
      .doc(user?.uid)
      .collection('orders')
      .doc(paymentIntent.id)
      .set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created
      })


      setSucceeded(true);
      setError(null);
      setProcessing(false);

      console.log('paymentIntent:',paymentIntent);
      
      history.replace('/orders');
    }).catch(e => {
      console.error(e);
      setError(e);
    })
  }

  const handleChange = e => {
    //listen for changes in the card element
    //and display any error as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  }

  return (
    <div className="payment">
      <h1>
        Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
      </h1>
      <div className="payment__container">
        {/* payment section - Delivery Address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* payment section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket?.map((item,idx) => (
              <CheckoutProduct
                key={item.id+idx}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>

        {/* payment section - Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange}/>
                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={(value) => (
                      <h3>Order Total: {value}</h3>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  <button disabled={processing || disabled || succeeded}>
                    <span>
                      {processing ? 
                        <p>Processing</p> : 
                        "Buy Now"
                      }
                    </span>
                  </button>
                </div>

                {error && <div>{error}</div>}
              </form>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default Payment
