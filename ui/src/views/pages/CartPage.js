import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import '../../css/CartPage.css';
import { CartContext } from '../../context/CartContext'; 
import { AuthContext } from "../../context/authContext.js";

function CartPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems: initialCartItems, clearCart, removeFromCart, updateOnCheckOut } = useContext(CartContext);
    const [cartItems, setCartItems] = useState(initialCartItems || []);

    useEffect(() => {
        setCartItems(initialCartItems);
    }, [initialCartItems]);

    const handleRemoveItem = (productId) => {
        removeFromCart(productId);
        setCartItems(currentItems => currentItems.filter(item => item.productId !== productId));
    };

    const handleCheckOut = (cartItems) => {
        alert("You have successfully checked out");
        updateOnCheckOut(cartItems);
        clearCart();
        navigate('/');
    };

    const handleCancel = () => {
        clearCart();
        navigate('/shop');
    };

    const handleBack = () => {
        navigate('/shop');
    }

    console.log("CartItems " + cartItems);

    return (
        <div className='cart-container'>
            <div className='row'>
                <h1 className='title'>Shopping Cart</h1>
                <h2 className='price'>Total Price: ${cartItems.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}</h2>
                <div className='cart-items'>
                    { cartItems && cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <div key={item.id}>
                                <div className='row'>
                                    <div className='col item-image'>
                                        <img src={item.image?.path} alt={item.image?.description}></img>
                                    </div>
                                    <div className='col'>
                                        <div className='row item-details'>
                                            <p>{item.name}</p>
                                            <p className="cart-item">Quantity: {item.quantity}</p>
                                            <p className='cart-price'>Price Per Item: ${item.price}</p>
                                            {console.log(item.productId)}
                                            <button className="btn btn-primary btn-item" onClick={() => handleRemoveItem(item.productId)}>Delete Item</button>
                                        </div>
                                    </div>
                                </div>
                                {index < cartItems.length - 1 && <hr />}
                            </div>
                        ))
                        ) : (
                            <p className="cart-item">
                                No items in the cart! Continue Shopping <br/>
                                <a href='/shop' onClick={() => navigate('/shop')}>Back to Shopping</a>
                            </p>
                        )
                    }
                </div>
            </div>
            <div className='checkout-container row'>
                <div className='col-sm-4'>
                    <button className='btn btn-primary btn-lg checkout-btn' onClick={() => handleCheckOut(cartItems)}>Checkout</button>
                </div>
                <div className='col-sm-4'>
                    <button className='btn btn-danger btn-lg cancel-btn' onClick={handleCancel}>Cancel Order</button>
                </div>
                <div className='col-sm-4'>
                    <button className='btn btn-primary btn-lg back-btn' onClick={handleBack}>Continue Shopping</button>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
