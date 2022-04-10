import React, { SyntheticEvent, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, selectUserLoginStatus } from '../features/user/user-slice'

const Register = () => {
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [password_confirm, setPasswordConfirm] = useState('')
	const [is_manager, setIsManager] = useState(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const status = useAppSelector(selectUserLoginStatus)

	const [error, setError] = useState('')

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault()

		dispatch(
			registerUser({
				password,
				is_manager,
				email,
				password_confirm,
			})
		)
	}

	useEffect(() => {
		if (localStorage.getItem('user')) {
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
					Create a new account
				</h2>
				<p className='mt-2 text-center text-sm text-gray-600'>
					Or{' '}
					<Link to='/login' className='font-medium text-indigo-600 hover:text-indigo-500'>
						Login here
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
									value={email}
									onChange={e => setEmail(e.target.value)}
									required
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
							<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
								Confirm Password
							</label>
							<div className='mt-1'>
								<input
									id='confim_password'
									name='confim_password'
									type='password'
									autoComplete='current-confim_password'
									value={password_confirm}
									onChange={e => setPasswordConfirm(e.target.value)}
									required
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
								/>
							</div>
						</div>

						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<input
									id='remember-me'
									name='remember-me'
									type='checkbox'
									onChange={e => setIsManager(e.target.checked)}
									className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
								/>
								<label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
									Manager
								</label>
							</div>
						</div>
						<div className='text-red-600'>{error}</div>
						<div>
							<button
								type='submit'
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register
