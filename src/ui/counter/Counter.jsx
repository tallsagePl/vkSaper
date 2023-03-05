import React, { useEffect, useState } from 'react'
import s from './Counter.module.css'
import { redNums } from '../../constants/constants'

const Counter = ({ type, flag, render }) => {
	const [time, setTime] = useState('000')

	useEffect(() => {
		setTime('000')
		const interval = setInterval(
			() =>
				setTime(prev => {
					let num = parseInt(prev) + 1
					if (num / 10 < 1) return '00' + num.toString()
					if (num / 100 < 1) return '0' + num.toString()
					if (num / 999 > 1) return '000'

					return num.toString()
				}),
			1000
		)
		return () => {
			clearInterval(interval)
		}
	}, [render])

	return type === 'time' ? (
		<div>
			<img src={redNums[time[0]]} className={s.img} />
			<img src={redNums[time[1]]} className={s.img} />
			<img src={redNums[time[2]]} className={s.img} />
		</div>
	) : (
		<div>
			<img src={redNums[flag[0]]} className={s.img} />
			<img src={redNums[flag[1]]} className={s.img} />
		</div>
	)
}

export default Counter
