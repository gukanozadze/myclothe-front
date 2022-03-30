import React, { useState } from 'react'
import { Button } from '@mui/material'
import { getAllProducts } from '../../features/product/product-slice'
import { useAppDispatch } from '../../hooks'

const ProductFilters = () => {
	const [model, setModel] = useState('')
	const [color, setColor] = useState('')
	const [location, setLocation] = useState('')
	const [min_rate, setMinRate] = useState('')
	const [max_rate, setMaxRate] = useState('null')

	const dispatch = useAppDispatch()

	const handleSearch = () => {
		dispatch(getAllProducts({ model, color, location, min_rate, max_rate }))
	}

	return (
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
	)
}

export default ProductFilters
