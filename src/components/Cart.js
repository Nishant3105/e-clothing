import React, { useContext } from 'react'
import { CartContext } from '../Context/CartContext'
import Modal from './Modal'
import { ProductContext } from '../Context/ProductContext'

const Cart = () => {
    const cartCtx = useContext(CartContext)
    const productCtx=useContext(ProductContextProvider)

    const placeOrderHandler=()=>{
        // cartCtx.clearCart()
        productCtx.updateProductQuantity()
    }

    const CartItems = cartCtx.cartProducts.map((p, index) => {
        return (
            <li key={index}>
                <span>p.name</span>
                <span>p.quantity</span>
                <button>+</button>
                <button>-</button>
            </li>
        )
        })
        return (
            <Modal>
            <div>
                <ul>
                    {CartItems}
                </ul>
                <button onClick={placeOrderHandler}>Place Order</button>
            </div>
        </Modal>
    )
}

export default Cart