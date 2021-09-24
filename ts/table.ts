import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";

import { W, H, cardConCoords, cardConSizesForTable } from "./config";

export default class Table {
    private stage: PIXI.Container;
    constructor(stage) {
        this.stage = stage;
    }
    private addReactange(rot: number) {
        let rectangle = new Graphics();
        rectangle.lineStyle(2, 0xFFFFFF, 1);
        rectangle.drawRoundedRect(0, 0, cardConSizesForTable.width, cardConSizesForTable.height, 5);
        rectangle.endFill();
        rectangle.rotation = rot;
        return rectangle;
    }
    private addCardCons(BGCon: PIXI.Container) {
        cardConCoords.forEach(e => {
            const cardConReact = this.addReactange(e.rotation);
            cardConReact.position.set(e.coords[0].x, e.coords[0].y);
            BGCon.addChild(cardConReact)
        })
    }
    add() {
        const BGCon = new PIXI.Container();
        const BG = PIXI.Sprite.from("bjTable");
        BG.width = 1317;
        BG.height = 740;
        BG.position.set((W - 1317) / 2, (H - 740) / 2);
        BGCon.position.set(0, 0);
        BGCon.addChild(BG);
        this.addCardCons(BGCon)
        this.stage.addChild(BGCon);
    }
}