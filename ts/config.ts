import { Coord, CardConCoords } from "./interface";

export const W = 1495;
export const H = 840;

export const cardSizes = {
  width: 170,
  height: 220
}

export const cardConSizesForTable = {
  width: 90,
  height: 117
}

export const cardScale: number = cardConSizesForTable.width / cardSizes.width;

export const dealerCordandRot: { coord: Coord, rotation: number } = {
  coord: { x: W - 350, y: 300 },
  rotation: 0
};

export const StackOnCoordAndRot: { coord: Coord, rotation: number } = {
  rotation: Math.PI / 2,
  coord: { x: 320, y: 120 }
}

export const cardConCoords: CardConCoords[] = [
  {
    coords: [
      { x: W - cardSizes.width / 2 - 480, y: 390 },
      { x: W - cardSizes.width / 2 - 485, y: 490 },
      { x: W - cardSizes.width / 2 - 345, y: 375 }
    ],
    raiseX: -30,
    raiseY: -15,
    newPerX: 30,
    newPerY: 105,
    rotation: -.7,
    totalPuanDistanceX: 80,
    totalPuanDistanceY: 100
  },
  {
    coords: [
      { x: (W - cardSizes.width / 2) / 2 - 5, y: 430 },
      { x: (W - cardSizes.width / 2) / 2 - 95, y: 500 },
      { x: (W - cardSizes.width / 2) / 2 + 75, y: 500 }
    ],
    raiseX: -20,
    raiseY: -25,
    newPerX: -10,
    newPerY: 90,
    rotation: .001,
    totalPuanDistanceX: 60,
    totalPuanDistanceY: 130
  }, {
    coords: [
      { x: 440, y: 320 },// ilk kart yeri
      { x: 345, y: 310 },//
      { x: 450, y: 415 },//split den sonraki iki kart yeri
    ],
    raiseX: 5,
    raiseY: -28,
    newPerX: -85,
    newPerY: 60,
    rotation: .8,
    totalPuanDistanceX: -80,
    totalPuanDistanceY: 120
  },

  {
    coords: [
      { x: (W - cardSizes.width / 2) / 2 - 5, y: 180 },
    ],
    raiseX: -20,
    raiseY: -25,
    newPerX: -10,
    newPerY: 90,
    rotation: .001,
    totalPuanDistanceX: 100,
    totalPuanDistanceY: 140
  },
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

