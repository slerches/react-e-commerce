import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let userInfo = localStorage.getItem('userInfo');
if (userInfo) {
  userInfo = JSON.parse(userInfo);
  store.dispatch({ type: 'SET_USER_INFO', payload: userInfo });
  let carts = localStorage.getItem('carts');
  if (carts) {
    store.dispatch({ type: 'SET_CART_ID', payload: localStorage.getItem('cart_id') });
    carts = JSON.parse(carts);
    carts.map(cart => {
      if (cart.discounted_price > 0) cart.price = cart.discounted_price;
      store.dispatch({ type: 'ADD_TO_CART', payload: cart })
    })
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
