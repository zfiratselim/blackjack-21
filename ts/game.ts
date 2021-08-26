import * as PIXI from "pixi.js";

export default class BlackJack extends PIXI.Application {
    constructor() {
        super({
            view: <HTMLCanvasElement>document.querySelector("#canvas"),
            width: 600,
            height: 600
        })
    }
    
}