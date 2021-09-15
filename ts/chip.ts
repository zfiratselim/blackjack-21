import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import { ChipIntFace, Owner } from "./interface";
import { chipCoordsList } from "./config";


export default class ChipLayer {
    private stage;
    private colors: number[] = [0xffe052, 0x52F3a6, 0xf829c2, 0x89d496, 0x06d3d2];
    constructor(stage) {
        this.stage = stage
    }
    private addCircle(size) {
        let circle = new Graphics();
        circle.beginFill(0xFFFFFF);
        circle.drawCircle(0, 0, size);
        circle.endFill();
        return circle
    }

    add(size: number, color: number, Coords: { x: number, y: number }) {
        const chipCon = new PIXI.Container();
        const chipImage = PIXI.Sprite.from("chip");
        const bgCircle = this.addCircle(size / 2);

        chipCon.position.set(Coords.x, Coords.y);

        chipImage.tint = color;
        chipImage.position.set(0, 0);
        chipImage.width = size;
        chipImage.height = size;

        bgCircle.position.set(size / 2, size / 2)

        chipCon.addChild(bgCircle, chipImage);
        return chipCon as ChipIntFace;
    }
    addChips(owner: Owner) {
        chipCoordsList[owner].forEach((e, i) => {
            const chip = this.add(40, this.colors[i], e);
            this.stage.addChild(chip)
        })
    }
    update() {

    }
}