import React from 'react'
import './Home.css';
import Product from './Product';
import ProductsList from "./components/ProductsList";

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
          <Product 
            id="1"
            title="The Lean Startup"
            price={29.99}
            image="https://images-eu.ssl-images-amazon.com/images/I/41Q419CMtfL._AC_UL160_.jpg"
            rating={5}
          />
          <Product 
            id="2"
            title="EaglesFord SZ Crafts Vintage Wooden Multipurpose Folding Rack/Plant Stand with 3 Decks"
            price={363.00}
            image="https://images-na.ssl-images-amazon.com/images/I/71eZQpAUHLL._SX679_.jpg"
            rating={3}
          />
        </div>

        <div className="home__row">
          <Product
            id="3"
            image="data:image/webp;base64,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"
            title="HP Pavilion Gaming 9th Gen Intel Core i5 Processor 15.6-inch Laptop (Core i5-9300H/8GB/512GB SSD/Windows 10 Home/4GB NVIDIA GeForce GTX 1650 Graphics/Shadow Black), 15-dk0268tx"
            price={59990.00}
            rating={4}
          />
          <Product
            id="4"
            image="https://images-na.ssl-images-amazon.com/images/I/81-Y7h5n31L._SX679_.jpg"
            price={1900.00}
            rating={4}
            title="JBL Go 2 Portable Waterproof Bluetooth Speaker with mic (Deep Sea Blue)"
          />
          <Product 
            id="5"
            image="https://images-na.ssl-images-amazon.com/images/I/51t4-8LoWEL._SX679_.jpg"
            price={5524.15}
            rating={3}
            title="Honor ES Watch AMOLED Touch Display 95 Workout Modes, Automatic Workout Recognition, 12 Animated Workout Courses, Fast Charge, SpO2"
          />
        </div>

        <div className="home__row">
          <Product
            id="6"
            image="https://images-na.ssl-images-amazon.com/images/I/81qtALn%2BGpL._SX679_.jpg"
            price={15999.00}
            rating={3}
            title="OnePlus Y Series 80 cm (32 inches) HD Ready LED Smart Android TV 32Y1 (Black) (2020 Model)"
          />
        </div>

        <div className="home__productList">
          <ProductsList />
        </div>
      </div>
    </div>
  )
}

export default Home
