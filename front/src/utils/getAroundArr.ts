const getLeftRightPoint = (point: number, flag: -1 | 1) => {
  const [y, x] = String(point)
  if (flag === -1) {
    return [+y - 1 <= -1 ? +y : +y - 1, +x - 1 <= -1 ? +x : +x - 1]
  } else {
    return [+y + 1 <= 9 ? +y + 1 : +y , +x + 1 <= 9 ? +x + 1 : +x]
  }
}

export const getAroundArr = (arr: number[]): number[] => {
  const [minY, minX] = getLeftRightPoint(Math.min(...arr), -1)
  const [maxY, maxX] = getLeftRightPoint(Math.max(...arr), 1)
  const out = []
  for (let i = minY; i <= maxY; i++) {
    for (let j = minX; j <= maxX; j++) {
      out.push(i * 10 + j)
    }
  }
  return out
}
