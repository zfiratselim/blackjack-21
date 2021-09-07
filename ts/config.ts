import { Coords, CardConCoords } from "./interface";

export const W = 1495;
export const H = 840;

export const cardSizes = {
  width: 170,
  height: 220
}

export const cardConSizesForTable = {
  width: 100,
  height: 125
}

export const cardScale: number = cardConSizesForTable.width / cardSizes.width;

export const cardConCoords: CardConCoords[] = [
  { coord: { x: 360, y: 330 }, rot: .8 },
  { coord: { x: 500, y: 460 }, rot: .4 },
  { coord: { x: (W - cardSizes.width / 2) / 2, y: 520 }, rot: 0 },
  { coord: { x: W - cardSizes.width / 2 - 500, y: 500 }, rot: -.4 },
  { coord: { x: W - cardSizes.width / 2 - 350, y: 400 }, rot: -.8 }
]
export const kurdeleCoords = {
  center: { x: W / 2 - cardSizes.width / 2, y: H / 2 - 40 },
  dealer: { x: W / 2 - cardSizes.width / 2, y: 120 },
  player: { x: W / 2 - cardSizes.width / 2, y: H - 240 }
}

export const chipCoords: { x: number, y: number }[] = [
  { x: 100, y: H / 10 - 60 },
  { x: 250, y: H / 10 - 60 },
  { x: 400, y: H / 10 - 60 },
  { x: 550, y: H / 10 - 60 },
  { x: 700, y: H / 10 - 60 },
  { x: 850, y: H / 10 - 60 },
];

export const totalPuanCoords = [
  { x: W - 500, y: 60 + cardSizes.height * .8 - 80 },
  { x: W - 500, y: H - 300 }
]

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