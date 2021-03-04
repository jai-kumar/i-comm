import { useState, useEffect } from 'react'
import { useStateValue } from '../StateProvider';
import axios from '../axios';
import Product from '../Product';

function ProductsList() {
  const [{ products }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllProducts = async () => {
      // console.log('isLoading: ',loading);
      await axios({
        method: 'GET',
        url: `/products`
      })
      .then(response => {
        setLoading(false);
        dispatch({
          type: 'LOAD_PRODUCTS',
          products: response.data.products || []
        });
        // console.log('after isLoading: ',loading);
      })
      .catch(e => console.error(e));
    }
    
    getAllProducts();
  }, []);

  // console.log('product list rendering...', products);

  return (
    <>
      { loading ? 
        <div className="loading">Loading...</div>
          :
        products.map((p, idx) => {
          return <Product
            key={parseInt(p.id)+idx}
            id={p.id}
            image={p.image}
            price={p.price}
            rating={p.rating}
            title={p.title}
          />
        })
      }
    </>
  )
}

export default ProductsList
