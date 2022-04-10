import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getAllOrdersByUser, selectAllOrders, selectOrderLoading } from '../../features/order/order-slice'
import { selectCurrentUser } from '../../features/user/user-slice'
import OrderCard from './OrderCard'
import OrdersLoader from '../../components/loaders/OrdersLoader'

const MyOrders = () => {
	const dispatch = useAppDispatch()
	const currentUser = useAppSelector(selectCurrentUser)
	const orders = useAppSelector(selectAllOrders)
	const loading = useAppSelector(selectOrderLoading)

	useEffect(() => {
		if (currentUser) {
			dispatch(getAllOrdersByUser(currentUser.id))
		}
	}, [currentUser])

	if (loading) {
		return (
			<Layout title='My Orders'>
				<OrdersLoader />
			</Layout>
		)
	}
	return (
		<Layout title='My Orders'>
			<div className='bg-white shadow overflow-hidden sm:rounded-md'>
				<ul className='divide-y divide-gray-200'>
					{orders.map(order => (
						<OrderCard order={order} />
					))}
				</ul>
			</div>
		</Layout>
	)
}

export default MyOrders
