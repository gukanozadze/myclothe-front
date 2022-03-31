import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { useAppDispatch } from '../../hooks'
import { getAllOrders } from '../../features/order/order-slice'
import OrdersTable from './OrdersTable'

const OrderTablePage = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getAllOrders())
	}, [''])

	return (
		<Layout title='Orders'>
			<div>
				<OrdersTable />
			</div>
		</Layout>
	)
}

export default OrderTablePage
