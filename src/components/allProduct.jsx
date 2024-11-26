import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../reducer/addToCart';

const AllProduct = () => {
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=0')
      .then(response => response.json())
      .then(json => {
        setData(json.products);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleToggleView = () => {
    setShowAll(prevState => !prevState);
  };

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const handleImageClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container my-4">
      <h2>All item</h2>
      <div className="row">
        {data.slice(0, showAll ? data.length : 30).map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
                onClick={() => handleImageClick(item.id)}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">${item.price}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="btn btn-primary w-100"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleToggleView}
        className="btn btn-success w-100 mt-4"
      >
        {showAll ? 'View Less Products' : 'View All Products'}
      </button>
    </div>
  );
};

export default AllProduct;
