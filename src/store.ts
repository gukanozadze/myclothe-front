import { configureStore } from '@reduxjs/toolkit'
import orderSlice from './features/orders/order-slice'
import productSlice from './features/product/product-slice'
import userSlice from './features/user/user-slice'

// Import the previously created search slice

// Create the store, adding the search slice to it
export const store = configureStore({
	reducer: {
		products: productSlice,
		users: userSlice,
		orders: orderSlice,
	},
	// do not forget this
	devTools: process.env.NODE_ENV !== 'production',
})

// Export some helper types used to improve type-checking
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
