import { useContext } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/CartContext";

const Cart = (props) => {
  const CartCtx = useContext(CartContext);
  const totalAmount =`$${CartCtx.totalAmount.toFixed(2)}`;
  const hasItems = CartCtx.items.length>0;

const CartItemRemoveHandler = id=>{
    CartCtx.removeItem(id);
};

const CartItemAddHandler=item=>{
    CartCtx.addItem(item);
};

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
  return (
    <Modal onHide={props.onHide}>
      {Cartitems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button-alt"]} onClick={props.onHide}>
          Close
        </button>
       {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
