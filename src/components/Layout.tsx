import React, { useState, useEffect } from 'react'
import { log } from 'util'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import Nav from './Nav'
import Title from './Title'
import { useAppDispatch, useAppSelector } from '../hooks'
import { loginFromLocalstorage, selectCurrentUser } from '../features/user/user-slice'

const defaultProps = {
	backButton: false,
}
type Props = {
	children: any
	title: string
	backButton?: boolean
} & typeof defaultProps

const Layout = ({ title, children, backButton }: Props) => {
	const [redirect, setRedirect] = useState(false)
	const dispatch = useAppDispatch()
	const user = useAppSelector(selectCurrentUser)

	useEffect(() => {
		const id = localStorage.getItem('user')
		if (id && !user) {
			dispatch(loginFromLocalstorage(id))
		}
	}, [''])
	return (
		<div className='min-h-full'>
			<div className='bg-gray-800 pb-32'>
				<Nav />

				<Title title={title} backButton={backButton} />
			</div>

			<main className='-mt-32'>
				<div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
					<div className='bg-white rounded-lg shadow px-5 py-6 sm:px-6 '>
						<div className='rounded-lg'>{children}</div>
					</div>
				</div>
			</main>
		</div>
	)
}
Layout.defaultProps = defaultProps

export default Layout
