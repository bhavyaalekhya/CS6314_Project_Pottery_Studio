import React, { useState, useEffect } from 'react';
import '../../css/ShoppingPage.css';
import { useNavigate } from 'react-router-dom';

function ShoppingPage({ type, products }) {
    const API_URL = "http://localhost:5000/dashboard";
    const [uniqueData, setUniqueData] = useState({});
    const [filteredItems, setFilteredItems] = useState([]);
    const navigate = useNavigate();

    console.log("Selected Type: " + type);

    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                const groupedData = data.reduce((acc, item) => {
                    const type = item.type;
                    if (!acc[type]) {
                        acc[type] = [];
                    }
                    acc[type].push(item);
                    return acc;
                }, {});
                setUniqueData(groupedData);
            });
    }, [API_URL]);
    
    useEffect(() => {
        if (products) {
            setFilteredItems(products);
        }
    }, [products]);

    const handleProductClick = (item) => {
        navigate(`/product/${item.productId}`);
    };

    // Function to check if the image path is valid
    const isValidImagePath = (item) => {
        return item.image && item.image.path && item.image.path !== ".undefined";
    };

    
    return (
        <div className="shoppingI-container">
            <div className="shopping-container">
                <div className="grid-container">
                    {filteredItems.map(item => (
                        <div className="grid-item" key={item.id} onClick={() => handleProductClick(item)}>
                            <div className='row'>
                                {console.log("Image: " + item.image.path)}
                                {isValidImagePath(item) ? (
                                    <img src={item.image.path} alt={item.name} style={{ cursor: 'pointer' }} />
                                ) : (
                                    <div>No Image Available</div>
                                )}
                            </div>
                            <div className='row'>
                                <p>{item.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ShoppingPage;
