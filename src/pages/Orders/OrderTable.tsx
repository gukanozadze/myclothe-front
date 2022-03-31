import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import { useAppSelector } from '../../hooks'
import { selectAllOrders } from '../../features/order/order-slice'
import { Link } from 'react-router-dom'

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 70 },

	{ field: 'email', headerName: 'User', width: 200 },
	{ field: 'time', type: 'dateTime', width: 200 },
	{
		field: 'title',
		headerName: 'Clothe Name',
		width: 150,
		renderCell: cell => {
			return (
				<Link className='text-blue-500' to={`/product/${cell.row.product_id}`}>
					{cell.value}
				</Link>
			)
		},
	},
	{ field: 'price', headerName: 'Clothe Price', width: 150 },
	{
		field: 'complete',
		headerName: 'Action',
		renderCell: cell => (cell.value === true ? 'Rented' : 'Canceled'),
		width: 230,
	},
]

const OrderTable = () => {
	const rows = useAppSelector(selectAllOrders)
	const flattenedRows = rows.map(row => {
		if (row.user && row.product) {
			return {
				id: row.id,
				complete: row.complete,
				time: new Date(row.time),
				email: row.user.email,
				product_id: row.product_id,
				title: row.product.title,
				price: row.product.price,
			}
		}

		return row
	})
	return (
		<div style={{ height: 500, width: '100%', marginBottom: '10rem' }}>
			<div className='flex flex-col justify-between mb-4'>
				<Typography sx={{ flex: '1 1 100%' }} variant='h5' id='tableTitle' component='div'>
					Orders
				</Typography>
				<div className='text-gray-600'>
					Here you can find all the bikes and users who rented and canceled bikes
				</div>
			</div>
			<DataGrid
				rows={flattenedRows}
				columns={columns}
				pagination
				rowsPerPageOptions={[5, 10, 25, 100]}
			/>
		</div>
	)
}

export default OrderTable
