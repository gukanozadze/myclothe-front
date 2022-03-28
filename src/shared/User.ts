import { Product } from './Product'

export interface User {
	id: number
	email: string
	is_manager: boolean
	full_name?: string
	products?: Product[]
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
