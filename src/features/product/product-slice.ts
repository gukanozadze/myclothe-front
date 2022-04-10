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
import { ProductModel } from '../../shared/models/ProductModel'

interface ProductState {
	list: any[]
	entity: ProductModel | null
	status: string
	loading: boolean
}

const initialState: ProductState = {
	list: [],
	entity: null,
	status: '',
	loading: false,
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
		resetProductState: () => initialState,
	},
	extraReducers: builder => {
		builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
			state.status = 'successs'
			state.loading = false
			state.list = payload
		})
		builder.addCase(getAllProducts.pending, state => {
			state.status = 'pending'
			state.loading = true
		})

		builder.addCase(getOneProduct.fulfilled, (state, { payload }) => {
			state.status = 'successs'
			state.entity = { ...state.entity, ...payload }
			state.loading = false
		})
		builder.addCase(getOneProduct.pending, state => {
			state.status = 'pending'
			state.loading = true
		})

		builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
			state.status = 'successs'
			state.entity = { ...state.entity, ...payload }

			const updatedProductIndex = state.list.findIndex(product => product.id === payload.id)
			state.list = state.list.map((content, i) =>
				i === updatedProductIndex ? { ...state.entity, ...payload } : content
			)
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
export const selectProductListLoading = (state: RootState) => state.products.loading

// Export each reducers function defined in createSlice
export const { resetProductState } = productSlice.actions

// Export default the slice reducer
export default productSlice.reducer
