import React, { useContext } from 'react'
import CartContext from '../Context/CartContext'
import Modal from './Modal'
import  ProductContext  from '../Context/ProductContext'

const Cart = (props) => {
    const cartCtx = useContext(CartContext)
    const productCtx=useContext(ProductContext)

    const CartItems = cartCtx.cartProducts.map((p, index) => {
        return (
            <li key={index}>
                <span>Name: {p.name} Price:{p.price}</span>
                <span>({p.quantity})</span>
            </li>
        )
    })
    return (
        <Modal onClick={props.onClick}>
            <div>
                <ul>
                    {CartItems}
                </ul>
                {cartCtx.cartProducts.length!==0 && <button onClick={()=>productCtx.updateProductQuantity(cartCtx.cartProducts)}>Place Order</button>}
            </div>
        </Modal>
    )
}

export default Cart