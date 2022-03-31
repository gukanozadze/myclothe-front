import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'

const { REACT_APP_API_HOST } = process.env
axios.defaults.baseURL = `${REACT_APP_API_HOST}/api`
axios.defaults.withCredentials = true

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
