import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import { useAppSelector } from '../../hooks'
import { selectAllOrders } from '../../features/order/order-slice'
import { Link } from 'react-router-dom'
import { convertDate } from '../../shared/shared'

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 70 },

	{ field: 'email', headerName: 'User', flex: 3 },
	{ field: 'time', headerName: 'Time', type: 'dateTime', flex: 2 },
	{
		field: 'title',
		headerName: 'Name',
		flex: 4,
		renderCell: cell => (
			<Link className='text-blue-500' to={`/product/${cell.row.product_id}`}>
				{cell.value}
			</Link>
		),
	},
	{
		field: 'price',
		width: 110,
		headerName: 'Price',
		renderCell: cell => <div className='ml-2 text-lg'>${cell.value}</div>,
	},
]

const OrdersTable = () => {
	const rows = useAppSelector(selectAllOrders)
	const flattenedRows = rows.map(row => {
		if (row.user && row.product) {
			return {
				id: row.id,
				completed: row.completed,
				time: convertDate(row.created_at),
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
					Here you can find all the orders and users who bought clothes
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

export default OrdersTable
