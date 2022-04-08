/* eslint-disable no-unused-vars */
import axios from 'axios'
import { UserForm } from '../../shared/models/UserModel'

interface LoginForm {
	email: string
	password: string
}
export async function postLoginUserCall(data: LoginForm, { rejectWithValue }: any) {
	try {
		const response = await axios.post('login', data)
		return response.data
	} catch (e: any) {
		if (!e.response) {
			return rejectWithValue('Server error')
		}
		return rejectWithValue(e.response.data.message)
	}
}
export async function postRegisterUserCall(data: {
	email: string
	password: string
	password_confirm: string
	is_manager: boolean
}) {
	const response = await axios.post('register', data)
	return response.data
}

export async function getCurrentUserCall() {
	const response = await axios.get('user')
	return response.data
}

export async function getAllUsersCall() {
	const response = await axios.get('users')
	return response.data
}
export async function getOneUserCall(id: string) {
	const response = await axios.get(`users/${id}`)
	return response.data
}

export async function postUserCall(data: UserForm) {
	const response = await axios.post(`register`, data)
	return response.data
}

export async function updateUserCall(data: UserForm) {
	const response = await axios.put(`user/update/${data.id}`, data)
	return response.data
}

export async function deleteOneUserCall(id: string) {
	const response = await axios.delete(`users/${id}`)
	return response.data
}

export async function deleteManyUsersCall(UserIds: number[]) {
	const response = await axios.delete(`users`)
	return response.data
}
