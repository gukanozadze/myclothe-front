import React from 'react'
import ContentLoader from 'react-content-loader'

const OrdersLoader = () => {
	return (
		<div className='overflow-hidden'>
			<ContentLoader height={475} width={1000}>
				<circle cx='70.2' cy='73.2' r='31.3' />
				<rect x='129.9' y='29.5' width='225.5' height='13' />
				<rect x='129.9' y='64.7' width='396' height='13' />
				<rect x='129.9' y='97.8' width='353.5' height='13' />

				<circle cx='70.7' cy='243.5' r='31.3' />
				<rect x='130.4' y='199.9' width='225.5' height='13' />
				<rect x='130.4' y='235' width='396' height='13' />
				<rect x='130.4' y='268.2' width='353.5' height='13' />

				<circle cx='70.7' cy='412.7' r='31.3' />
				<rect x='130.4' y='369' width='225.5' height='13' />
				<rect x='130.4' y='404.2' width='396' height='13' />
				<rect x='130.4' y='437.3' width='353.5' height='13' />
			</ContentLoader>
		</div>
	)
}

export default OrdersLoader
