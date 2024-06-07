import React, { useState } from 'react'

const CartContext = React.createContext({
    products: [],
    addPoduct: () => { },
    clearCart: () => { }
})

let url = "https://crudcrud.com/api/09b62686668048478a6633947777cba9"
let initialValue
useEffect(async () => {
    try {
        const response = await fetch(`${url}/cart`, {
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
}, [])

const [cartProducts, setCartProducts] = useState(initialValue)

const addCartProductHandler = async (product) => {

    try {
        const existingProduct = cartProducts.find((prod) => prod.id === id)
        if (existingProduct) {
            const updatedProduct = cartProducts.map((prod) => prod.id !== id ? prod : { ...prod, quantity: prod.quantity + 1 })
            const response = await fetch(`${url}/cart`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            })
            if (response.ok) {
                const data = await response.json()
                initialValue = data
                setCartProducts(updatedProduct)
            }
            else if (!response.ok) {
                throw new Error('Something went wrong..')
            }
        }
        else {
            try {
                const response = await fetch(`${url}/cart`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    initialValue = data
                    setCartProducts([...cartProducts, product])
                }
                else if (!response.ok) {
                    throw new Error('Something went wrong..')
                }
            } catch (error) {
                console.log(error.message)
            }
        }
    } catch (error) {
        console.log(error.message)
    }

}

const clearCartHandler = () => {
    setCartProducts([])
}

const contextValues = {
    cartProducts: cartProducts,
    addCartPoduct: addCartProductHandler,
    clearCart: clearCartHandler
}

export const CartContextProvider = (props) => {
    <CartContext.Provider value={contextValues}>
        {props.children}
    </CartContext.Provider>
}

export default CartContextProvider