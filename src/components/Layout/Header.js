import React, { Fragment } from 'react'
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
const Header = (props) => {
    return (
            <Fragment>
                <header className={classes.header}>
                    <h1>Indra Kitchen Meals</h1>
                     <HeaderCartButton onClick={props.onShowCart} />
                </header>
                <div className={classes['main-image']}> 
                    <img src={mealsImage} alt="food-header"/>
                </div>
            </Fragment>
    );
};

export default Header