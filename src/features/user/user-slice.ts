/* eslint-disable no-return-await */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import {
	deleteManyUsersCall,
	deleteOneUserCall,
	getAllUsersCall,
	getOneUserCall,
	postUserCall,
	updateUserCall,
	getCurrentUserCall,
	postLoginUserCall,
	postRegisterUserCall,
} from './api'
import { UserModel } from '../../shared/models/UserModel'

interface UserState {
	list: any[]
	currentUser: UserModel | null
	entity: any
	status: string
	loginStatus: string
	error: string | null
	loading: boolean
}
const initialState: UserState = {
	list: [],
	currentUser: null,
	entity: null,
	status: '',
	loginStatus: '',
	error: '',
	loading: false,
}
export const loginUser = createAsyncThunk('users/loginUser', postLoginUserCall)
export const registerUser = createAsyncThunk('users/registerUser', postRegisterUserCall)
export const loginFromLocalstorage = createAsyncThunk('users/loginFormLocalstorage', getOneUserCall)

export const getAllUsers = createAsyncThunk('users/getAllUsers', getAllUsersCall)
export const getCurrentUser = createAsyncThunk('users/getCurrentUser', getCurrentUserCall)
export const getOneUser = createAsyncThunk('users/getOneUser', getOneUserCall)
export const postUser = createAsyncThunk('users/postUser', postUserCall)
export const updateUser = createAsyncThunk('users/updateUser', updateUserCall)
export const deleteOneUser = createAsyncThunk('users/deleteOneUser', deleteOneUserCall)
export const deleteManyUsers = createAsyncThunk('users/deleteManyUsers', deleteManyUsersCall)

// Create a slice containing the configuration of the state
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetUserState: () => initialState,
	},
	extraReducers: builder => {
		builder.addCase(loginUser.fulfilled, (state, { payload }) => {
			localStorage.setItem('user', payload.id)
			state.status = 'success'
			state.currentUser = payload
			state.error = ''
			state.loading = false
		})
		builder.addCase(loginUser.rejected, (state, { payload }) => {
			state.status = 'failed'
			state.error = payload as string
			state.loading = false
		})
		builder.addCase(loginUser.pending, state => {
			state.error = ''
			state.loading = true
		})
		builder.addCase(loginFromLocalstorage.fulfilled, (state, { payload }) => {
			state.status = 'success'
			state.currentUser = payload
		})

		builder.addCase(registerUser.fulfilled, (state, { payload }) => {
			localStorage.setItem('user', payload.id)
			state.status = 'success'
			state.currentUser = payload
		})

		builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
			state.status = 'successs'
			state.list = payload
		})

		builder.addCase(postUser.fulfilled, (state, { payload }) => {
			state.status = 'successs'
			state.list = [...state.list, payload]
		})

		builder.addCase(updateUser.fulfilled, (state, { payload }) => {
			state.status = 'successs'
			state.entity = payload

			const foundIndex = state.list.findIndex(x => x.id === payload.id)
			const newList = state.list
			newList[foundIndex] = payload

			state.list = [...newList]
		})

		builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
			state.loginStatus = 'successs'
			state.currentUser = payload
		})

		builder.addCase(getOneUser.fulfilled, (state, { payload }) => {
			state.status = 'successs'
			state.entity = payload
		})

		builder.addCase(deleteOneUser.fulfilled, (state, { payload }) => {
			state.status = 'successs'
			state.list = [...state.list.filter(p => p.id.toString() !== payload)]
		})
	},
})

export const selectUserState = (state: RootState) => state.users
export const selectUserLoginStatus = (state: RootState) => state.users.status
export const selectAllUsers = (state: RootState) => state.users.list
export const selectCurrentUser = (state: RootState) => state.users.currentUser
export const selectCurrentUserForEdit = (state: RootState) => state.users.entity
export const selectUserLoginLoadingState = (state: RootState) => state.users.loading
export const selectUserLoginError = (state: RootState) => state.users.error

// Export each reducers function defined in createSlice
export const { resetUserState } = userSlice.actions

// Export default the slice reducer
export default userSlice.reducer
