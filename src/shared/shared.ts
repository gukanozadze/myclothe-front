export const pageNavigation = [
	{ name: 'Products', to: '/' },
	{ name: 'Clothes Table', to: '/clothes', admin: true },
	{ name: 'Users Table', to: '/users', admin: true },
	{ name: 'Orders Table', to: '/orders', admin: true },
]

export const menuNavigation = [
	{ name: 'My Orders', to: '/myorders' },
	{ name: 'Logout', to: '/logout' },
]

export const user = {
	name: 'Demo demo',
	email: 'demo@example.com',
	imageUrl:
		'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

export const convertDate = (date: Date) => {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	const d = new Date(date)

	const minutes = d.getMinutes()
	const hour = d.getHours()
	const day = d.getDate()

	return `${day} ${monthNames[d.getMonth()]}, ${hour}:${minutes}`
}
