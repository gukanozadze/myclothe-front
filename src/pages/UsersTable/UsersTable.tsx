import React from 'react'
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import { useAppSelector } from '../../hooks'
import UserForm from './UserForm'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link, Route, Routes } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import UserDelete from './UserDelete'
import { selectAllUsers } from '../../features/user/user-slice'
import clsx from 'clsx'

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'email', headerName: 'Email', width: 230 },
	{ field: 'full_name', headerName: 'Full Name', width: 230 },
	{
		field: 'is_manager',
		type: 'boolean',
		headerName: 'Manager',
		sortable: false,
		width: 160,
	},
	{
		field: 'action',
		headerName: 'Action',
		flex: 1,
		sortable: false,
		type: 'number',
		headerClassName: 'text-lg',
		renderCell: params => {
			return (
				<div className='flex justify-end gap-2 w-full mr-2'>
					<Link to={`/users/edit/${params.row.id}`}>
						<EditIcon className='cursor-pointer text-blue-500' />
					</Link>
					<Link to={`/users/delete/${params.row.id}`}>
						<DeleteIcon className='cursor-pointer text-red-500' />
					</Link>
				</div>
			)
		},
	},
]

const UsersTable = () => {
	const rows = useAppSelector(selectAllUsers)

	return (
		<div style={{ height: 500, width: '100%', marginBottom: '10rem' }}>
			<Routes>
				<Route path='edit/:id' element={<UserForm />} />
				<Route path='edit' element={<UserForm />} />
				<Route path='delete/:id' element={<UserDelete />} />
			</Routes>
			<div className='flex justify-between mb-4'>
				<Typography sx={{ flex: '1 1 100%' }} variant='h5' id='tableTitle' component='div'>
					Users
				</Typography>
				<Link
					to={`/users/edit`}
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

export default UsersTable
