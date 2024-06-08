import React, { useState, useEffect } from 'react'

const CartContext = React.createContext({
    cartProducts: [],
    addCartPoduct: () => { },
    clearCart: () => { }
})


export const CartContextProvider = (props) => {
    const [cartProducts, setCartProducts] = useState([])
    let url = "https://crudcrud.com/api/ce33a9f481bc4a99861b47e7ed7af078"

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/cart`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    setCartProducts(data)
                }
                else if (!response.ok) {
                    throw new Error('Something went wrong..')
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData()
    }, [url])


    const addCartProductHandler = async (product) => {
        try {
            const response = await fetch(`${url}/cart`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            if (response.ok) {
                await response.json()
                setCartProducts([...cartProducts, product])
            }
            else if (!response.ok) {
                throw new Error('Something went wrong..')
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
return (
    < CartContext.Provider value={contextValues} >
        {props.children}
    </ CartContext.Provider>
)
}

export default CartContext