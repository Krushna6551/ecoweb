import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/home';
import AllProduct from './components/allProduct';
import ProductDetail from './components/ProductDetail';
import ProductByCategory from './components/ProductByCategory';
import Cart from './components/Cart';

const App = () => {
  return (
    <Router>
      <div style={{ background: 'darkgray' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<AllProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products/category/:category" element={<ProductByCategory />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
