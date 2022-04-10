/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Navigate, Route } from 'react-router-dom'

const PrivateRoute = ({ children, ...rest }: any) => {
	const userToken = localStorage.getItem('user')

	return userToken ? children : <Navigate to='/login' />
}

export default PrivateRoute
