import { Link, useNavigate } from 'react-router-dom'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { loginUser, selectUserLoginStatus } from '../features/user/user-slice'
import { useAppDispatch, useAppSelector } from '../hooks'

const Login = () => {
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const status = useAppSelector(selectUserLoginStatus)
	const [error, setError] = useState('')

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault()
		dispatch(loginUser({ email, password }))
	}

	const demoLogin = () => {
		dispatch(loginUser({ email: 'gukanozadze@gmail.com', password: '123' }))
	}
	useEffect(() => {
		if (localStorage.getItem('user') || status === 'success') {
			navigate('/')
		}
	}, [status])

	return (
		<div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<img
					className='mx-auto h-12 w-auto'
					src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
					alt='Workflow'
				/>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
					Sign in to your account
				</h2>
				<p className='mt-2 text-center text-sm text-gray-600'>
					Or{' '}
					<Link to='/register' className='font-medium text-indigo-600 hover:text-indigo-500'>
						Register here
					</Link>
				</p>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<form onSubmit={onSubmit} className='space-y-6'>
						<div>
							<label htmlFor='email' className='block text-sm font-medium text-gray-700'>
								Email address
							</label>
							<div className='mt-1'>
								<input
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									required
									value={email}
									onChange={e => setEmail(e.target.value)}
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
								Password
							</label>
							<div className='mt-1'>
								<input
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									value={password}
									onChange={e => setPassword(e.target.value)}
									required
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								Sign in
							</button>
						</div>

						<div>
							<button
								onClick={demoLogin}
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								Instant Demo Login
							</button>
						</div>
					</form>
					{error && <div className='mt-4 text-red-500'>{error}</div>}
				</div>
			</div>
		</div>
	)
}

export default Login
