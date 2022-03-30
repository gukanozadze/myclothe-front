import { ProductModel } from './ProductModel'

export interface UserModel {
	id: number
	email: string
	is_manager: boolean
	full_name?: string
	products?: ProductModel[]
	orders?: any[]
	// orders?: Order[];
}

export interface UserForm {
	id?: number
	full_name?: string

	email: string
	password: string
	password_confirm: string
	is_manager: boolean
}
