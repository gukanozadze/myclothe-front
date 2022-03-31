import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { useAppDispatch } from '../../hooks'
import { getAllUsers } from '../../features/user/user-slice'
import UsersTable from './UsersTable'

const Users = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getAllUsers())
	}, [''])

	return (
		<Layout title='Users'>
			<div>
				<UsersTable />
			</div>
		</Layout>
	)
}

export default Users
