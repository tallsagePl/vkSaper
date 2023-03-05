import React, { useState } from 'react'
import s from './Field.module.css'

const Field = ({ x, y, img, handleClick, handleMouse }) => {
	const handleContextClick = e => {
		e.preventDefault()
		let flagR = true
		handleClick(x, y, flagR)
	}

	return (
		<img
			src={img}
			className={s.img}
			onClick={() => handleClick(x, y)}
			onContextMenu={e => handleContextClick(e)}
			onMouseDown={() => handleMouse()}
			draggable={false}
		/>
	)
}

export default Field
