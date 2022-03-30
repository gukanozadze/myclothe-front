import React, { useState, useEffect } from 'react'
import { Rating } from '@mui/material'
import { updateProduct } from '../../features/product/product-slice'
import { useAppDispatch } from '../../hooks'
import { ProductModel } from '../../shared/models/ProductModel'
import { UserModel } from '../../shared/models/UserModel'

interface Props {
	entity: ProductModel
	currentUser: UserModel
}
const ProductRating = ({ entity, currentUser }: Props) => {
	const [rating, setRating] = useState<any>('')

	const dispatch = useAppDispatch()

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

	return (
		<div>
			<Rating
				name='simple-controlled'
				className='mt-8'
				value={parseFloat(rating)}
				size='large'
				precision={0.5}
				readOnly={!!(entity.ratings && entity.ratings.includes(currentUser?.id.toString()))}
				onChange={(event, newValue) => {
					onRatingClick(newValue)
				}}
			/>
			<div className='text-gray-500'>Rated by {entity.rating_count} People</div>
			{entity.ratings && entity.ratings.includes(currentUser?.id.toString()) && (
				<div className='text-gray-400'>You have already rated</div>
			)}
		</div>
	)
}

export default ProductRating
