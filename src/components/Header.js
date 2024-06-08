import React,{useContext} from 'react'
import CartContext from '../Context/CartContext'

const Header = (props) => {
    const cartCtx=useContext(CartContext)
  return (
    <div>
        <h1>E-PHARMA</h1>
        <div>
        <button onClick={props.onClick}>Cart</button>
        <span>{cartCtx.cartProducts.length}</span>
        </div>
    </div>

  )
}

export default Header