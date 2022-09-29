import { useContext } from 'react';
import CartContext from '../../../store/CartContext';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';

const MealItem= props=>{
const CartCtx= useContext(CartContext);

const price=`$${props.price.toFixed(2)}`;
 
const AddtoCartHandler=amount=>{
    CartCtx.addItem({
        id:props.id,
        amount:amount,
        name:props.name,
        price:props.price
    })
}


    return(
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddCart={AddtoCartHandler}/>
            </div>
        </li>
    )
}

export default MealItem;