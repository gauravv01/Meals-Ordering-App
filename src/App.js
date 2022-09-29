import {useState} from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartContext-Provider';


function App() {
  const [CartisShown,setCartisShown]=useState(false);

const ShowCarthandler=()=>{
  setCartisShown(true);
}
const HideCartHandler=()=>{
  setCartisShown(false)
}

  return (
    <CartProvider>
      {CartisShown && <Cart onHide={HideCartHandler}/>}
      <Header onShow={ShowCarthandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
