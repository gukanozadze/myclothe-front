import React, { useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import { useAppSelector } from '../../hooks'
import { selectAllProducts } from '../../features/product/product-slice'
import { Button, Rating } from '@mui/material'
import BikeForm from './ClothesForm'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link, Route, Routes } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import BikeDelete from './ClotheDelete'

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'title', headerName: 'Title', width: 150 },
	{ field: 'description', headerName: 'Description', width: 200 },
	{
		field: 'email',
		headerName: 'Created By',
		width: 200,
		renderCell: cell => <div>{cell.row.user ? cell.row.user.email : ''}</div>,
	},
	{
		field: 'stock',
		headerName: 'Available Stock',
		width: 150,
	},
	{
		field: 'rating',
		renderCell: cell => <Rating name='read-only' value={parseFloat(cell.value)} readOnly />,
		headerName: 'Rating',
		width: 150,
	},
	{
		field: 'action',
		headerName: 'Action',
		sortable: false,
		renderCell: cell => {
			return (
				<div className='flex justify-around w-full'>
					<Link to={`/clothes/edit/${cell.row.id}`}>
						<EditIcon className='cursor-pointer text-blue-500' />
					</Link>

					<Link to={`/clothes/delete/${cell.row.id}`}>
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
					Clothes
				</Typography>
				<Link
					to={`/clothes/edit`}
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
