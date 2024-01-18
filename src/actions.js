// actions.js
export const fetchProducts = (products) => ({
    type: 'FETCH_PRODUCTS',
    payload: products,
  });
  
  export const addProduct = (product) => ({
    type: 'ADD_PRODUCT',
    payload: product,
  });
  