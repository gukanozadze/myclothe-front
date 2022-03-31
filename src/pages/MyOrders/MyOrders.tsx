import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getAllOrdersByUser, selectAllOrders } from '../../features/order/order-slice'
import { selectCurrentUser } from '../../features/user/user-slice'
import OrderCard from './OrderCard'

const MyOrders = () => {
	const dispatch = useAppDispatch()
	const currentUser = useAppSelector(selectCurrentUser)
	const orders = useAppSelector(selectAllOrders)
	console.log('🚀 ~ file: MyOrders.tsx ~ line 11 ~ MyOrders ~ orders', orders)

	useEffect(() => {
		if (currentUser) {
			dispatch(getAllOrdersByUser(currentUser.id))
		}
	}, [currentUser])

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
