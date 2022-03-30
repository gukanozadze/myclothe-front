import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getOneProduct, selectProductState, updateProduct } from '../../features/product/product-slice'
import { useParams } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { selectUserState } from '../../features/user/user-slice'
import { postOrder } from '../../features/orders/order-slice'
import ProductRating from './ProductRating'

type UrlParams = {
	id: string
}

const ProductView = () => {
	const params = useParams<keyof UrlParams>() as UrlParams
	const dispatch = useAppDispatch()
	const { entity, status } = useAppSelector(selectProductState)
	const { currentUser } = useAppSelector(selectUserState)

	useEffect(() => {
		dispatch(getOneProduct(params.id))
	}, [''])

	const handleBuy = () => {
		if (entity && currentUser) {
			dispatch(
				postOrder({
					product_id: entity.id,
					user_id: currentUser.id,
				})
			)
			dispatch(
				updateProduct({
					...entity,
					stock: entity.stock - 1,
				})
			)
		}
	}

	if (!entity || !currentUser) {
		return (
			<Layout title='Back' backButton>
				<div>Loading</div>
			</Layout>
		)
	}

	return (
		<Layout title='Back' backButton>
			<div className='flex rounded-lg shadow-lg flex-col sm:flex-row pb-6'>
				<div className='max-w-lg mr-auto overflow-hidden lg:max-w-none lg:flex justify-between'>
					<div className='bg-white px-6 py-8 lg:p-12'>
						<h3 className='text-2xl font-extrabold text-gray-900 sm:text-3xl'>{entity.title}</h3>
						<p className='mt-6 text-base text-gray-500'>{entity.description}</p>
						<div className='mt-8'>
							<div className='flex items-center'>
								<h4 className='flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600'>
									Whats included
								</h4>
								<div className='flex-1 border-t-2 border-gray-200' />
							</div>
							<ul className='mt-2 flex flex-col gap-2'>
								<li className='flex items-start lg:col-span-1'>
									<div className='flex-shrink-0'>
										<CheckCircleIcon
											className='h-5 w-5 text-green-400'
											aria-hidden='true'
										/>
									</div>
									<p className='ml-3 text-sm text-gray-700'>Free & Fast delivery</p>
								</li>

								<li className='flex items-start lg:col-span-1'>
									<div className='flex-shrink-0'>
										<CheckCircleIcon
											className='h-5 w-5 text-green-400'
											aria-hidden='true'
										/>
									</div>
									<p className='ml-3 text-sm text-gray-700'>100% cotton</p>
								</li>
							</ul>
						</div>

						<ProductRating entity={entity} currentUser={currentUser} />

						<div className='mt-4 text-gray-400'>
							Posted By - {entity.user && (entity.user.full_name || entity.user.email)}
						</div>
					</div>
					<img
						src={entity.image}
						alt={'bike'}
						className='w-full lg:w-2/5 object-center object-cover'
					/>
				</div>

				<div className='py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12'>
					<div className='mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900'>
						<span>${entity.price}</span>
						<span className='ml-3 text-xl font-medium text-gray-500'>USD</span>
					</div>
					<div className='mt-6'>
						<div className='rounded-md shadow'>
							<button
								onClick={handleBuy}
								disabled={!entity.stock}
								className='flex items-center w-full justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900'
							>
								Buy Now
							</button>
						</div>
						{!entity.stock ? (
							<p className='text-lg mt-4 font-medium text-red-500'>Out of stock</p>
						) : (
							<p className='text-sm mt-4 font-medium text-gray-500'>
								Available - {entity.stock}
							</p>
						)}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default ProductView
