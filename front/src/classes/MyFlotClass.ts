interface ICell {
  ship: string | null
  attack: boolean
}

interface IShip {
  direction: boolean,
  yx: string,
  attack: number
}

export class MyFlotClass {
  sea: ICell[]
  #tempArr: number[]
  flot: { [key: string]: IShip }


  constructor() {
    this.sea = new Array(100).fill(  {ship: null, attack: false})
    this.#tempArr = [...new Array(100).fill(0).keys()]
    this.flot = {}
    this.#initFlot()
    this.#setFlotToSea()
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

  #canToPlace(num: number, ship: string) {
    const direction = !!this.#getRandomIndex(2)
    if (!this.#tempArr[num]) return false
    const yx = num.toString().length === 1 ? `0${num}` : `${num}`
    const [startY, startX] = yx
    const endY = direction ? +startY : +startY + +ship[0] - 1
    const endX = direction ? +startX + +ship[0] - 1 : +startX
    if (endX > 9 || endY > 9) return false
    const maxY = endY === 9 ? 9 : endY + 1
    const maxX = endX === 9 ? 9 : endX + 1
    const tempSea = [...this.sea]
    const tempFilter: number[] = []

    for (let i = +startY - 1; i <= maxY; i++) {
      for (let j = +startX - 1; j <= maxX; j++) {
        if (tempSea[i*10+j].ship) {
          return false
        } else {
          (endY >= i && i >= +startY && endX >= j && j >= +startX)
            ? tempSea[i*10+j] = { ship, attack: false}
            : tempSea[i*10+j]= { ship: '0', attack: false}
            tempFilter.push(i*10+j)
        }
      }
    }
    this.sea = [...tempSea]
    this.#tempArr = this.#tempArr.filter(el => !tempFilter.includes(el))
    this.flot[ship].yx = yx
    this.flot[ship].direction = direction

    return true
  }

  #setFlotToSea () {

    const ship = '41'
    const num = this.#getRandomIndex(this.#tempArr.length)
    const canToPlace = this.#canToPlace(num, ship)

    console.log(canToPlace)
    console.log(this.flot)
  }


}
