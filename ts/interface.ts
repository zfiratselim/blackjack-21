import * as PIXI from "pixi.js";


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