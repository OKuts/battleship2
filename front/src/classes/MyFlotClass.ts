interface ICell {
  ship: string | null
  attack: boolean
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
  #tempArr: number[]

  constructor() {
    this.sea = new Array(100).fill({ship: null, attack: false})
    this.#tempArr = [...new Array(100).fill(0).keys()]
    this.flot = {}
    this.#initFlot()
    this.#setFlotToSea()

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

  #getShipCoordinates(num: number, direction: boolean, ship: number): number[] {
    const startY = num > 9 ? Number(`${num}`[0]) : 0
    const startX = num - startY * 10
    const endY = direction ? startY : startY + ship - 1
    const endX = direction ? startX + ship - 1 : startX
    return [startY, startX, endY, endX]
  }

  #getAroundShip(startY: number, startX: number, endY: number, endX: number): number[] {
    const maxY = endY === 9 ? 9 : endY + 1
    const maxX = endX === 9 ? 9 : endX + 1
    const minX = startX === 0 ? 0 : startX - 1
    const minY = startY === 0 ? 0 : startY - 1
    return [minY, minX, maxY, maxX]
  }

  #canToPlace(num: number, ship: string) {
    const direction = !!this.#getRandomIndex(2)
    if (!this.#tempArr[num]) return false
    const [startY, startX, endY, endX] = this.#getShipCoordinates(num, direction, +ship[0])
    if (endX > 9 || endY > 9) return false
    const [minY, minX, maxY, maxX] = this.#getAroundShip(startY, startX, endY, endX)
    const tempSea = [...this.sea]
    const tempFilter: number[] = []

    for (let i = minY; i <= maxY; i++) {
      for (let j = minX; j <= maxX; j++) {
        if (tempSea[i * 10 + j].ship) return false
        if (endY >= i && i >= startY && endX >= j && j >= startX) {
          tempSea[i * 10 + j] = {ship, attack: false}
          tempFilter.push(i * 10 + j)
        }
      }
    }

    this.sea = [...tempSea]
    this.#tempArr = this.#tempArr.filter(el => !tempFilter.includes(el))
    this.flot[ship].yx = num < 10 ? `0${num}` : `${num}`
    this.flot[ship].direction = direction

    return true
  }

  #setFlotToSea() {
    const ships = Object.keys(this.flot).sort((a, b) => a > b ? -1 : 1)
    for (let i = 0; i < ships.length; i++) {
      let flag = false
      let n = 0
      do {
        const num = this.#getRandomIndex(this.#tempArr.length)
        flag = this.#canToPlace(num, ships[i])
        n++
      } while (!flag)
    }
    this.#tempArr = []
    // console.log(this.flot)
    // console.log(this.sea)
  }


}
