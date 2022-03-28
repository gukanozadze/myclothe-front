import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'

axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.withCredentials = true

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
