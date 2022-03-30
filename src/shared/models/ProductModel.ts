export interface ProductModel {
	id: number
	title: string
	description: string
	image: string
	price: number
	model: string
	stock: number
	color: string
	location: string
	rating: number
	rating_count: number
	ratings: any[]
	is_rental: boolean
	is_rented: boolean
	rented_by: number
	user_id: number
	user?: any
}
