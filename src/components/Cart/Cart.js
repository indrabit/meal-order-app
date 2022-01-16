import React,{Fragment, useContext, useState} from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

import classes from './Cart.module.css';


const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [isCheckout, setisCheckout] = useState(false);
    const [IsSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setdidSubmit] = useState(false);
    const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems=cartCtx.items.length>0;
    const cartItemRemoveHandler=id=>{
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler=item=>{
        cartCtx.addItem(item);
    };
    const orderHander=()=>{
        setisCheckout(true);
    };
    const submitOrderHandeler=(userData)=> {
        setIsSubmitting(true);
       fetch('https://react-http-a3e26-default-rtdb.firebaseio.com/order.json',{
           method:'POST',
           body:JSON.stringify({
               user:userData,
               orderItems: cartCtx.items
           })
       });
      setIsSubmitting(false);
      setdidSubmit(true);
      cartCtx.clearCart();

    };
   
    const cartItems=<ul className={classes['cart-items']}>
        {/* {[{id:'C1',name:'Sushi',amount:2,price:12.99}].map((item)=><li>{item.name}</li>)} */}
        {/* {cartCtx.items.map((item)=><li>{item.name}</li>)} */}
        {cartCtx.items.map((item)=><CartItem  
        key={item.id} 
        name={item.name}
        amount={item.amount} 
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null,item.id)}
        onAdd={cartItemAddHandler.bind(null,item)}
        />)}
        </ul>;
    const modalActions= <div className={classes.actions}>
                             <button className={classes['button-alt']} onClick={props.onClose}>Close</button>
                              {hasItems && <button className={classes.button} onClick={orderHander}>Order</button>}

                        </div>;
    const cartModelContent=<Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount} </span>
            </div>
           {isCheckout && (
           < Checkout onConfirm={submitOrderHandeler} onCancel={props.onClose} />
           )}
           {!isCheckout && modalActions}    
        </Fragment>
    const IsSubmittingModelContent=<p>Sending order data...</p>;
    const didSubmitModelContent=<Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
                             <button className={classes.button} onClick={props.onClose}>Close</button>
                            

                        </div>;
    </Fragment>;
    return (
        <Modal onClose={props.onClose}>
            {!IsSubmitting && !didSubmit && cartModelContent}
            {IsSubmitting && IsSubmittingModelContent}
            {!IsSubmitting && didSubmit && didSubmitModelContent}
        </Modal>
    )
}

export default Cart;
