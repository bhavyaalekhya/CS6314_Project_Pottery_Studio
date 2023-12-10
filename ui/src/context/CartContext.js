import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(null); // Assuming you have a way to identify the current user

    // Load cart from the DB when the user logs in or on initial load
    useEffect(() => {
        const fetchCartInfo = async () => {
            if (!user) return;
    
            try {
                const response = await fetch(`http://localhost:5000/api/users/${user.id}/cart`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCartItems(data.cart);
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };
    
        fetchCartInfo();
    }, [user]);
    

    const addToCart = (product, quantity) => {
        const newCartItems = [...cartItems, { ...product, quantity }];
        setCartItems(newCartItems);
        updateCartInfoInDB(newCartItems); // Function to update the cartInfo in the database
    };

    const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.filter(item => item.productId !== productId);
        setCartItems(updatedCartItems);
        updateCartInfoInDB(updatedCartItems); // Function to update the cartInfo in the database
    };

    const clearCart = () => {
        setCartItems([]);
        updateCartInfoInDB([]); // Function to update the cartInfo in the database
    };

    const updateCartInfoInDB = async (cart) => {
        if (!user) return;
    
        try {
            await fetch(`http://localhost:5000/api/users/${user.id}/cart`, {
                method: 'PUT', // or 'POST', depending on your API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cart })
            });
        } catch (error) {
            console.error("Error updating cart in DB:", error);
        }
    };
    

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
