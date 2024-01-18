// ProductList.js
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct } from './actions';
import Modal from 'react-modal';
import useLazyLoad from './useLazyLoad';
import useProductListCache from './useProductListCache';
import './App.css';

Modal.setAppElement('#root'); // Set the root element for the modal

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const [loading, setLoading] = useState(true);

    const { cachedProducts, isLoading } = useProductListCache();


    //   const { data: products, loading, revalidate } = useProductListCache('productList');

    useEffect(() => {
        dispatch(fetchProducts(products));
    }, [dispatch, products]);



    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({ title: '', price: '', imageUrl: '' });

    const handleCancel = () => {
        // Close the modal and reset input fields
        setModalIsOpen(false);
        setNewProduct({ title: '', price: '', imageUrl: '' });

        if (loading) {
            return <p>Loading...</p>;
        }
    };


    const columns = [
        {
            Header: 'Image',
            accessor: 'thumbnail',
            Cell: ({ cell: { value } }) => {
                const imageRef = useRef(null);
                const { isVisible, isLoading } = useLazyLoad(imageRef);
                const [loading, setLoading] = useState(true);

                return (
                    <div
                        ref={imageRef}
                        style={{
                            width: '50px',
                            height: '50px',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {isLoading && (
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: '#f0f0f0', // Placeholder background color
                                }}
                            >
                                Loading...
                            </div>
                        )}

                        <img
                            src={isVisible ? value : ''}
                            alt="Product Thumbnail"
                            style={{
                                width: '100%',
                                height: '100%',
                                opacity: isVisible ? 1 : 0,
                                transition: 'opacity 0.5s ease-in-out',
                            }}
                            onLoad={() => setLoading(false)}
                        />
                    </div>
                );
            },
        },
        // ... (other columns)
    ];



    useEffect(() => {
        // Fetch products and dispatch the action
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                dispatch(fetchProducts(data.products));
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleAddProduct = () => {

        if (!newProduct.title || !newProduct.price) {
            alert('Please enter both Title and $Price');
            return;
        }
        // Dispatch action to add the new product
        dispatch(addProduct(newProduct));

        // Close the modal and reset input fields
        setModalIsOpen(false);
        setNewProduct({ title: '', price: '', imageUrl: '' });
    };

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        const lastPage = Math.ceil(products.length / productsPerPage);
        if (currentPage < lastPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        const lastPage = Math.ceil(products.length / productsPerPage);
        setCurrentPage(lastPage);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Product List</h1>
                <h3>Total Products: {products.length}</h3>
                <button onClick={() => setModalIsOpen(true)}>Add Product</button>
            </header>

            <table style={{ width: '100%' }}>

                <tbody className="product-list">
                    {currentProducts.map((product) => (
                        <tr className="product" key={product.id}>
                            <td className="product img"><img src={product.thumbnail} alt={product.title} style={{ width: '75px', height: '75px' }} /></td>
                            <td className="product title">{product.title}</td>
                            <td className="product price">${product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <button onClick={handleFirstPage} disabled={currentPage === 1}>
                    First
                </button>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous

                </button>

                {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                    <button key={index + 1} style={{ fontWeight: index + 1 === currentPage ? 'bold' : 'normal' }} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                        {index + 1}
                    </button>
                ))}
                <button onClick={handleNextPage} disabled={currentPage === Math.ceil(products.length / productsPerPage)}>
                    Next
                </button>
                <button onClick={handleLastPage} disabled={currentPage === Math.ceil(products.length / productsPerPage)}>
                    Last
                </button>
            </div>

            {/* Modal for adding a new product */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCancel}
                contentLabel="Add New Product"
                className="ReactModal__Content" // Apply the modal content style
                overlayClassName="ReactModal__Overlay" // Apply the modal overlay style
            >
                <h2>Add New Product</h2>
                <label>Title: <input type="text" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} /></label>
                <br />
                <label>Price: <input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} /></label>
                <br />
                <label>Image URL: <input type="text" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} /></label>
                <br />
                <button onClick={handleAddProduct}>Add Product</button>
                <button onClick={handleCancel}>Cancel</button>
            </Modal>
        </div>
    );
};

export default ProductList;
