import axios from 'axios'
import { OrderForm } from '../../shared/models/OrderForm'

export async function postOrderCall(data: OrderForm) {
	const response = await axios.post('orders', data)
	return response.data
}
export async function getAllOrdersCall() {
	const response = await axios.get(`orders`)
	return response.data
}
