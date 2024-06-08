import React, { useState } from 'react'
import './App.css';
import SellerForm from './components/SellerForm';
import Cart from './components/Cart';
import ProductDisplay from './components/ProductDisplay';
import Header from './components/Header';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)

  const onCloseHandler = () => {
    console.log('enteredclose')
    setCartIsShown((prevState) => !prevState)
  }
  const onClickHandler = () => {
    setCartIsShown((prevState) => !prevState)
  }
  return (
    <>
      {cartIsShown && <Cart onClick={onCloseHandler} />}
      <Header onClick={onClickHandler} />
      <SellerForm />
      <ProductDisplay/>
    </>

  );
}

export default App;
