// reducers.js
const initialState = {
    products: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS':
        return {
          ...state,
          products: action.payload,
        };
      case 'ADD_PRODUCT':
        return {
          ...state,
          products: [action.payload, ...state.products],
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  