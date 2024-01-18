// SubcategoriesApp.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const SubcategoriesApp = () => {
  const { category } = useParams();

  // Fetch subcategories based on the category parameter
  // Mock data for demonstration purposes
  const subcategories = ['Subcategory 1', 'Subcategory 2', 'Subcategory 3'];

  return (
    <div>
      <header>
        <h1>Subcategories App</h1>
        <Link to="/products">Go to Products App</Link>
      </header>
      <main>
        <h2>{`Subcategories for ${category}`}</h2>
        <ul>
          {subcategories.map((subcategory, index) => (
            <li key={index}>
              <Link to={`/products?subcategory=${subcategory}`}>{subcategory}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default SubcategoriesApp;
