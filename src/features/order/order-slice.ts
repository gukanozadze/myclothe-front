import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { getAllOrdersByUserCall, getAllOrdersCall, postOrderCall } from './api'

interface ProductState {
	list: any[]
	status: string
	loading: boolean
}
const initialState: ProductState = {
	list: [],
	status: '',
	loading: false,
}

export const postOrder = createAsyncThunk('orders/postOrder', postOrderCall)
export const getAllOrders = createAsyncThunk('orders/getAllOrders', getAllOrdersCall)
export const getAllOrdersByUser = createAsyncThunk('orders/getAllOrdersByuser', getAllOrdersByUserCall)

// Create a slice containing the configuration of the state
const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		resetOrderState: () => initialState,
	},
	extraReducers: builder => {
		builder.addCase(postOrder.fulfilled, (state, { payload }) => {
			state.status = 'success'
			state.list = [...state.list, payload]
			state.loading = false
		})
		builder.addCase(postOrder.pending, state => {
			state.status = 'pending'
			state.loading = true
		})

		builder.addCase(getAllOrders.fulfilled, (state, { payload }) => {
			state.list = [...payload]
		})

		builder.addCase(getAllOrdersByUser.fulfilled, (state, { payload }) => {
			state.list = [...payload]
			state.loading = false
		})
		builder.addCase(getAllOrdersByUser.pending, state => {
			state.status = 'pending'
			state.loading = true
		})
	},
})

export const selectAllOrders = (state: RootState) => state.orders.list
export const selectOrderLoading = (state: RootState) => state.orders.loading
export const selectOrderStatus = (state: RootState) => state.orders.status
// Export each reducers function defined in createSlice
export const { resetOrderState } = orderSlice.actions

// Export default the slice reducer
export default orderSlice.reducer
