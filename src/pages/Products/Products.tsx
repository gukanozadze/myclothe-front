import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import ListLoader from '../../components/loaders/ListLoader'
import {
	getAllProducts,
	selectAllProducts,
	selectProductListLoading,
} from '../../features/product/product-slice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import ProductCard from './ProductCard'
import ProductFilters from './ProductFilters'

const Products = () => {
	const dispatch = useAppDispatch()
	const products = useAppSelector(selectAllProducts)
	const loading = useAppSelector(selectProductListLoading)

	useEffect(() => {
		dispatch(getAllProducts())
	}, [''])

	return (
		<Layout title='Clothes'>
			<div className='overflow-hidden'>
				{loading && products.length < 1 ? (
					<ListLoader />
				) : (
					<>
						<ProductFilters />
						<div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
							{products.map(product => (
								<ProductCard product={product} />
							))}
						</div>
					</>
				)}
			</div>
		</Layout>
	)
}

export default Products
