import { configureStore } from '@reduxjs/toolkit'
import { productDetailsReducer, productReducer } from './reducers/productReducer'
import { userReducer } from './reducers/userReducer'


export const store = configureStore({
    reducer: {
        products:productReducer,
        productDetails:productDetailsReducer,
    }
  })

