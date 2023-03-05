import { useState } from 'react'
import s from './App.module.css'
import Body from './components/body/Body'
import Head from './components/head/Head'

function App() {
	const [flag, setFlag] = useState('')
	const [shock, setShock] = useState(false)
	const [render, setRender] = useState(false)
	const [dead, setDead] = useState(false)
	const [win, setWin] = useState(false)

	return (
		<div className={s.App}>
			<div className={s.mine}>
				<Head
					flag={flag}
					render={render}
					setRender={setRender}
					shock={shock}
					setShock={setShock}
					dead={dead}
					setDead={setDead}
					win={win}
					setWin={setWin}
				/>
				<Body
					flag={flag}
					setFlag={setFlag}
					setShock={setShock}
					render={render}
					dead={dead}
					setDead={setDead}
					win={win}
					setWin={setWin}
				/>
			</div>
		</div>
	)
}

export default App
