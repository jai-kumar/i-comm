import React from 'react'
import './Home.css';
import Product from './Product';

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img 
          src="https://www.yayindia.com/sites/default/files/styles/featured/public/post/images/2020/07/17/amazon_slashes_prime_membership_price_bank_holiday_sale_thumb800_1.jpg?itok=stXBAC67" 
          alt="" 
          className="home__image" 
        />

        <div className="home__row">
          <Product />
        </div>

        <div className="home__row">
          
        </div>

        <div className="home__row">
          
        </div>
      </div>
    </div>
  )
}

export default Home
