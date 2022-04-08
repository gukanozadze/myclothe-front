/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react'
import { useTrail, useSprings, animated, config, useTransition } from 'react-spring'

const TextScroller = ({ text }: { text: string }) => {
	const [letters, setLetters] = useState<string[]>(text.split(''))
	const trail = useTrail(letters.length, {
		from: {
			opacity: 0.5,
			y: -10,
		},
		to: {
			opacity: 1,
			y: 0,
		},

		loop: { reverse: true },
	})

	return (
		<div className='flex justify-center'>
			{trail.map((styles, i) => (
				<animated.div style={styles} key={i}>
					{letters[i] === ' ' ? <div className='ml-2' /> : letters[i]}
				</animated.div>
			))}
		</div>
	)
}

export default TextScroller
