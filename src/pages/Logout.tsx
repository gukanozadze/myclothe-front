import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetProductState } from '../features/product/product-slice'
import { resetUserState } from '../features/user/user-slice'
import { useAppDispatch } from '../hooks'

const Logout = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	useEffect(() => {
		localStorage.removeItem('user')
		dispatch(resetUserState())
		dispatch(resetProductState())
		navigate('/login')
	}, [''])

	return <div>loading</div>
}

export default Logout
