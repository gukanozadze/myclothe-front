import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/outline'

type Props = {
	title: string
	backButton: boolean
}

const Title = ({ title, backButton }: Props) => {
	const navigate = useNavigate()

	return (
		<header className='py-10'>
			<div className='flex gap-4 justify max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{backButton && (
					<button
						onClick={() => navigate(-1)}
						className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 border border-blue-500 hover:border-transparent rounded-full'
					>
						<ChevronLeftIcon className='block h-4 w-8 text-white' aria-hidden='true' />
					</button>
				)}
				<h1 className='text-3xl font-bold text-white'>{title}</h1>
			</div>
		</header>
	)
}

export default Title
