export interface Product {
	id: number
	title: string
	description: string
	image: string
	price: number
	model: string
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
