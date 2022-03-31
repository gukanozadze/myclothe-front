export const shared = (...classes: string[]) => {
	return classes.filter(Boolean).join(' ')
}

export const pageNavigation = [
	{ name: 'Products', to: '/' },
	{ name: 'Clothes', to: '/clothes', admin: true },
	{ name: 'Users', to: '/users', admin: true },
	{ name: 'Orders', to: '/orders', admin: true },
]

export const menuNavigation = [
	{ name: 'profile', to: '/profile' },
	{ name: 'Logout', to: '/logout' },
]

export const user = {
	name: 'Tom Cook',
	email: 'tom@example.com',
	imageUrl:
		'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
