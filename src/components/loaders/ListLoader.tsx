/* eslint-disable react/no-array-index-key */
import React from 'react'
import ContentLoader from 'react-content-loader'

const ListLoader = (props: any) => {
	const rows = 3
	const columns = 5
	const coverHeight = 285
	const coverWidth = 220
	const padding = 15
	const speed = 2

	const coverHeightWithPadding = coverHeight + padding
	const coverWidthWithPadding = coverWidth + padding
	const initial = 35
	const covers = Array(columns * rows).fill(1)

	return (
		<ContentLoader
			speed={speed}
			width={columns * coverWidthWithPadding}
			height={rows * coverHeightWithPadding}
			foregroundColor='#4C4CDC60'
			{...props}
		>
			<rect x='0' y='0' rx='0' ry='0' width={columns * coverWidthWithPadding - padding} height='20' />

			{covers.map((g, i) => {
				const vy = Math.floor(i / columns) * coverHeightWithPadding + initial
				const vx = (i * coverWidthWithPadding) % (columns * coverWidthWithPadding)
				return <rect key={i} x={vx} y={vy} rx='0' ry='0' width={coverWidth} height={coverHeight} />
			})}
		</ContentLoader>
	)
}

export default ListLoader
