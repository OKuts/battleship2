export const getArr10x10 = () =>
  new Array(10)
    .fill(new Array(10)
      .fill(null)).map((row, i) => row.map((_: null, j: number) => `${i}${j}`)
  )


