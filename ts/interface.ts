import * as PIXI from "pixi.js";


export interface Coord {
    x: number,
    y: number
}
export interface CardConCoords {
    coords: Coord[],
    raiseX: number,
    raiseY: number,
    newPerX: number,
    newPerY: number,
    rotation: number
}
export interface CardIntFace extends PIXI.Container {
    puan: number,
    name: string,
    type: string
}

export interface ButtonIntFace extends PIXI.Container {
    fn: () => void
}
export enum Owner {
    player1,
    player2,
    player3,
    kasa
}

export interface ActionCardIntFace {
    card: PIXI.Container,
    targetCoord: Coord,
    brmCoord: Coord,
    time: number,
    scaleForX: number,
    numOfAniFrame: number,
    brmScaleForX: number,
    rotation?: number,
    brmRot?: number
    onComplete?: () => void
}

export enum CardNum {
    CC = 0,
    CA = 11,
    CK = 10,
    CQ = 10,
    CJ = 10,
    C2 = 2,
    C3 = 3,
    C4 = 4,
    C5 = 5,
    C6 = 6,
    C7 = 7,
    C8 = 8,
    C9 = 9,
    C10 = 10
}



export interface ChipIntFace extends PIXI.Container {
    parentName: string
}

export interface CardType {
    type: "K"
    | "Q"
    | "J"
    | "karo"
    | "sinek"
    | "maca"
    | "kupa"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
}