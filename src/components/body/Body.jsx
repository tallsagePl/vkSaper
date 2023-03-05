import React, { useEffect, useState } from 'react'
import { createFields } from '../../helpers/handlers'
import Field from '../../ui/field/Field'
import s from './Body.module.css'
import imgSrc from '../../assets/icons/fields/field_close.png'
import { fieldPic } from '../../constants/constants.js'

const Body = ({
	flag,
	setFlag,
	setShock,
	render,
	dead,
	setDead,
	win,
	setWin,
}) => {
	const size = 16
	const dimension = new Array(size).fill(null)
	const maskArr = new Array(size * size).fill(imgSrc)

	const [field, setField] = useState([])
	const [mask, setMask] = useState(maskArr)
	const [firstClick, setFirstClick] = useState(true)

	useEffect(() => {
		setField(createFields(size, -1))
	}, [])

	useEffect(() => {
		setField(createFields(size, -1))
		setMask(maskArr)
		setFlag(`${(size / 4) * 10}`)
	}, [render])

	const handleClick = (x, y, flagR) => {
		if (dead) return
		if (win) return
		const value = field[y * size + x]
		const idx = y * size + x
		let newMask = [...mask]
		setShock(false)

		if (flagR) {
			let flagStr = parseInt(flag)

			if (newMask[idx] === imgSrc) {
				newMask[idx] = fieldPic.at(-5)
				flagStr -= 1
				if (flagStr < 10) {
					flagStr = '0' + flagStr.toString()
				} else flagStr = flagStr.toString()
				setFlag(flagStr)
				setMask(newMask)
				if (!newMask.includes(imgSrc) && parseInt(flagStr) === 0) setWin(true)
				return
			}
			if (newMask[idx] === fieldPic.at(-5)) {
				newMask[idx] = fieldPic.at(-4)
				flagStr += 1
				if (flagStr < 10) {
					flagStr = '0' + flagStr.toString()
				} else flagStr = flagStr.toString()
				setFlag(flagStr)
				setMask(newMask)
				return
			}
			if (newMask[idx] === fieldPic.at(-4)) {
				newMask[idx] = imgSrc
				setMask(newMask)
				return
			}
		} else {
			if (value === -1 && firstClick == true) {
				setField(createFields(size, idx))
			} else {
				if (mask[idx] === fieldPic.at(-5) || mask[idx] === fieldPic.at(-4))
					return
				if (value === -1) {
					setDead(true)
					setFirstClick(true)
					const bombs = []
					field.map((el, i) => {
						if (el === -1) {
							bombs.push(i)
							if (newMask[i] === fieldPic.at(-5)) return
							else newMask[i] = fieldPic.at(-1)
						}
					})
					newMask.map((el, i) => {
						if (el === fieldPic.at(-5) && !bombs.includes(i)) {
							newMask[i] = fieldPic.at(-3)
						}
					})
					newMask[idx] = fieldPic.at(-2)
					setMask(newMask)
				} else {
					if (value === 0) {
						const clear = []
						const reveal = (x, y) => {
							if (x >= 0 && x < size && y >= 0 && y < size) {
								if (newMask[y * size + x] !== imgSrc) return
								clear.push([x, y])
							}
						}

						reveal(x, y)

						while (clear.length) {
							const [x, y] = clear.pop()
							newMask[y * size + x] = fieldPic.at(field[y * size + x])
							if (field[y * size + x] !== 0) continue
							reveal(x + 1, y)
							reveal(x - 1, y)
							reveal(x, y - 1)
							reveal(x, y + 1)
						}

						firstClick && setFirstClick(false)
						setMask(newMask)
					} else {
						firstClick && setFirstClick(false)
						newMask[idx] = fieldPic.at(value)
						setMask(newMask)
					}
				}
			}
		}
		if (!newMask.includes(imgSrc) && parseInt(flag) === 0) setWin(true)
	}

	const handleMouse = () => {
		setShock(true)
	}

	return (
		<div className={s.mineBody}>
			{dimension.map((_, y) => {
				return (
					<div className={s.field} key={y}>
						{dimension.map((_, x) => {
							return (
								<Field
									key={x}
									img={mask[y * size + x]}
									x={x}
									y={y}
									handleMouse={handleMouse}
									handleClick={handleClick}
								/>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}

export default Body
