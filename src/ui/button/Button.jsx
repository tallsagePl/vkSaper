import React, { useState } from 'react'
import s from './Button.module.css'
import { smiles } from '../../constants/constants'

const Button = ({ setRender, shock, setShock, dead, setDead, win, setWin }) => {
	const [img, setImg] = useState(smiles[0])

	const handleEvent = () => {
		setImg(smiles[0])
		setRender(prev => !prev)
		setDead(false)
		setShock(false)
		setWin(false)
	}

	return (
		<img
			src={dead ? smiles[1] : win ? smiles[2] : shock ? smiles[3] : img}
			className={s.img}
			onClick={handleEvent}
			onMouseDown={() => setImg(smiles[4])}
		/>
	)
}

export default Button
