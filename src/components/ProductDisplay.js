import React, { useContext } from 'react'
import {ProductContext} from '../Context/ProductContext'

const ProductDisplay = () => {
    const productCtx=useContext(ProductContext)
    const url="https://crudcrud.com/api/09b62686668048478a6633947777cba9"
    const addToCartHandler=async (prodId)=>{
        try{
            

        }catch(error){

        }
    }

    const productsAvailable=productCtx.products.map((prod,index)=>(
        <li key={index}>
            <span>{prod.name}</span>
            <span>{prod.description}</span>
            <span>{prod.price}</span>
            <span>{prod.quantity}</span>
            <button onClick={()=>addToCartHandler(index)}>Add To Cart</button>
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