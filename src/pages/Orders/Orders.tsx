import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { useAppDispatch } from '../../hooks'
import { getAllOrders } from '../../features/order/order-slice'
import OrderTable from './OrderTable'

const Orders = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getAllOrders())
	}, [''])

	return (
		<Layout title='Orders'>
			<div>
				<OrderTable />
			</div>
		</Layout>
	)
}

export default Orders
