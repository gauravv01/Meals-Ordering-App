import React,{ useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/CartContext";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout,setisCheckout]= useState(false);
const [isSubmitting,setisSubmitting]=useState(false);
const [didSubmit,setdidSubmit]=useState(false);

  const CartCtx = useContext(CartContext);
  const totalAmount =`$${CartCtx.totalAmount.toFixed(2)}`;
  const hasItems = CartCtx.items.length>0;

const Orderhandler=()=>{
  setisCheckout(true);
}

const CartItemRemoveHandler = id=>{
    CartCtx.removeItem(id);
};

const CartItemAddHandler=item=>{
    CartCtx.addItem(item);
};

const OrderConfirmationHandler=(userdata)=>{
  setisSubmitting(true);
  fetch('https://meals-order-app-91350-default-rtdb.firebaseio.com/orders.json',{
    method:'POST',
    body:JSON.stringify({
      user:userdata,
      orderitems:CartCtx.items
    })
  });
  setisSubmitting(false);
  setdidSubmit(true);
  CartCtx.clearCart();
}

  const Cartitems =(
    <ul className={classes['cart-items']}>
  {CartCtx.items.map((item) => 
    (<CartItem
      key={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      onRemove={CartItemRemoveHandler.bind(null,item.id)}
      onAdd={CartItemAddHandler.bind(null,item)}
    />)
  )}
  </ul>);
const modalactions =<div className={classes.actions}>
<button className={classes["button-alt"]} onClick={props.onHide}>
  Close
</button>
{hasItems && <button className={classes.button} onClick={Orderhandler}>Order</button>}
</div>;

const modalcontent= <React.Fragment> {Cartitems}
<div className={classes.total}>
  <span>Total Amount</span>
  <span>{totalAmount}</span>
</div>
{isCheckout && <Checkout onConfirmOrder={OrderConfirmationHandler} onCancel={props.onHide}/>}
{!isCheckout && modalactions}
</React.Fragment>

const isSubmittingcontent=<p>Sending data...</p>;

const didSubmitcontent=<React.Fragment>
<p>Order Successfully placed.</p>
<div className={classes.actions}>
<button className={classes.button} onClick={props.onHide}>
  Close
</button>
</div>
</React.Fragment>

  return (
    <Modal onHide={props.onHide}>
    {!isSubmitting && !didSubmit && modalcontent}
    {isSubmitting && isSubmittingcontent}
    {didSubmit && !isSubmitting && didSubmitcontent}
    </Modal>
  );
};

export default Cart;
