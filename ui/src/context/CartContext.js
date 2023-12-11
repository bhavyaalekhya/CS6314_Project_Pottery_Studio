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
                const response = await fetch(`http://localhost:5000/api/users/${user.username}/cartInfo`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCartItems(data.cart);
                console.log("User cart" + JSON.stringify(cartItems));
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };
    
        fetchCartInfo();
    }, [user]);
    
    const updateCartInfoInDB = async (cart) => {
        if (!user) return;
        console.log("Cart Info in DB: " + cart);
        try {
            await fetch(`http://localhost:5000/api/users/${user.username}/cartInfo`, {
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
    
    const addToCart = (product, quantity) => {
        // Find the index of the product in the cart
        const existingProductIndex = cartItems.findIndex(item => item.productId === product.productId);
    
        let newCartItems;
    
        if (existingProductIndex !== -1) {
            // Product exists in the cart, update its quantity and total price
            newCartItems = cartItems.map((item, index) => {
                if (index === existingProductIndex) {
                    const updatedQuantity = Number(item.quantity) + Number(quantity);
                    return { ...item, quantity: updatedQuantity, totalPrice: updatedQuantity * item.price };
                }
                return item;
            });
        } else {
            // Product does not exist in the cart, add it as a new item with total price
            newCartItems = [...cartItems, { ...product, quantity, totalPrice: quantity * product.price }];
        }
    
        // Calculate the total price for all products in the cart
        const totalCartPrice = newCartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    
        setCartItems(newCartItems);
        console.log("New Cart: " + JSON.stringify(newCartItems));
        console.log("Total Cart Price: " + totalCartPrice);
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

    const updateOnCheckOut = async (cartItems) => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard`, {
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
                const productFromApi = productsFromApi.find(p => p.productId === item.productId);
                if (!productFromApi) {
                    throw new Error(`Product with ID ${item.productId} not found in API`);
                }
                return {
                    ...item,
                    quantity: productFromApi.quantity - item.quantity
                };
            });
    
            await Promise.all(updatedQuantities.map(async (item) => {
                const updateResponse = await fetch(`http://localhost:5000/dashboard/${item.productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quantity: item.quantity })
                });
                if (!updateResponse.ok) {
                    throw new Error(`Error updating product with ID ${item.productId}`);
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
