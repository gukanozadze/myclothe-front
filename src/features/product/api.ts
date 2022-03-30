import axios from 'axios'

export async function getAllProductsCall(params = {}) {
	const response = await axios.get('products', { params })
	return response.data
}
export async function getOneProductCall(id: string) {
	const response = await axios.get(`products/${id}`)
	return response.data
}

export async function postProductCall(data: any) {
	const response = await axios.post(`products`, data)
	return response.data
}

export async function updateProductCall(data: any) {
	const response = await axios.put(`products/${data.id}`, data)
	return response.data
}

export async function deleteOneProductCall(id: string) {
	const response = await axios.delete(`products/${id}`)
	return id
}

export async function deleteManyProductsCall(id: string) {
	const response = await axios.get(`products/${id}`)
	return response.data
}
