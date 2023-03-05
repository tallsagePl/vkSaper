export const createFields = (size, idx) => {
	const Mine = -1
	const field = new Array(size * size).fill(0)

	function inc(x, y) {
		if (x >= 0 && x < size && y >= 0 && y < size) {
			if (field[y * size + x] === Mine) return
			field[y * size + x] += 1
		}
	}
	//tut size/4*10
	for (let i = 0; i < (size / 4) * 10; ) {
		const x = Math.floor(Math.random() * size)
		const y = Math.floor(Math.random() * size)

		if (field[y * size + x] === Mine || y * size + x === idx) continue

		field[y * size + x] = Mine

		i += 1

		inc(x - 1, y)
		inc(x + 1, y)
		inc(x, y - 1)
		inc(x, y + 1)
		inc(x + 1, y + 1)
		inc(x - 1, y + 1)
		inc(x + 1, y - 1)
		inc(x - 1, y - 1)
	}
	return field
}
