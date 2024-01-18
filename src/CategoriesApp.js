// CategoriesApp.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoriesApp = () => {

    useEffect(() => {
        console.log('CategoriesApp mounted');
        return () => {
            console.log('CategoriesApp unmounted');
        };
    }, []);

    return (
        <div>
            <header>
                <h1>Categories App</h1>
                <Link to="/products">Go to Products App</Link>
            </header>
            <main>
                <h2>Categories</h2>
                <ul>
                    <li>
                        <Link to="/subcategories/category1">Category 1</Link>
                    </li>
                    <li>
                        <Link to="/subcategories/category2">Category 2</Link>
                    </li>
                    {/* Add more categories as needed */}
                </ul>
            </main>
        </div>
    );
};

export default CategoriesApp;
