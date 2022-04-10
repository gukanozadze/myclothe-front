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
import PrivateRoute from './shared/PrivateRoute'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<PrivateRoute>
							<Products />
						</PrivateRoute>
					}
				/>
				<Route
					path='/product/:id'
					element={
						<PrivateRoute>
							<ProductView />
						</PrivateRoute>
					}
				/>
				<Route
					path='/clothes/*'
					element={
						<PrivateRoute>
							<ClothesTablePage />
						</PrivateRoute>
					}
				/>
				<Route
					path='/users/*'
					element={
						<PrivateRoute>
							<UsersTable />
						</PrivateRoute>
					}
				/>
				<Route
					path='/orders'
					element={
						<PrivateRoute>
							<OrdersTable />
						</PrivateRoute>
					}
				/>
				<Route
					path='/myorders'
					element={
						<PrivateRoute>
							<MyOrders />
						</PrivateRoute>
					}
				/>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/logout' element={<Logout />} />

				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
