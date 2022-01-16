import React,{useContext,useState} from 'react';
import classes from './MealItem.module.css';
import MealItemFrom from './MealItemFrom';
import CartContext from '../../../store/cart-context';

    
const MealItem = (props) => {
    const [showParagraph, setshowParagraph] = useState(false);
     const [isBtn, setisBtn] = useState("+");
    const cartCtx = useContext(CartContext);
    const price= `$${props.price.toFixed(2)}`;
    const addToCartHandler=amount=>{

        cartCtx.addItem({
            id:props.id,
            name:props.name,
            amount:amount,
            price:props.price
        });
    };
    const toggleParagraphHandler=()=>{
        setshowParagraph(previousShowParagraph=>!previousShowParagraph);
        if(showParagraph){
            setisBtn("+");
        }
      
        
    };
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name} <button className={classes.button} onClick={toggleParagraphHandler}> {showParagraph?"-":"+"} </button></h3>
                
                {showParagraph && <div className={classes.description}>{props.description}</div>}
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemFrom onAddToCart={addToCartHandler} />
            </div>
        </li>
    )
}

export default MealItem;
