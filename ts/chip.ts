import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import { ChipIntFace } from "./interface";


export default class Card {
    private addCircle(size) {
        let circle = new Graphics();
        circle.beginFill(0xFFFFFF);
        circle.drawCircle(0, 0, size);
        circle.endFill();
        return circle
    }

    add(price: number, color: number, Coords: { x: number, y: number }) {
        const size = 120;
        const chipCon = new PIXI.Container();
        const chipImage = PIXI.Sprite.from("chip");
        const bgCircle = this.addCircle(size / 2);
        const priceText = new PIXI.Text(price + "", { fontFamily: "Arial", fontSize: 34, fill: color });

        chipCon.position.set(Coords.x, Coords.y);

        chipImage.tint = color;
        chipImage.position.set(0, 0);
        chipImage.width = size;
        chipImage.height = size;

        bgCircle.position.set(size / 2, size / 2)
        priceText.anchor.set(.5);

        priceText.position.set(size / 2, size / 2);

        chipCon.addChild(bgCircle, chipImage, priceText);
        return chipCon as ChipIntFace;
    }
}