import React,{useState,useEffect} from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
// import { DUMMY_MEALS } from './MealList';
import MealCategories from './MealCategories';

// import MealsSummary from './MealsSummary';



// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];
//   const initialState={
//     menuItem:MealItem,
//   };




const AvailableMeals = () => {
    // const mealsList=DUMMY_MEALS.map(meal=><li>{meal.name}</li>);
    // const [state, setstate] = useState(initialState);
   
    const [categories, setCategories] = useState();
    const  [mealItems, setmealItems] = useState();
    const [Meals, setMeals] = useState([]);
    const [IsLoading, setIsLoading] = useState(true);
    const [httpError, sethttpError] = useState(null);

    // Database connection from firebase and fetch data
     useEffect(() => {
      const fetchMeals= async()=>{
        const response=await fetch('https://react-http-a3e26-default-rtdb.firebaseio.com/Meals.json'
        );  
        if(!response.ok){
          throw new Error('Something Went wrong!');
        }
        const responseData=await response.json();
        const loadedMeals=[];
        
        for( const key in responseData){
          loadedMeals.push({
            id:key,
            name:responseData[key].name,
            description:responseData[key].description,
            category:responseData[key].category,
            price:responseData[key].price,
          });
        }
       
        setMeals(loadedMeals);
        setIsLoading(false);
       
      };
      try{
        fetchMeals();
      }catch(error){
        setIsLoading(false);
        sethttpError(error.message);
      }
      
    }, []);

   if(IsLoading){
     return<section className={classes.MealsLoading}>
       <p>Loading....</p>
     </section>
   }
   else{
  
    if(!categories){
      const allCategories=['All',...new Set(Meals.map((proditem) => proditem.category))]
      setCategories(allCategories);      
    }
    if(!mealItems){
      setmealItems(Meals);
    }
    
   }
   if(httpError){
     return(<section className={classes.MealError}>
      <p>{httpError}</p>
    </section>);
   }
// filter items using of category
    const filterMeanItems=(category)=>{
      // console.log(category);
      if(category==='All'){
        setmealItems(Meals);
        return;
      }
      const newItems = Meals.filter((proditem) => proditem.category === category);
      setmealItems(newItems);        
    };
    const mealsList=mealItems?mealItems.map((meal)=>(
      <MealItem key={meal.id} 
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      />
    )):"loading";
    
    return (
        <section className={classes.meals}>
            <div><MealCategories categories={categories} filterItems={filterMeanItems}  />
            </div>
            <ul>              
              <Card>                     
              {mealsList}
              </Card>               
            </ul>
            
        </section>
        
    )
}

export default AvailableMeals;
