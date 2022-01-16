import React,{ useReducer } from 'react';
import CartContext from './cart-context';
const defaultCartState={
items:[],
totalAmount:0
};

const cartReducer=(state,action)=>{
    if(action.type==='ADD'){
        const updateTotalAmount=state.totalAmount+action.item.price*action.item.amount;
        const exitingCartItemIndex=state.items.findIndex((
            item)=>item.id===action.item.id
            );
        const existingCartItem=state.items[exitingCartItemIndex];

        
        let updatedItems;
        // let updatedItem;
        if(existingCartItem){                        
            const updatedItem={
             ...existingCartItem,
                //  amount:existingCartItem.amount+action.item.amount
                amount:existingCartItem.amount+1
                };
            updatedItems=[...state.items];
            updatedItems[exitingCartItemIndex]=updatedItem;
         }
         else{             
             updatedItems=state.items.concat(action.item);
         }
        // const updaateItems=state.items.concat(action.item);
        return{
            items:updatedItems,
            totalAmount:updateTotalAmount
        };
    }
    if(action.type==='REMOVE'){
        const exitingCartItemIndex=state.items.findIndex((
            item)=>item.id===action.id
            );
        const exitingItem=state.items[exitingCartItemIndex];
        const updatedTotalAmount=state.totalAmount-exitingItem.price;
        let updatedItems;
        if(exitingItem.amount===1){
            updatedItems=state.items.filter(item=>item.id !== action.id);
        }else{
            const updatedItem={...exitingItem, amount:exitingItem.amount -1};
            updatedItems=[...state.items];
            updatedItems[exitingCartItemIndex]=updatedItem;
        }  
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        };
    }
    if(action.type==='CLEAR'){
        return defaultCartState;
    }
    return defaultCartState;
};
const CartProivder = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer,defaultCartState);
    const addItemToCartHandler=(item)=>{
        dispatchCartAction({type:'ADD',item:item});
    };
    const removeItemFromCartHandler=(id)=>{
        dispatchCartAction({
            type:'REMOVE',
            id:id
        });

    };
    const clearCartHandler=()=>{
        dispatchCartAction({type:'CLEAR'});        
    }
    const cartContext={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem:removeItemFromCartHandler,
        clearCart:clearCartHandler
    }
    return (
                <CartContext.Provider value={cartContext}>
                    {props.children}
                </CartContext.Provider>      
    );
};

export default CartProivder
