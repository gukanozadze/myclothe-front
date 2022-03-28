import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { getAllProducts, selectAllProducts } from '../features/product/product-slice'
import { useAppDispatch, useAppSelector } from '../hooks'

const Products = () => {
	const dispatch = useAppDispatch()
	const products = useAppSelector(selectAllProducts)

	const [model, setModel] = useState('')
	const [color, setColor] = useState('')
	const [location, setLocation] = useState('')
	const [min_rate, setMinRate] = useState('')
	const [max_rate, setMaxRate] = useState('null')

	useEffect(() => {
		dispatch(getAllProducts())
	}, [''])

	const handleSearch = () => {
		dispatch(getAllProducts({ model, color, location, min_rate, max_rate }))
	}
	return (
		<Layout title='Bikes'>
			<div className='flex gap-4'>
				<label className='relative block'>
					<span className='sr-only'>Model</span>
					<span className='absolute inset-y-0 left-0 flex items-center pl-2'>
						<svg className='h-5 w-5 fill-slate-300' viewBox='0 0 20 20' />
					</span>
					<input
						className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
						placeholder='Model...'
						type='text'
						name='model'
						value={model}
						onChange={e => setModel(e.target.value)}
					/>
				</label>

				<label className='relative block'>
					<span className='sr-only'>Color</span>
					<span className='absolute inset-y-0 left-0 flex items-center pl-2'>
						<svg className='h-5 w-5 fill-slate-300' viewBox='0 0 20 20' />
					</span>
					<input
						className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
						placeholder='Color...'
						type='text'
						name='color'
						value={color}
						onChange={e => setColor(e.target.value)}
					/>
				</label>

				<label className='relative block'>
					<span className='sr-only'>Location</span>
					<span className='absolute inset-y-0 left-0 flex items-center pl-2'>
						<svg className='h-5 w-5 fill-slate-300' viewBox='0 0 20 20' />
					</span>
					<input
						className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
						placeholder='Location...'
						type='text'
						name='location'
						value={location}
						onChange={e => setLocation(e.target.value)}
					/>
				</label>

				<label className='relative block'>
					<span className='sr-only'>Rate Min</span>
					<span className='absolute inset-y-0 left-0 flex items-center pl-2'>
						<svg className='h-5 w-5 fill-slate-300' viewBox='0 0 20 20' />
					</span>
					<input
						className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
						placeholder='Min Rate...'
						type='number'
						name='Min Rate...'
						value={min_rate}
						onChange={e => setMinRate(e.target.value)}
					/>
				</label>

				<label className='relative block'>
					<span className='sr-only'>Rate Max</span>
					<span className='absolute inset-y-0 left-0 flex items-center pl-2'>
						<svg className='h-5 w-5 fill-slate-300' viewBox='0 0 20 20' />
					</span>
					<input
						className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
						placeholder='Max Rate...'
						type='number'
						name='Max rate'
						value={max_rate}
						onChange={e => setMaxRate(e.target.value)}
					/>
				</label>

				<Button onClick={handleSearch}>Search</Button>
			</div>

			<div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
				{products.map(product => (
					<div key={product.id} className='group relative'>
						<div className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
							<img
								src={product.image}
								alt={'bike'}
								className='w-full h-full object-center object-cover lg:w-full lg:h-full'
							/>
						</div>
						<div className='mt-4 flex justify-between'>
							<div>
								<h3 className='text-sm text-gray-700'>
									<Link to={`product/${product.id}`}>
										<span aria-hidden='true' className='absolute inset-0' />
										{product.title} -{' '}
										<span className='text-gray-400'>{product.model}</span>
									</Link>
								</h3>
								<p className='mt-1 text-sm text-gray-600'>{product.location}</p>

								<p className='mt-1 text-sm text-gray-500'>{product.color}</p>
							</div>
							<p className='text-sm font-medium text-gray-900'>${product.price}</p>
						</div>
					</div>
				))}
			</div>
		</Layout>
	)
}

export default Products
