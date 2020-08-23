import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price;
    }

    let shipping = 0;
    if(total > 100){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 10.99;
    }
    console.log(cart);
    return (
        <div>
            <h5>Order Summary: {cart.length}</h5>
            <p>Items Ordered: {cart.length}</p>
            <p>Shipping Cost: {shipping}</p>
            <p>Total Price: {total + shipping}</p>
            
            
        </div>
    );
};

export default Cart;