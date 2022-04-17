import React from 'react'
import Modal from '../../components/Modal'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { deleteOneProduct } from '../../features/product/product-slice'

const ClotheDelete = () => {
	const params = useParams()
	const bikeId = params.id || ''
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const onSaveClick = () => {
		dispatch(deleteOneProduct(bikeId))
		return navigate('/clothes')
	}
	return <Modal title='Clothe' page='clothes' del onSaveClick={onSaveClick} />
}

export default ClotheDelete
