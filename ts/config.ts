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
  rotation:  Math.PI / 2,
  coord: { x: 320, y: 120 }
}

export const cardConCoords: CardConCoords[] = [
  {
    coords: [
      { x: 440, y: 320 },// ilk kart yeri
      { x: 345, y: 310 },//
      { x: 450, y: 415 },//split den sonraki iki kart yeri
    ],
    raiseX: 5,
    raiseY: -28,
    newPerX: -85,
    newPerY: 60,
    rotation: .8
  },
  {
    coords: [
      { x: (W - cardSizes.width / 2) / 2 - 30, y: 460 },
      { x: (W - cardSizes.width / 2) / 2 - 110, y: 530 },
      { x: (W - cardSizes.width / 2) / 2 + 50, y: 530 }
    ],
    raiseX: -20,
    raiseY: -25,
    newPerX: -10,
    newPerY: 90,
    rotation: .001
  },
  {
    coords: [
      { x: W - cardSizes.width / 2 - 470, y: 410 },
      { x: W - cardSizes.width / 2 - 505, y: 510 },
      { x: W - cardSizes.width / 2 - 365, y: 435 }
    ],
    raiseX: -30,
    raiseY: -15,
    newPerX: 30,
    newPerY: 105,
    rotation: -.5
  },
  {
    coords: [
      { x: (W - cardSizes.width / 2) / 2 - 30, y: 180 },
    ],
    raiseX: -20,
    raiseY: -25,
    newPerX: -10,
    newPerY: 90,
    rotation: .001
  },
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