import { Fragment } from "react";
import Availablemeals from "./Availabemeals";
import MealsSummary from "./MealsSummary";

const Meals = ()=>{
    return(
        <Fragment>
    <MealsSummary/>
    <Availablemeals/>
    </Fragment>
    )
};


export default Meals;