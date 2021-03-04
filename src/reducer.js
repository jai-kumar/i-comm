export const initialState = {
  basket: [],
  products: []
};

export const getBasketTotal = (basket) => 
  basket?.reduce((amount, item) => amount + item.price, 0);

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item]
      }

    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex(basketItem => basketItem.id == action.id);
      let newBasket = [...state.basket];
      if(index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove product (id: ${action.id}) as its not in basket!`);
      }
      return {
        ...state,
        basket: newBasket
      }

    case 'SET_USER':
      return {
        ...state,
        user: action.user
      }

    case 'LOAD_PRODUCTS':
      return {
        ...state,
        products: action.products
      }
  
    default:
      return {
        ...state
      }
      break;
  }
}