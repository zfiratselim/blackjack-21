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
    rotation: number,
    totalPuanDistanceX: number,
    totalPuanDistanceY: number
}
export interface CardIntFace extends PIXI.Container {
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
    brmRot?: number,
    changeSurface?: () => void,
    onComplete?: () => void
}

export interface NewCardListInt {
    n: string,
    type: string,
    owner: Owner,
    coordIndex: number,
    changeSurface?: boolean,
    onComplt?: () => void
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
