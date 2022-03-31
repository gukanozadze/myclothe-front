import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './pages/Products'
import ProductView from './pages/ProductView'
import Login from './pages/Login'
import Register from './pages/Register'
import ClothesTablePage from './pages/ClothesTable'
import UsersTable from './pages/UsersTable/UsersTablePage'
import OrdersTable from './pages/OrdersTable/OrdersTablePage'
import Logout from './pages/Logout'
import NotFound from './pages/NotFound'
import MyOrders from './pages/MyOrders'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Products />} />
				<Route path='/product/:id' element={<ProductView />} />
				<Route path='/clothes/*' element={<ClothesTablePage />} />
				<Route path='/users/*' element={<UsersTable />} />
				<Route path='/orders' element={<OrdersTable />} />
				<Route path='/myorders' element={<MyOrders />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/logout' element={<Logout />} />

				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
