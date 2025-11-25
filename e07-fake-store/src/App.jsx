import React from 'react';
import ReactDOM from 'react-dom/client';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import axios from 'axios';
import { loadProducts } from './productSlice.js';
import { addProduct, removeProduct } from './cartSlice.js';
import './App.css';


function ProductsList() {
  const products = useSelector(state => state.products.products);
  const dispatch = useDispatch();

  return (
    <div className="products-container">
      <h2>Products</h2>

      <div className="products-grid">
        {products.map(p => {
          const words = p.description.split(' ');
          const shortDesc = words.slice(0, 25).join(' ');
          const hasMore = words.length > 25;

          return (
            <div className="product-card" key={p.id}>
              <img src={p.image} />

              <p className="product-title">{p.title}</p>
              <p className="product-price">{p.price} €</p>
              
              <p className="product-description">
                {shortDesc}
                {hasMore && ' ...'}
              </p>
              
              <p className="product-category">{p.category}</p>

              <button className="buy" onClick={() => dispatch(addProduct(p))}>Buy</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};


function Cart() {
  const cartList = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  const priceList = cartList.map(p => (p.price * p.quantity))
  const totalPrice = priceList.reduce(getTotal, 0);
  function getTotal(total, num) {
    return total + num
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      <div className="cart-list">
        {cartList.length === 0 && (
          <p className="empty-cart">Your cart is empty</p>
        )}

        {cartList.map(p => (
          <div className="cart-row" key={p.id}>
            <img src={p.image} className="cart-image" />

            <div className="cart-info">
              <p className="cart-title">{p.title}</p>
              <p className="cart-price">{p.price} € x {p.quantity}</p>
            </div>
            
            <button className="remove" onClick={() => dispatch(removeProduct(p.id))}>x</button>
          </div>
        ))}
      </div>

      <p className="total-line">Total: {totalPrice.toFixed(2)} €</p>
    </div>
  );
}


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
    .get('https://fakestoreapi.com/products')
    .then(response => {
      dispatch(loadProducts(response.data))
    }).catch(err => {
      console.log(err);
    });
  }, [])

  return (
    <div className="app-container">
      <ProductsList />
      <Cart />
    </div>
  )
}


export default App
