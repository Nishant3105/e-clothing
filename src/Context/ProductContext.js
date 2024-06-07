import React, { useState, useContext, useEffect } from 'react'

const ProductContext = React.createContext({
    products: [],
    addPoduct: () => { },
    updateProductQuantity: () => { }
})

let url="https://crudcrud.com/api/09b62686668048478a6633947777cba9"
let initialValue
useEffect(async () => {
    try {
        const response = await fetch(`${url}/products`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json()
            initialValue = data
        }
        else if (!response.ok) {
            throw new Error('Something went wrong..')
        }
    } catch (error) {
        console.log(error.message)
    }
}, [url])

const [products, setProducts] = useState(initialValue)

const addProductHandler = async (product) => {
    try {
        const response = await fetch(`${url}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify
        })
        if (response.ok) {
            const data = await response.json()
            setProducts([...products, { ...product, id: data._id }])
        }
        else if (!response.ok) {
            throw new Error('Something went wrong..')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const updateProductQuantityHandler = async (id, quantity) => {
    const existingProduct = products.find((prod) => prod.id = id)
    const prodId = existingProduct['id']
    if (existingProduct) {
        const updatedProduct = products.map((prod) => prod.id !== id ? prod : { ...prod, quantity: prod.quantity - quantity })
        try {
            const response = await fetch(`${url}/products/${prodId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify
            })
            if (response.ok) {
                const data = await response.json()
                console.log('updatedProduct',data)
                setProducts(updatedProduct)
            }
            else if (!response.ok) {
                throw new Error('Something went wrong..')
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}

const contextValues = {
    products: products,
    addPoduct: addProductHandler,
    updateProductQuantity: updateProductQuantityHandler
}

export const ProductContextProvider = (props) => {
    <ProductContext.Provider value={contextValues}>
        {props.children}
    </ProductContext.Provider>
}

export default ProductContextProvider