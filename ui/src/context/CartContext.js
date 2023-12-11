import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './authContext';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const { currentUser } = useContext(AuthContext);

    console.log("UserName" + currentUser.username);

    // Load cart from the DB when the user logs in or on initial load
    useEffect(() => {
        const fetchCartInfo = async () => {
    
            try {
                const response = await fetch(`http://localhost:5000/api/users/${currentUser.username}/cartInfo`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCartItems(data.cart);
                console.log("User cart " + JSON.stringify(cartItems));
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };
    
        fetchCartInfo();
    }, [currentUser]);
    
    const addToCart = async (product, quantity) => {
        let newCartItems = cartItems || []; // Initializes newCartItems with cartItems or an empty array if cartItems is undefined
    
        // Find the index of the product in the cart
        const existingProductIndex = newCartItems.findIndex(item => item.productId === product.productId);
    
        if (existingProductIndex !== -1) {
            // Product exists in the cart, update its quantity and total price
            newCartItems = newCartItems.map((item, index) => {
                if (index === existingProductIndex) {
                    const updatedQuantity = Number(item.quantity) + Number(quantity);
                    return { ...item, quantity: updatedQuantity, totalPrice: updatedQuantity * item.price };
                }
                return item;
            });
        } else {
            // Product does not exist in the cart, add it as a new item with total price
            newCartItems = [...newCartItems, { ...product, quantity, totalPrice: quantity * product.price }];
        }
        
        // Calculate the total price for all products in the cart
        const totalCartPrice = newCartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    
        setCartItems(newCartItems);
        console.log("New Cart: " + JSON.stringify(newCartItems));
        console.log("Total Cart Price: " + totalCartPrice);
    };    
    

    const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.filter(item => item.productId !== productId);
        setCartItems(updatedCartItems);// Function to update the cartInfo in the database
    };

    const clearCart = () => {
        setCartItems([]);// Function to update the cartInfo in the database
    };

    const updateOnCheckOut = async (cartItems) => {
        try {
            const response = await fetch('http://localhost:5000/dashboard/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            const productsFromApi = await response.json();
    
            const updatedQuantities = cartItems.map(item => {
                const productFromApi = productsFromApi.find(p => p._id === item._id);
                if (!productFromApi) {
                    throw new Error(`Product with ID ${item.productId} not found in API`);
                }
                return {
                    _id: item._id,
                    productId: item.productId,
                    description: item.description,
                    name: item.name,
                    count: productFromApi.count - item.quantity,
                    type: item.type,
                    price: item.price,
                    imgPath: item.image.path,
                    imgDescription: item.image.description
                };
            });
    
            await Promise.all(updatedQuantities.map(async (item) => {
                console.log(item.imgPath);
                const updateResponse = await fetch(`http://localhost:5000/dashboard/${item._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        description: item.description,
                        name: item.name,
                        count: item.count,
                        type: item.type,
                        price: item.price,
                        imgPath: item.imgPath,
                        imgDescription: item.imgDescription
                    })
                });
                if (!updateResponse.ok) {
                    throw new Error(`Error updating product with ID ${item._id}`);
                }    
            }));
    
            console.log('All products updated successfully');
        } catch (error) {
            console.error('Failed to update products:', error);
        }
    }
    
    

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateOnCheckOut }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
