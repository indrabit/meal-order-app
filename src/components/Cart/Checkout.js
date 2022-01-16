import React,{useRef,useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim()==='';
const IsFiveChars = (value) => value.trim().length ===4;

const Checkout = (props) => {
    const [formInputValide, setformInputValide] = useState({
        name:true,
        street:true,
        city:true,
        postalCode:true
    });
    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const postalInputRef=useRef();
    const cityInputRef=useRef();

    const confirmHandler = (event) => {
      event.preventDefault();
    //   Assign value
      const enteredName=nameInputRef.current.value;
      const enteredStreet=streetInputRef.current.value;
      const eneteredPostal=postalInputRef.current.value;
      const eneteredCity=cityInputRef.current.value;
      
      const entetredNameIsValid= !isEmpty(enteredName);
      const enteredStreetIsValid=!isEmpty(enteredStreet);      
      const eneteredPostalIsValid=IsFiveChars(eneteredPostal);
      
      const eneteredCityIsValid=!isEmpty(eneteredCity);

        setformInputValide({
            name:entetredNameIsValid,
            street:enteredStreetIsValid,
            city:eneteredCityIsValid,
            postalCode:eneteredPostalIsValid
        });
      const formIsValid=entetredNameIsValid && eneteredPostalIsValid && enteredStreetIsValid && eneteredCityIsValid;
   
      if(!formIsValid){
        return;
      }
    //   Submit data
    props.onConfirm(
        {
            name: enteredName,
            street: enteredStreet,
            city: eneteredCity,
            postalCode: eneteredPostal,
        }
        );      
    };

    const nameControlClasses=`${classes.control} ${formInputValide.name?'':classes.invalid}`;
    const streetControlClasses=`${classes.control} ${formInputValide.street?'':classes.invalid}`;
    const postalControlClasses=`${classes.control} ${formInputValide.postalCode?'':classes.invalid}`;
    const cityControlClasses=`${classes.control} ${formInputValide.city?'':classes.invalid}`;
  
    return (
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' ref={nameInputRef}/>
          {!formInputValide.name && <p>Please enter a valid name!</p>}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor='street'>Street</label>
          <input type='text' id='street' ref={streetInputRef}/>
          {!formInputValide.street && <p>Please enter a valid street !</p>}
        </div>
        <div className={postalControlClasses}>
          <label htmlFor='postal' >Postal Code</label>
          <input type='text' id='postalCode' ref={postalInputRef}/>
          {!formInputValide.postalCode && <p>Please enter a valid Post Code!</p>}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor='city' >City</label>
          <input type='text' id='city' ref={cityInputRef}/>
          {!formInputValide.city && <p>Please enter a valid City!</p>}
        </div>
        <div className={classes.actions}>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    );
  };
  
  export default Checkout;