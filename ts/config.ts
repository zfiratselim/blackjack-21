export const cardSizes = {
  width: 180,
  height: 308
}

export const numCoords = [
  { x: 20, y: 25 },
  { x: 20, y: cardSizes.height - 25 },
  { x: cardSizes.width - 20, y: 25 },
  { x: cardSizes.width - 20, y: cardSizes.height - 25 }
]

export const cardsElementsPosiiton = {
  "1": [
    { x: cardSizes.width / 2, y: cardSizes.height / 2 }
  ],
  "2": [
    { x: cardSizes.width / 2, y: cardSizes.height / 4 },
    { x: cardSizes.width / 2, y: cardSizes.height / 4 * 3 }
  ],
  "3": [
    { x: cardSizes.width / 2, y: cardSizes.height / 4 },
    { x: cardSizes.width / 2, y: cardSizes.height / 4 * 3 },
    { x: cardSizes.width / 2, y: cardSizes.height / 2 }
  ],
  "4": [
    { x: cardSizes.width / 4, y: cardSizes.height / 4 },
    { x: cardSizes.width / 4, y: cardSizes.height / 4 * 3 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 4 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 4 * 3 },
  ],
  "5": [
    { x: cardSizes.width / 4, y: cardSizes.height / 4 },
    { x: cardSizes.width / 4, y: cardSizes.height / 4 * 3 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 4 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 4 * 3 },
    { x: cardSizes.width / 2, y: cardSizes.height / 2 },
  ],
  "6": [
    { x: cardSizes.width / 4, y: cardSizes.height / 4 },
    { x: cardSizes.width / 4, y: cardSizes.height / 4 * 3 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 4 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 4 * 3 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 2 },
    { x: cardSizes.width / 4, y: cardSizes.height / 2 },
  ],
  "7": [
    { x: cardSizes.width / 4, y: cardSizes.height / 4 },
    { x: cardSizes.width / 4, y: cardSizes.height / 4 * 3 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 4 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 4 * 3 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 2 },
    { x: cardSizes.width / 4, y: cardSizes.height / 2 },
    { x: cardSizes.width / 2, y: cardSizes.height / 8 * 3 },
  ],
  "8": [
    { x: cardSizes.width / 4, y: cardSizes.height / 4 },
    { x: cardSizes.width / 4, y: cardSizes.height / 4 * 3 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 4 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 4 * 3 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 2 },
    { x: cardSizes.width / 4, y: cardSizes.height / 2 },
    { x: cardSizes.width / 2, y: cardSizes.height / 8 * 3 },
    { x: cardSizes.width / 2, y: cardSizes.height / 8 * 5 },
  ],
  "9": [
    { x: cardSizes.width / 4, y: cardSizes.height / 5 },
    { x: cardSizes.width / 4, y: cardSizes.height / 5 * 4 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 5 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 5 * 4 },
    { x: cardSizes.width / 4, y: cardSizes.height / 5 * 2 },
    { x: cardSizes.width / 4, y: cardSizes.height / 5 * 3 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 5 * 2 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 5 * 3 },
    { x: cardSizes.width / 2, y: cardSizes.height / 2 }
  ],
  "10": [
    { x: cardSizes.width / 4, y: cardSizes.height / 5 },
    { x: cardSizes.width / 4, y: cardSizes.height / 5 * 4 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 5 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 5 * 4 },
    { x: cardSizes.width / 4, y: cardSizes.height / 5 * 2 },
    { x: cardSizes.width / 4, y: cardSizes.height / 5 * 3 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 5 * 2 },
    { x: cardSizes.width / 4 * 3, y: cardSizes.height / 5 * 3 },
    { x: cardSizes.width / 2, y: cardSizes.height / 10 * 3 },
    { x: cardSizes.width / 2, y: cardSizes.height / 10 * 7 },
  ],
  "J": {
    logo: {
      width: 92,
      height: 69,
      x: cardSizes.width / 2 - 12,
      y: cardSizes.height / 2 + 40
    },
    hat: {
      width: 120,
      height: 70,
      x: cardSizes.width / 2 + 10,
      y: cardSizes.height / 2 - 30
    }
  },
  "Q": {
    logo: {
      width: 92,
      height: 69,
      x: cardSizes.width / 2 - 12,
      y: cardSizes.height / 2 + 40
    },
    hat: {
      width: 115,
      height: 71,
      x: cardSizes.width / 2,
      y: cardSizes.height / 2 - 40
    }
  },
  "K": {
    logo: {
      width: 92,
      height: 69,
      x: cardSizes.width / 2 - 12,
      y: cardSizes.height / 2 + 40
    },
    hat: {
      width: 110,
      height: 89,
      x: cardSizes.width / 2,
      y: cardSizes.height / 2 - 50
    }
  }
}