import React, { useRef, useContext } from 'react'
import ProductContext from '../Context/ProductContext'
import CartContext from '../Context/CartContext'

const ProductDisplay = () => {
    const productCtx = useContext(ProductContext)
    const cartCtx = useContext(CartContext)

    const quantityRef = useRef()

    const productsAvailable = productCtx.products.map((prod, index) => (
        <li key={index}>
            <span>Name: {prod.name}  </span>
            <span>Description: {prod.description}  </span>
            <span>Price: {prod.price}  </span>
            <span>quantity: {prod.quantity}  </span>
            <span>quantity: {prod._id}  </span>
            <input type="number" ref={quantityRef}></input>
            <button onClick={(e) => {
                e.preventDefault()
                const enteredQuantity = quantityRef.current.value
                cartCtx.addCartPoduct({ ...prod, id: prod._id, cartQuantity: enteredQuantity})
                quantityRef.current.value="" 
            }}>Add To Cart</button>
        </li>
    ))
    return (
        <>
            <h1>Medicines</h1>
            <ul>
                {productsAvailable}
            </ul>
        </>
    )
}

export default ProductDisplay