/* eslint-disable no-alert */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useRef, useState } from 'react'
import Modal from '../../components/Modal'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'

import { postUser, updateUser, selectCurrentUserForEdit, getOneUser } from '../../features/user/user-slice'

const UserForm = () => {
	const params = useParams()
	const userId = params.id

	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const entity = useAppSelector(selectCurrentUserForEdit)

	const [email, setEmail] = useState('')
	const [full_name, setFullName] = useState('')
	const [password, setPassword] = useState('')
	const [password_confirm, setPasswordConfirm] = useState('')
	const [checked, setIsChecked] = useState(true)

	const btnRef = useRef<any>()
	const onSaveClick = () => {
		if (btnRef && btnRef.current) {
			btnRef.current.click()
		}
	}

	const onSubmit = (e: any) => {
		e.preventDefault()
		if (password !== password_confirm) {
			alert("passwords don't match")
			return 1
		}
		const data = {
			email,
			full_name,
			password,
			password_confirm,
			is_manager: checked,
		}

		if (userId) {
			dispatch(updateUser({ ...data, id: Number(userId) }))
		} else {
			dispatch(postUser(data))
		}

		return navigate(`/users`)
	}

	useEffect(() => {
		if (userId) {
			dispatch(getOneUser(userId))
		}
	}, [userId])

	useEffect(() => {
		if (userId && entity) {
			setEmail(entity.email)
			setFullName(entity.full_name)
			setIsChecked(entity.is_rental)
		}
	}, [entity])

	return (
		<Modal title='User' page='users' onSaveClick={onSaveClick}>
			<form className='pt-8 space-y-6 sm:pt-10 sm:space-y-5' onSubmit={onSubmit}>
				<div className='space-y-6 sm:space-y-5'>
					<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
						>
							email
						</label>
						<div className='mt-1 sm:mt-0 sm:col-span-2'>
							<input
								required
								type='email'
								name='email'
								id='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
								autoComplete='given-name'
								className='max-w-lg block w-full shadow-sm border p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
							/>
						</div>
					</div>

					<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
						<label
							htmlFor='full_name'
							className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
						>
							Full Name
						</label>
						<div className='mt-1 sm:mt-0 sm:col-span-2'>
							<input
								required
								type='text'
								name='full_name'
								id='full_name'
								value={full_name}
								onChange={e => setFullName(e.target.value)}
								autoComplete='given-name'
								className='max-w-lg block w-full shadow-sm border p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
							/>
						</div>
					</div>
					{!userId && (
						<>
							<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
								<label
									htmlFor='password'
									className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
								>
									password
								</label>
								<div className='mt-1 sm:mt-0 sm:col-span-2'>
									<input
										required
										type='password'
										name='password'
										id='password'
										value={password}
										onChange={e => setPassword(e.target.value)}
										className='max-w-lg block w-full shadow-sm border p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
									/>
								</div>
							</div>

							<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
								<label
									htmlFor='password_confirm'
									className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
								>
									Confirm password
								</label>
								<div className='mt-1 sm:mt-0 sm:col-span-2'>
									<input
										required
										type='password'
										name='password_confirm'
										id='password_confirm'
										value={password_confirm}
										onChange={e => setPasswordConfirm(e.target.value)}
										className='max-w-lg block w-full shadow-sm border p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
									/>
								</div>
							</div>
						</>
					)}

					<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5'>
						<label
							htmlFor='manager'
							className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
						>
							Is Manager
						</label>
						<div className='mt-1 sm:mt-0 sm:col-span-2'>
							<input
								name='manager'
								id='manager'
								type='checkbox'
								checked={checked}
								onChange={e => setIsChecked(e.target.checked)}
								autoComplete='manager'
								className='block max-w-lg w-full p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
							/>
						</div>
					</div>
				</div>
				<button type='submit' ref={btnRef} style={{ visibility: 'hidden' }} />
			</form>
		</Modal>
	)
}

export default UserForm
