import { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";

const Availablemeals = (props) => {
const [meals,setmeals]=useState([]);
const [isLoading,setisLoading]=useState(false);
const [httperror,sethttperror]=useState(null);

  const fetchmeals=async ()=>{
    setisLoading(true);
    sethttperror(null);
    try{
    const response = await fetch('https://meals-order-app-91350-default-rtdb.firebaseio.com/meals.json');
    if(!response.ok){
      throw new Error('Something went wrong!');
    }
    const data=await response.json();
    let loadedmeals=[];
    for(const key in data){
      loadedmeals.push({
        id:key,
        name:data[key].name,
        description:data[key].description,
        price:data[key].price,
      })
    }
    setmeals(loadedmeals);
    ;}
    catch(error){
      sethttperror(error.message);
      setisLoading(false);
    }
    setisLoading(false);
    } 

    useEffect(()=>{
      fetchmeals();
    },[]);
    
  const mealslist = meals.map((meal) => (
    <MealItem
    id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
 
  if(isLoading){
    return(
      <section className={classes.isLoading}>
        <p>Loading...</p>
      </section>
    )
  }
  if(httperror){
    return(
      <section className={classes.httperror}>
        <p>{httperror}</p>
      </section>
    )
  }
  return (
     <section className={classes.meals}>
       <Card>
      <ul>{mealslist}</ul>
    </Card> 
    </section>
  );
};

export default Availablemeals;
