import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import BikeTable from './BikeTable'
import { useAppDispatch } from '../../hooks'
import { getAllProducts } from '../../features/product/product-slice'

const Bikes = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getAllProducts())
	}, [''])

	return (
		<Layout title='Bikes'>
			<div>
				<BikeTable />
			</div>
		</Layout>
	)
}

export default Bikes
