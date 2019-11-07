import { createStore } from "redux";

const initialState = {
  products: [],
  totalProducts: 0,
  itemsPerPage: 11,
  category_id: 0,
  categories: [],
  isLoggedIn: false,
  userInfo: {},
  totalCost: 0,
  quantity: 0,
  cart_id: '',
  shopcart: []
};

const reducer = (state = initialState, action) => {
  let currentState;
  let qty = 0;
  switch (action.type) {
    case "UPDATE_PRODUCT_LIST":
      currentState = { ...state };
      currentState.totalProducts = action.payload.count / state.itemsPerPage;
      currentState.products = action.payload.rows;
      if (action.payload.category_id !== undefined) {
        currentState.category_id = action.payload.category_id;
      }
      return currentState;

    case "SET_CATEGORIES_PAGE_NAMES":
      currentState = { ...state };
      currentState.categories = action.payload;
      return currentState;

    case "SET_USER_INFO":
      return Object.assign({}, { ...state, userInfo: action.payload, isLoggedIn: true });

    case "TOTAL_COST":
      return Object.assign({}, { ...state, totalCost: action.payload });

    case "DECREASE_QTY":
      currentState = { ...state };
      let d = currentState.shopcart[action.payload].quantity - 1;
      if (d <= 0) return state;
      currentState.totalCost -= Number(currentState.shopcart[action.payload].price);
      currentState.shopcart[action.payload].quantity = d
      currentState.quantity--;
      return Object.assign({}, { ...currentState });

    case "INCREASE_QTY":
      currentState = { ...state };
      let q = currentState.shopcart[action.payload].quantity + 1;
      currentState.totalCost += Number(currentState.shopcart[action.payload].price);
      currentState.shopcart[action.payload].quantity = q;
      currentState.quantity++;
      return Object.assign({}, { ...currentState });

    case "ADD_TO_CART":
      let shop = [...state.shopcart];
      shop.push(action.payload);
      return Object.assign({}, { ...state, shopcart: shop, quantity: state.quantity + 1, totalCost: state.totalCost + Number(action.payload.price) });

    case "SET_CART_ID":
      return Object.assign({}, { ...state, cart_id: action.payload });

    case "REMOVE_CART":
      let qty = state.quantity;
      let total = state.totalCost;
      let shopcart = state.shopcart.filter(item => {
        if (item.product_id == action.payload) {
          qty -= item.quantity;
          total -= (item.price * item.quantity);
        }
        return item.product_id !== action.payload
      });
      return Object.assign({}, { ...state, shopcart: shopcart, quantity: qty, totalCost: total });

    case "EMPTY_CART":
      localStorage.removeItem('carts')
      localStorage.removeItem('cart_id');
      return Object.assign({}, { ...state, shopcart: [], quantity: 0, totalCost: 0 });
    case "LOGUT":
      currentState = { ...state };
      currentState.userInfo = {};
      currentState.isLoggedIn = false;
      return currentState;
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
