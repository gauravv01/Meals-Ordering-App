import { useContext,useEffect,useState } from "react";
import CartContext from "../../store/CartContext";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';

const HeaderCartbutton =(props)=>{
    const [BtnisHighlighted,setBtnisHighlighted] =useState(false);

    const Cartctx=useContext(CartContext);
    const numberofCartitems=Cartctx.items.reduce((currnum,item)=>{
        return currnum + item.amount;
    },0)

    const {items}=Cartctx;
    const Buttonclasses = `${classes.button} ${BtnisHighlighted ? classes.bump : ''}`;

    useEffect(()=>{
if(items.length===0){
    return;
}

        setBtnisHighlighted(true);

      const timer =  setTimeout(()=>{
            setBtnisHighlighted(false);
        },300)

        return ()=>{
            clearTimeout(timer)
        }

    },[items])

    return(
        <button className={Buttonclasses} onClick={props.onShow}>
<span className={classes.icon}>
    <CartIcon/>
</span>
<span>Your Cart</span>
<span className={classes.badge}>{numberofCartitems}</span>
</button>
    )
}

export default HeaderCartbutton;