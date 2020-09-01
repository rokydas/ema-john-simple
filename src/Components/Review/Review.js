import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const placeOrder = () => {
        setCart([]);
        processOrder();
        setOrderPlaced(true);
    }

    let thankYou;
    thankYou = <img src={happyImage}></img>

    useEffect(() => {
        const savedCart = getDatabaseCart();
        setCart(savedCart);
        const productKeys = Object.keys(savedCart);
        const counts = Object.values(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            return product;
        })

        // console.log(cartProducts);

        for (let i = 0; i < cartProducts.length; i++) {
            cartProducts[i].count = counts[i];
        }

        // console.log(cartProducts);

        setCart(cartProducts);


        // // const counts = productKeys.map(key => savedCart[key])
        // console.log(productKeys);
        // console.log(counts);
    }, [])

    const removeItem = (key) => {
        const newCart = cart.filter(pd => key !== pd.key)
        setCart(newCart);
        removeFromDatabaseCart(key);
    }


    return (
        <div >
            {
                orderPlaced && thankYou
            }
            {
                !orderPlaced &&
                <div className="shop-container">
                    <div className="product-container">
                    {
                        cart.map(product => <ReviewItem removeItem={removeItem} key={product.key} data={product}></ReviewItem>)
                    }
                    </div>
                    <div className="cart-container">
                        <Cart cart={cart}>
                            <button onClick={placeOrder} className="cart-button">Place order</button>
                        </Cart>
                    </div>
                </div>
            }
        </div>
    );
};

export default Review;