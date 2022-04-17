import React from 'react'
import Modal from '../../components/Modal'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
	deleteOneUser,
	selectCurrentUser,
} from '../../features/user/user-slice'

const UserDelete = () => {
	const params = useParams()
	const userId = params.id || ''
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const currentUser = useAppSelector(selectCurrentUser)

	const onSaveClick = () => {
		dispatch(deleteOneUser(userId))
		return navigate('/users')
	}
	if (userId.toString() === currentUser?.id.toString()) {
		return (
			<Modal title='User' page='users'>
				<div>You Can not delete your self</div>
			</Modal>
		)
	}
	return <Modal title='User' page='users' del onSaveClick={onSaveClick} />
}

export default UserDelete
