import React from 'react'
import Modal from '../../shared/Modal'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { postProduct, deleteOneProduct } from '../../features/product/product-slice'

const BikeDelete = () => {
	const params = useParams()
	const bikeId = params.id || ''
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const saveClick = () => {
		dispatch(deleteOneProduct(bikeId))
		return navigate('/bikes')
	}
	return <Modal title='Bike' page='bikes' del saveClick={saveClick} />
}

export default BikeDelete
