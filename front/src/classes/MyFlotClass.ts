export interface ICell {
  ship: string
  around: string[]
  attack: boolean
  plan: string
}

interface IShip {
  direction: boolean,
  yx: string,
  attack: number
}

export interface IFlot {
  [key: string]: IShip
}

export interface IGame {
  sea: ICell[],
  flot: IFlot
}

export class MyFlotClass {
  sea: ICell[]
  flot: IFlot
  tempArr: number[]

  constructor() {
    this.sea = new Array(100).fill({ship: '', around: [], attack: false, plan: ''})
    this.tempArr = [...new Array(100).fill(0).keys()]
    this.flot = {}
    this.#initFlot()
    this.#setFlotToSea()
    this.#setShipsAroundPoint()
  }

  #setShipsAroundPoint() {
    this.sea.forEach((cell, i) => {
      const [minY, minX] = this.#getLeftRightPoint(i, -1)
      const [maxY, maxX] = this.#getLeftRightPoint(i, 1)
      let tempArr: string[] = []
      for (let j = minY; j <= maxY; j++) {
        for (let k = minX; k <= maxX; k++) {
          if (!cell.ship) {
            const ship: string = this.sea[j * 10 + k].ship
            if (!tempArr.includes(ship) && !!ship) tempArr.push(this.sea[j * 10 + k].ship)
          }
        }
      }
      this.sea[i] = {...cell, around: [...tempArr]}
    })
  }

  getGame(): IGame {
    return {sea: this.sea, flot: this.flot}
  }

  #getRandomIndex(max: number) {
    return Math.floor(Math.random() * max)
  }

  #initFlot() {
    new Array(4).fill(0).forEach((_: number, i) => {
      const pal = 4 - i
      new Array(5 - pal).fill(0).forEach((_: number, j) => {
        const key = `${pal}${j + 1}`
        this.flot[key] = {yx: '', direction: false, attack: 0}
      })
    })
  }

  #getLeftRightPoint(point: number, k: (1 | -1 | 0)): [number, number] {
    const [y, x] = point < 10 ? `0${point}` : `${point}`
    const [numY, numX] = [Number(y), Number(x)]
    const outY = (numY + 1 * k) < 0 || (numY + 1 * k) > 9 ? numY : numY + 1 * k
    const outX = (numX + 1 * k) < 0 || (numX + 1 * k) > 9 ? numX : numX + 1 * k
    return [outY, outX]
  }

  #getCoordinatesArray(minY: number, minX: number, maxY: number, maxX: number): number[] {
    const out = []
    for (let i = minY; i <= maxY; i++) {
      for (let j = minX; j <= maxX; j++) {
        out.push(i * 10 + j)
      }
    }
    return out
  }

  #getOneShipArr(num: number, direction: boolean, ship: number): number[] {
    const [minY, minX] = this.#getLeftRightPoint(num, 0)
    const maxY = direction ? minY : minY + ship - 1
    const maxX = direction ? minX + ship - 1 : minX
    if (maxX > 9 || maxY > 9) return []
    return this.#getCoordinatesArray(minY, minX, maxY, maxX)
  }

  #getAroundOneShipArr(oneShipArr: number[]): number[] {
    const [minY, minX] = this.#getLeftRightPoint(oneShipArr[0], -1)
    const [maxY, maxX] = this.#getLeftRightPoint(oneShipArr[oneShipArr.length - 1], 1)
    return this.#getCoordinatesArray(minY, minX, maxY, maxX)
  }

  #canToPlace(num: number, ship: string, direction: boolean) {
    if (!this.tempArr[num]) return false

    const oneShipArr: number[] = this.#getOneShipArr(num, direction, +ship[0])
    if (!oneShipArr[0]) return false

    const aroundOneShipArr: number[] = this.#getAroundOneShipArr(oneShipArr)
    const controlLength = [...new Set([...aroundOneShipArr, ...this.tempArr])].length

    if (controlLength !== this.tempArr.length) return false
    oneShipArr.forEach(yx => {
      this.sea[yx] = {ship, around: [], attack: false, plan: ''}
    })
    this.tempArr = this.tempArr.filter(el => !oneShipArr.includes(el))
    this.flot[ship].yx = num < 10 ? `0${num}` : `${num}`
    this.flot[ship].direction = direction

    return true
  }

  #setFlotToSea() {
    const ships = Object.keys(this.flot).sort((a, b) => a > b ? -1 : 1)
    for (let i = 0; i < ships.length; i++) {
      let flag = false
      do {
        const num = this.#getRandomIndex(this.tempArr.length)
        const direction = !!this.#getRandomIndex(2)
        flag = this.#canToPlace(num, ships[i], direction)
      } while (!flag)
    }
    this.tempArr = []
  }
}
