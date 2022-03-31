import React from 'react'
import { Link } from 'react-router-dom'
import { ProductModel } from '../../shared/models/ProductModel'
import { Rating } from '@mui/material'

interface Props {
	product: ProductModel
}

const ProductCard = ({ product }: Props) => {
	return (
		<div key={product.id} className='group relative'>
			<div className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
				<img
					src={product.image}
					alt='clothe'
					className='w-full h-full object-center object-cover lg:w-full lg:h-full'
				/>
			</div>
			<div className='mt-4 flex justify-between'>
				<div>
					<h3 className='text-sm text-gray-700'>
						<Link to={`product/${product.id}`}>
							<span aria-hidden='true' className='absolute inset-0' />
							{product.title}
						</Link>
					</h3>
					<Rating
						name='simple-controlled'
						className='-ml-1'
						value={product.rating}
						precision={0.5}
						readOnly
					/>
					{/* <p className='mt-1 text-sm text-gray-500'>{product.title}</p> */}
				</div>
				<p className='text-sm font-medium text-gray-900'>${product.price}</p>
			</div>
		</div>
	)
}

export default ProductCard
