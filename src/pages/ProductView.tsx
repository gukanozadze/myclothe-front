import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
	getOneProduct,
	selectCurrentProduct,
	selectProductState,
	updateProduct,
} from '../features/product/product-slice'
import { useParams } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { Rating } from '@mui/material'
import { selectUserState } from '../features/user/user-slice'
import { postOrder } from '../features/orders/order-slice'

type MyParams = {
	id: string
}

const ProductView = () => {
	const [rating, setRating] = useState<any>('')

	const params = useParams<keyof MyParams>() as MyParams
	const dispatch = useAppDispatch()
	const { entity, status } = useAppSelector(selectProductState)
	const { currentUser } = useAppSelector(selectUserState)

	useEffect(() => {
		dispatch(getOneProduct(params.id))
	}, [''])

	useEffect(() => {
		setRating(entity && entity.rating)
	}, [entity])

	const onRatingClick = (value: any) => {
		if (entity && currentUser) {
			const newRating = (entity.rating * entity.rating_count + value) / (entity.rating_count + 1)
			setRating(newRating)

			dispatch(
				updateProduct({
					...entity,
					rating: newRating,
					rating_count: entity.rating_count + 1,
					ratings: entity.ratings ? [...entity.ratings, currentUser.id] : [currentUser.id], // users which rated this bike
				})
			)
		}
	}

	const handleRent = () => {
		if (entity && currentUser) {
			dispatch(
				postOrder({
					complete: true,
					product_id: entity.id,
					user_id: currentUser.id,
				})
			)
			dispatch(
				updateProduct({
					...entity,
					is_rented: true,
					rented_by: currentUser.id,
				})
			)
		}
	}

	const handleCancelRent = () => {
		if (entity && currentUser) {
			dispatch(
				postOrder({
					complete: false,
					product_id: entity.id,
					user_id: currentUser.id,
				})
			)
			dispatch(
				updateProduct({
					...entity,
					is_rented: false,
					rented_by: null,
				})
			)
		}
	}

	if (!entity) {
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
						<h3 className='text-2xl font-extrabold text-gray-900 sm:text-3xl'>
							{entity.title}
							<span className='text-md ml-2 font-light text-gray-400 sm:text-lg'>
								Model - {entity.model}
							</span>
						</h3>
						<p className='mt-6 text-base text-gray-500'>{entity.description}</p>
						<p className='mt-6 text-base text-gray-500'>Color: {entity.color}</p>
						<p className='mt-6 text-base text-gray-500'>Location: {entity.location}</p>
						{entity.is_rental && (
							<div className='mt-8'>
								<div className='flex items-center'>
									<h4 className='flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600'>
										Whats included
									</h4>
									<div className='flex-1 border-t-2 border-gray-200' />
								</div>
								<ul className='mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5'>
									<li className='flex items-start lg:col-span-1'>
										<div className='flex-shrink-0'>
											<CheckCircleIcon
												className='h-5 w-5 text-green-400'
												aria-hidden='true'
											/>
										</div>
										<p className='ml-3 text-sm text-gray-700'>Available for Rental</p>
									</li>
								</ul>
							</div>
						)}
						<div>
							<Rating
								name='simple-controlled'
								className='mt-8'
								value={parseFloat(rating)}
								size='large'
								precision={0.5}
								readOnly={
									entity.ratings && entity.ratings.includes(currentUser?.id.toString())
								}
								onChange={(event, newValue) => {
									onRatingClick(newValue)
								}}
							/>
							<div className='text-gray-500'>Rated by {entity.rating_count} People</div>
							{entity.ratings && entity.ratings.includes(currentUser?.id.toString()) && (
								<div className='text-gray-400'>You have already rated</div>
							)}
						</div>
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
						{entity.is_rented && entity.rented_by === currentUser?.id ? (
							<div className='rounded-md shadow'>
								<button
									onClick={handleCancelRent}
									className='flex items-center w-full justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-800 hover:bg-red-900'
								>
									Cancel Rent
								</button>
							</div>
						) : (
							<div className='rounded-md shadow'>
								<button
									disabled={!entity.is_rental || entity.is_rented}
									onClick={handleRent}
									className='flex items-center w-full justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900'
								>
									Rent Now
								</button>
								{entity.is_rented && <div>This bike is already rented </div>}
							</div>
						)}
						{!entity.is_rental && (
							<p className='text-lg mt-4 font-medium text-red-500'>Not Available for rental</p>
						)}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default ProductView
