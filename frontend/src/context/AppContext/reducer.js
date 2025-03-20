export const initialState = {
    products: [],
    cart: [],
    category: "",
    search: "",
    cartVisible: false,
    isLoggedIn: false
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case "SET_PRODUCTS":
        return {
          ...state,
          products: Array.isArray(action.payload) ? action.payload : [],
        };
      case "SET_CATEGORY":
        return { ...state, category: action.payload };
      case "SEARCH_PRODUCT":
        return { ...state, search: action.payload };
      case "TOGGLE_CART":
        return { ...state, cartVisible: !state.cartVisible };
      case "ADD_TO_CART":
        return { ...state, cart: [...state.cart, action.payload] };
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload),
        };
      default:
        return state;
    }
  };
  