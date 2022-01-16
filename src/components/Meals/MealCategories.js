import React from 'react';
import classes from './MealCategories.module.css';

const MealCategories = ({categories,filterItems}) => {   
    
    return (
        <div className={classes.btnContainer}>  
        {      
        categories.map((category,index)=>{
            return(
                <button
                    type="button" 
                    className={classes.filterBtn} 
                    key={index}
                    onClick={()=>filterItems(category)}>
                    {category}
                </button>        
            );

        })}   
          
    </div>
    );
};

export default MealCategories;
