import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const [data, setData] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasFetched) return;
    setHasFetched(true);

    fetch('https://dummyjson.com/products/category-list')
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(error => console.error(error));
  }, [hasFetched]);

  const handleCategoryClick = (category) => {
    navigate(`/products/category/${category}`); 
  };

  return (
    <ul className='border border-black border-1 list-unstyled h4 px-3 py-2 text-white bg-secondary'>
      {data.map((category, index) => (
        <li key={index} className='border border-black border-3 d-flex align-items-center m-2 p-2 bg-black'>
          <button
            onClick={() => handleCategoryClick(category)}
            className='text-white text-decoration-none d-flex align-items-center btn btn-link'>
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Category;
