import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './pages/Products'
import ProductView from './pages/ProductView'
import Login from './pages/Login'
import Register from './pages/Register'
import Bikes from './pages/Bikes/Bikes'
import Users from './pages/Users/Users'
import Orders from './pages/Orders/Orders'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Products />} />
				<Route path='/product/:id' element={<ProductView />} />
				<Route path='/bikes/*' element={<Bikes />} />
				<Route path='/users/*' element={<Users />} />
				<Route path='/orders' element={<Orders />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
