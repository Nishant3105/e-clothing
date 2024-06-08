import React, { useState, useContext, useEffect } from 'react'
import CartContext from './CartContext'


const ProductContext = React.createContext({
    products: [],
    addPoduct: (product) => { },
    updateProductQuantity: () => { }
})


export const ProductContextProvider = (props) => {
    const cartCtx = useContext(CartContext)
    let url = "https://crudcrud.com/api/ce33a9f481bc4a99861b47e7ed7af078"
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/products`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    setProducts(data)
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

    const addProductHandler = async (product) => {
        try {
            const response = await fetch(`${url}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('prodId', data._id)
                setProducts([...products, product])
            }
            else if (!response.ok) {
                throw new Error('Something went wrong..')
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const updateProductQuantityHandler = async (cartProducts) => {
        try {
            const newArr = cartProducts.map(async (cartProd) =>
                await fetch(`${url}/products/${cartProd.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...cartProd, quantity: Number(cartProd.quantity) - Number(cartProd.cartQuantity) })
                })
            )

            await Promise.all(newArr).then((resolve) => {
                console.log('resolved')
                cartCtx.clearCart()
            })
        }catch(error){
            console.log(error)
        }



        // const existingProduct = products.find((prod) => prod.id = id)

        // const updatedProducts = cartProducts.map(cProd => {
        //     const product = products.find(p => p.id === cProd.id);
        //     if (product) {
        //         product.quantity -= cProd.quantity;
        //     }
        // });
        // const prodId = localStorage.getItem('prodId')

        // if (existingProduct) {
        //     const updatedProduct = products.map((prod) => prod.id !== id ? prod : { ...prod, quantity: prod.quantity - quantity })
        //     try {
        //         const response = await fetch(`${url}/products/${prodId}`, {
        //             method: 'PUT',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify
        //         })
        //         if (response.ok) {
        //             const data = await response.json()
        //             console.log('updatedProduct', data)
        //             setProducts(updatedProduct)
        //         }
        //         else if (!response.ok) {
        //             throw new Error('Something went wrong..')
        //         }
        //     } catch (error) {
        //         console.log(error.message)
        //     }
        // }
    }

    const contextValues = {
        products: products,
        addPoduct: addProductHandler,
        updateProductQuantity: updateProductQuantityHandler
    }

    return (
        < ProductContext.Provider value={contextValues} >
            {props.children}
        </ ProductContext.Provider>
    )
}

export default ProductContext