import { useLocalObservable } from 'mobx-react'
import React from 'react'
import { ProductStore } from '../stores/ProductStore'

const ProductContext = React.createContext()

export const ProductsProvider = ({ children }) => {
    const productsStore = useLocalObservable(ProductStore)
    
    return <ProductContext.Provider value={productsStore}>
        {children}
    </ProductContext.Provider>
}

export const useProductsStore = () => React.useContext(ProductContext)