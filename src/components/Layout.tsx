import React, { useState, useEffect } from 'react'
import Header from './Header'
import Title from './Title'
import { useAppDispatch, useAppSelector } from '../hooks'
import { loginFromLocalstorage, selectCurrentUser } from '../features/user/user-slice'
import { useNavigate } from 'react-router-dom'

const defaultProps = {
	backButton: false,
}
type Props = {
	children: any
	title: string
	backButton?: boolean
} & typeof defaultProps

const Layout = ({ title, children, backButton }: Props) => {
	const navigate = useNavigate()

	const dispatch = useAppDispatch()
	const user = useAppSelector(selectCurrentUser)

	useEffect(() => {
		const user_token = localStorage.getItem('user')
		if (user_token && !user) {
			dispatch(loginFromLocalstorage(user_token))
		}
	}, [''])

	return (
		<div className='min-h-full'>
			<div className='bg-indigo-600 pb-32'>
				<Header />

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
