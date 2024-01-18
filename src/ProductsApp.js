// ProductsApp.js
import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ProductList from './ProductList';
import CategoriesApp from './CategoriesApp';
import SubcategoriesApp from './SubcategoriesApp';

const ProductsApp = () => {
  return (
    <Router>
      <Switch>
        <Route path="/categories" component={CategoriesApp} />
        <Route path="/subcategories/:category" component={SubcategoriesApp} />
        <Route path="/products" component={ProductList} />
      </Switch>
    </Router>
  );
};

export default ProductsApp;
