import { useReducer } from "react";
import CartContext from "./CartContext";

const defaultcartitems = {
  items: [],
  totalAmount: 0,
};

const CartReducer = (state, action) => {
  if (action.type === "ADD") {
    const UpdatedTotalAmount = state.totalAmount + action.item.price;
    const ExistingItemIdex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const ExistingItem = state.items[ExistingItemIdex];
    let updateditems;
    if (ExistingItem) {
      const updateditem = {
        ...ExistingItem,
        amount: ExistingItem.amount + 1,
      };
      updateditems = [...state.items];
      updateditems[ExistingItemIdex] = updateditem;
    } else {
      updateditems = state.items.concat(action.item);
    }
    return {
      items: updateditems,
      totalAmount: UpdatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const ExistingItemIdex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const ExistingItem = state.items[ExistingItemIdex];
    const UpdatedTotalAmount = state.totalAmount - ExistingItem.price;
    let updateditems;
    if (ExistingItem.amount === 1) {
      updateditems = state.items.filter((item) => item.id !== action.id);
    } else if (ExistingItem.amount !== 1) {
      const updateditem = { ...ExistingItem, amount: ExistingItem.amount - 1 ,};
      updateditems = [...state.items];
      updateditems[ExistingItemIdex] = updateditem;
    }
    return {
      items: updateditems,
      totalAmount: UpdatedTotalAmount,
    };
  }

  return defaultcartitems;
};

const CartProvider = (props) => {
  const [CartState, dispatchCartAction] = useReducer(
    CartReducer,
    defaultcartitems
  );

  const additemhandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeitemhandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const context = {
    items: CartState.items,
    totalAmount: CartState.totalAmount,
    addItem: additemhandler,
    removeItem: removeitemhandler,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
