export const W = 1495;
export const H = 840;

export const cardSizes = {
  width: 170,
  height: 220
}

export const kurdeleCoords = {
  center: { x: W / 2 - cardSizes.width / 2, y: H / 2 - 40 },
  dealer: { x: W / 2 - cardSizes.width / 2, y: 120 },
  player: { x: W / 2 - cardSizes.width / 2, y: H - 240 }
}


export const chipCoords: { x: number, y: number }[] = [
  { x: 100, y: 90 },
  { x: 250, y: 90 },
  { x: 400, y: 90 },
  { x: 550, y: 90 },
  { x: 700, y: 90 },
  { x: 850, y: 90 },
];

export const totalPuanCoords = [
  { x: W - 500, y: 60 + cardSizes.height * .8 - 80 },
  { x: W - 500, y: H - 300 }
]

export const cardElemsForNum = {
  x: cardSizes.width / 2,
  y: cardSizes.height - 90
}
export const cardsElementsPosiiton = {
  "J": {
    logo: {
      width: 92,
      height: 69,
      x: cardSizes.width - 95,
      y: cardSizes.height - 60
    },
    hat: {
      width: 120,
      height: 70,
      x: cardSizes.width - 70,
      y: cardSizes.height - 125
    }
  },
  "Q": {
    logo: {
      width: 92,
      height: 69,
      x: cardSizes.width - 95,
      y: cardSizes.height - 60
    },
    hat: {
      width: 115,
      height: 71,
      x: cardSizes.width - 82,
      y: cardSizes.height - 135
    }
  },
  "K": {
    logo: {
      width: 92,
      height: 69,
      x: cardSizes.width - 95,
      y: cardSizes.height - 60
    },
    hat: {
      width: 110,
      height: 89,
      x: cardSizes.width - 82,
      y: cardSizes.height - 145
    }
  }
}