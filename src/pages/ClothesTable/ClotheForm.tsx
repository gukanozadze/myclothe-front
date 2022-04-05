/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-no-bind */
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Modal from '../../components/Modal'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
	postProduct,
	getOneProduct,
	selectCurrentProduct,
	updateProduct,
} from '../../features/product/product-slice'
import { selectCurrentUser } from '../../features/user/user-slice'

const ClotheForm = () => {
	const params = useParams()
	const bikeId = params.id

	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const entity = useAppSelector(selectCurrentProduct)
	const currentUser = useAppSelector(selectCurrentUser)

	const [title, setTitle] = useState('Stripped Hoodie')
	const [description, setDescription] = useState('Hoodie designed by general kiioshi')
	const [price, setPrice] = useState('')
	const [image, setImageUrl] = useState('https://cf.shopee.ph/file/de6128223b8d2b854a1567ed335f2204')
	const [stock, setStock] = useState<number | string>(1)

	const btnRef = useRef<any>()
	const saveClick = () => {
		if (btnRef && btnRef.current) {
			btnRef.current.click()
		}
	}

	const onSubmit = (e: any) => {
		e.preventDefault()
		const data = {
			title,
			description,
			price,
			image,
			stock: stock || 0,
			user_id: currentUser?.id,
		}
		if (bikeId) {
			dispatch(updateProduct({ ...data, id: bikeId }))
		} else {
			dispatch(postProduct({ ...data, user_id: currentUser?.id }))
		}
		return navigate(`/clothes`)
	}

	useEffect(() => {
		if (bikeId) {
			dispatch(getOneProduct(bikeId))
		}
	}, [bikeId])

	useEffect(() => {
		if (bikeId && entity) {
			setTitle(entity.title)
			setDescription(entity.description)
			setPrice(entity.price.toString())
			setStock(entity.stock)
		}
	}, [entity])

	return (
		<Modal title='Clothe' page='clothes' saveClick={saveClick}>
			<form className='pt-8 space-y-6 sm:pt-10 sm:space-y-5' onSubmit={onSubmit}>
				<div className='space-y-6 sm:space-y-5'>
					<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
						<label
							htmlFor='price'
							className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
						>
							Price
						</label>
						<div className='mt-1 sm:mt-0 sm:col-span-2'>
							<input
								required
								type='number'
								name='price'
								id='price'
								value={price}
								onChange={e => setPrice(e.target.value)}
								autoComplete='given-name'
								className='max-w-lg block w-full shadow-sm border p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
							/>
						</div>
					</div>

					<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
						<label
							htmlFor='title'
							className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
						>
							Title
						</label>
						<div className='mt-1 sm:mt-0 sm:col-span-2'>
							<input
								required
								type='text'
								name='title'
								id='title'
								value={title}
								onChange={e => setTitle(e.target.value)}
								autoComplete='given-name'
								className='max-w-lg block w-full shadow-sm border p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
							/>
						</div>
					</div>

					<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
						<label
							htmlFor='description'
							className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
						>
							Description
						</label>
						<div className='mt-1 sm:mt-0 sm:col-span-2'>
							<input
								required
								type='text'
								name='description'
								id='description'
								value={description}
								onChange={e => setDescription(e.target.value)}
								className='max-w-lg block w-full shadow-sm border p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
							/>
						</div>
					</div>

					<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
						<label
							htmlFor='image'
							className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
						>
							Image URL
						</label>
						<div className='mt-1 sm:mt-0 sm:col-span-2'>
							<input
								required
								type='text'
								name='image'
								id='image'
								value={image}
								onChange={e => setImageUrl(e.target.value)}
								className='max-w-lg block w-full shadow-sm border p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
							/>
						</div>
					</div>

					<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
						<label
							htmlFor='stock'
							className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
						>
							stock
						</label>
						<div className='mt-1 sm:mt-0 sm:col-span-2'>
							<input
								required
								type='number'
								name='stock'
								id='stock'
								value={stock}
								onChange={e =>
									e.target.value ? setStock(Number(e.target.value)) : setStock('')
								}
								autoComplete='stock'
								className='block max-w-lg w-full shadow-sm border p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
							/>
						</div>
					</div>
				</div>
				<button type='submit' ref={btnRef} style={{ visibility: 'hidden' }} />
			</form>
		</Modal>
	)
}

export default ClotheForm
