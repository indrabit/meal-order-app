import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProivder from "./store/CartProivder";
function App() {
 const [cartIsShown, setcartIsShown] = useState(false);
 const showCartHandler=()=>{
  setcartIsShown(true);
 };
 const hideCartHandler=()=>{
   setcartIsShown(false);

 };
  return (
        // <Fragment>
        <CartProivder>
           {cartIsShown && <Cart onClose={hideCartHandler} />} 
          <Header onShowCart={showCartHandler} />             
            <main>
              <Meals/>
            </main>
        </CartProivder>                   
          // </Fragment> 
          );
}

export default App;
