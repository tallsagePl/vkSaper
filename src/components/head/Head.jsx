import React from 'react'
import Counter from '../../ui/counter/Counter'
import Button from '../../ui/button/Button'
import s from './Head.module.css'

const Head = ({
	flag,
	render,
	setRender,
	shock,
	setShock,
	dead,
	setDead,
	win,
	setWin,
}) => {
	return (
		<div className={s.mineHead}>
			<Counter type="mine" flag={flag} />
			<Button
				setRender={setRender}
				shock={shock}
				setShock={setShock}
				dead={dead}
				setDead={setDead}
				win={win}
				setWin={setWin}
			/>
			<Counter type="time" render={render} />
		</div>
	)
}

export default Head
