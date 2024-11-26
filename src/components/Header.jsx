import React from 'react';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='d-flex justify-content-between align-items-center py-2 px-5 m-0 border-1 border border-black bg-dark text-white'>
      <div className='h1 m-0 p-0 fw-bolder'>
        <Link to="/" className='text-white text-decoration-none'>DUMMY_JSON</Link>
      </div>
      <div className='d-flex justify-content-around align-items-center w-50 h4 m-0'>
        <Link to="/" className='text-white text-decoration-none d-flex align-items-center'>HOME</Link>
        <Link to="/cart" className='text-white text-decoration-none d-flex align-items-center'>Cart</Link>
      </div>
    </div>
  );
};

export default Header;
