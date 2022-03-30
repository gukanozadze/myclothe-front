import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { getAllProducts, selectAllProducts } from '../../features/product/product-slice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import Product from './Product'
import ProductFilters from './ProductFilters'

const Products = () => {
	const dispatch = useAppDispatch()
	const products = useAppSelector(selectAllProducts)

	useEffect(() => {
		dispatch(getAllProducts())
	}, [''])

	return (
		<Layout title='Clothes'>
			<ProductFilters />

			<div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
				{products.map(product => (
					<Product product={product} />
				))}
			</div>
		</Layout>
	)
}

export default Products
