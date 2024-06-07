import React, { useRef,useContext } from 'react'
import {ProductContext} from '../Context/ProductContext'


const SellerForm = () => {
    const idRef=useRef()
    const itemNameRef=useRef()
    const descriptionRef=useRef()
    const priceRef=useRef()
    const quantityRef=useRef()

    const productCtx=useContext(ProductContext)
    
    const addProductHandler=(e)=>{
        e.preventDefault()
        const enteredId=idRef.current.value
        const enteredItemName=itemNameRef.current.value
        const enteredDescription=descriptionRef.current.value
        const enteredPrice=priceRef.current.value
        const enteredQuantity=quantityRef.current.value

        const product={
            id:enteredId,
            name:enteredItemName,
            description:enteredDescription,
            price:enteredPrice,
            quantity:enteredQuantity
        }

        productCtx.addProduct(product)

        idRef.current.value=""
        itemNameRef.current.value=""
        descriptionRef.current.value=""
        priceRef.current.value=""
        quantityRef.current.value=""
    }


  return (
    <form>
        <label htmlFor="id">Id</label>
        <input id="id" type="text" ref={idRef}></input>
        <label htmlFor="itemname">Medicine Name</label>
        <input id="itemname" type="text" ref={itemNameRef}></input>
        <label htmlFor="description">description</label>
        <input id="description" type="text" ref={descriptionRef}></input>
        <label htmlFor="price">price</label>
        <input id="price" type="number" ref={priceRef}></input>
        <label htmlFor="large">quantity</label>
        <input id="large" type="number" ref={quantityRef}></input>
        
        <div>
            <button onClick={addProductHandler}>Add Product</button>
        </div>
    </form>
  )
}

export default SellerForm