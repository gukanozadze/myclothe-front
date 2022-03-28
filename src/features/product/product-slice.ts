import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import {
	deleteManyProductsCall,
	deleteOneProductCall,
	getAllProductsCall,
	getOneProductCall,
	postProductCall,
	updateProductCall,
} from './api'
import { Product } from '../../shared/Product'
import { StatusOnlineIcon } from '@heroicons/react/outline'

interface ProductState {
	list: any[]
	entity: Product | null
	status: string
}
const initialState: ProductState = {
	list: [],
	entity: null,
	status: '',
}

export const getAllProducts = createAsyncThunk('products/getAllProducts', getAllProductsCall)
export const getOneProduct = createAsyncThunk('products/getOneProduct', getOneProductCall)
export const postProduct = createAsyncThunk('products/postProduct', postProductCall)
export const updateProduct = createAsyncThunk('products/updateProduct', updateProductCall)
export const deleteOneProduct = createAsyncThunk('products/deleteOneProduct', deleteOneProductCall)
export const deleteManyProducts = createAsyncThunk('products/deleteManyProducts', deleteManyProductsCall)

// Create a slice containing the configuration of the state
const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		productsSuccess(state, action) {
			state.list = action.payload
		},
		resetProductState: () => initialState,
	},
	extraReducers: builder => {
		builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
			state.status = 'successs'
			state.list = payload
		})

		builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
			state.status = 'successs'
			state.entity = payload

			const foundIndex = state.list.findIndex(x => x.id === payload.id)
			const newList = state.list
			newList[foundIndex] = payload

			state.list = [...newList]
		})

		builder.addCase(getOneProduct.fulfilled, (state, { payload }) => {
			state.status = 'successs'
			state.entity = payload
		})

		builder.addCase(postProduct.fulfilled, (state, { payload }) => {
			state.status = 'successs'
			state.list = [...state.list, payload]
		})

		builder.addCase(deleteOneProduct.fulfilled, (state, { payload }) => {
			state.status = 'successs'
			state.list = [...state.list.filter(p => p.id.toString() !== payload)]
		})
	},
})

export const selectProductState = (state: RootState) => state.products
export const selectAllProducts = (state: RootState) => state.products.list
export const selectCurrentProduct = (state: RootState) => state.products.entity

// Export each reducers function defined in createSlice
export const { productsSuccess, resetProductState } = productSlice.actions

// Export default the slice reducer
export default productSlice.reducer
