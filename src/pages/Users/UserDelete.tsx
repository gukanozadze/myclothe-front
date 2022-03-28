import React from 'react'
import Modal from '../../shared/Modal'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { postProduct, deleteOneProduct } from '../../features/product/product-slice'
import { deleteOneUser, selectCurrentUser } from '../../features/user/user-slice'

const UserDelete = () => {
	const params = useParams()
	const userId = params.id || ''
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const currentUser = useAppSelector(selectCurrentUser)

	const saveClick = () => {
		dispatch(deleteOneUser(userId))
		return navigate('/users')
	}
	if (userId.toString() === currentUser?.id.toString()) {
		return (
			<Modal title='User' page='users'>
				You Can not delete your self
			</Modal>
		)
	}
	return <Modal title='User' page='users' del saveClick={saveClick} />
}

export default UserDelete
