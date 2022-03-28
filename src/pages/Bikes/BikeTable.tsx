import React, { useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import { useAppSelector } from '../../hooks'
import { selectAllProducts } from '../../features/product/product-slice'
import { Button, Rating } from '@mui/material'
import BikeForm from './BikeForm'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link, Route, Routes } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import BikeDelete from './BikeDelete'

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'title', headerName: 'Title', width: 130 },
	{ field: 'model', headerName: 'Model', width: 130 },
	{
		field: 'color',
		headerName: 'Color',
		width: 130,
	},
	{
		field: 'location',
		headerName: 'Location',
		width: 130,
	},
	{
		field: 'rating',
		renderCell: cell => <Rating name='read-only' value={parseFloat(cell.value)} readOnly />,
		type: 'number',
		headerName: 'Rating',
		width: 150,
	},
	{
		field: 'is_rental',
		type: 'boolean',
		headerName: 'For Rent',
		sortable: false,
		width: 160,
	},
	// {
	// 	field: 'available',
	// 	type: 'boolean',
	// 	headerName: 'Available',
	// 	sortable: false,
	// 	width: 160,
	// },
	{
		field: 'action',
		headerName: 'Action',
		sortable: false,
		renderCell: params => {
			return (
				<div className='flex justify-around w-full'>
					<Link to={`/bikes/edit/${params.row.id}`}>
						<EditIcon className='cursor-pointer text-blue-500' />
					</Link>

					<Link to={`/bikes/delete/${params.row.id}`}>
						<DeleteIcon className='cursor-pointer text-red-500' />
					</Link>
				</div>
			)
		},
	},
]

const BikeTable = () => {
	const rows = useAppSelector(selectAllProducts)

	return (
		<div style={{ height: 500, width: '100%', marginBottom: '10rem' }}>
			<Routes>
				<Route path='edit/:id' element={<BikeForm />} />
				<Route path='edit' element={<BikeForm />} />
				<Route path='delete/:id' element={<BikeDelete />} />
			</Routes>
			<div className='flex justify-between mb-4'>
				<Typography sx={{ flex: '1 1 100%' }} variant='h5' id='tableTitle' component='div'>
					Bikes
				</Typography>
				<Link
					to={`/bikes/edit`}
					className='text-blue-500 cursor-pointer flex rounded-md border py-2 px-4 hover:bg-blue-400 hover:text-white'
				>
					<AddIcon className='' />
					<div>Create</div>
				</Link>
			</div>
			<DataGrid rows={rows} columns={columns} pagination rowsPerPageOptions={[5, 10, 25, 100]} />
		</div>
	)
}

export default BikeTable
