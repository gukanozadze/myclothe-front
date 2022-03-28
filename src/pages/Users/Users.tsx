import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { useAppDispatch } from '../../hooks'
import { getAllUsers } from '../../features/user/user-slice'
import UserTable from './UserTable'

const Users = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getAllUsers())
	}, [''])

	return (
		<Layout title='Users'>
			<div>
				<UserTable />
			</div>
		</Layout>
	)
}

export default Users
