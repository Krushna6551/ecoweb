import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setProduct(data);
        } else {
          setError('Product not found');
        }
      })
      .catch(error => {
        console.error(error);
        setError('Failed to fetch product');
      });
  }, [id]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const renderRatingStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} className="text-warning" />);
      } else {
        stars.push(<FaStar key={i} className="text-muted" />);
      }
    }
    return stars;
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded">
            <img
              src={product.images[0]}
              alt={product.title}
              className="card-img-top"
              style={{ objectFit: 'contain', height: '400px', borderRadius: '10px' }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-4 shadow-lg border-0 rounded" style={{ backgroundColor: '#f8f9fa' }}>
            <h2 className="fw-bold">{product.title}</h2>
            <p className="text-muted">{product.category}</p>

            <div className="d-flex align-items-center mb-3">
              <h4 className="text-primary">${product.price}</h4>
              <span className="ms-3 text-success">
                {product.discountPercentage}% OFF
              </span>
            </div>

            <div className="mb-3">
              <h5 className="d-inline">Rating:</h5>
              <div className="ms-2">{renderRatingStars(product.rating)}</div>
            </div>

            <div className="mb-3">
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Stock:</strong> {product.stock} available</p>
              <p><strong>Weight:</strong> {product.weight} grams</p>
              <p><strong>Dimensions:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} mm</p>
              <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
            </div>

            <button className="btn btn-primary w-100 py-2 mt-3 rounded-pill shadow-sm hover-effect">
              Add to Cart
            </button>

            <div className="mt-3">
              <p><strong>Availability:</strong> {product.availabilityStatus}</p>
              <p><strong>Shipping Info:</strong> {product.shippingInformation}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5">
        <h4 className="mb-3">Customer Reviews</h4>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="border rounded p-3 mb-3 shadow-sm">
              <div className="d-flex justify-content-between">
                <h5>{review.reviewerName}</h5>
                <div className="text-warning">{renderRatingStars(review.rating)}</div>
              </div>
              <p>{review.comment}</p>
              <small className="text-muted">{new Date(review.date).toLocaleDateString()}</small>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
