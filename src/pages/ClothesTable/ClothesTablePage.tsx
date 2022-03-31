import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import ClotheTable from './ClothesTable'
import { useAppDispatch } from '../../hooks'
import { getAllProducts } from '../../features/product/product-slice'

const ClothesTablePage = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getAllProducts())
	}, [''])

	return (
		<Layout title='Clothes'>
			<div>
				<ClotheTable />
			</div>
		</Layout>
	)
}

export default ClothesTablePage
