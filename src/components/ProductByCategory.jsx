import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductByCategory = () => {
  const { category } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); 

  useEffect(() => {
    setLoading(true);
   
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.products) {
          setProducts(data.products); 
        } else {
          setError('No products found for this category');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, [category]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container my-4">
      <button
        onClick={() => navigate(-1)} 
        className="btn btn-secondary mb-3"
      >
        Back
      </button>
      <h2>Products in Category: {category}</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-3 mb-4">
            <div className="card h-100">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
                onClick={() => navigate(`/product/${product.id}`)} 
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                <button className="btn btn-primary w-100">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductByCategory;
