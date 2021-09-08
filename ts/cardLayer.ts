import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import Tween from "tween.ts";
import Card from "./card";
import { W, H, cardSizes, cardConCoords, cardScale } from "./config";
import { Coords, ChipIntFace, CardIntFace, Owner, CardConCoords } from "./interface";

export default class CardLayer {
    private renderer;
    private stage;
    private Card;

    private lower = new PIXI.Container();
    private middle = new PIXI.Container();
    private upper = new PIXI.Container();

    constructor(stage, renderer) {
        this.stage = stage;
        this.renderer = renderer;
        this.Card = new Card(cardScale, this.renderer);
    }
    private addCircle(size) {
        let circle = new Graphics();
        circle.beginFill(0xFFFFFF);
        circle.drawCircle(0, 0, size);
        circle.endFill();
        return circle
    }
    addTotalPuans() {
        totalPuanCoords.forEach((e, i) => {
            const Container = new PIXI.Container();
            const circle = this.addCircle(40);
            const puan = new PIXI.Text(0 + "", { fontSize: 32 });

            circle.tint = 0x000000;
            circle.alpha = .3;
            circle.position.set(40, 40);

            puan.anchor.set(.5);
            puan.position.set(40, 40);

            Container.position.set(e.x, e.y);
            Container.addChild(circle, puan);
            this.stage.addChild(Container);
            this.totalPuanText.push(puan);
        })
    }

    action(Elem: PIXI.Container | ChipIntFace, cardConCoord: CardConCoords, fn?: () => void) {
        return new Tween.Tween(Elem)
            .to({ x: cardConCoord.coord.x, y: cardConCoord.coord.y, rotation: cardConCoord.rotation }, 1000)
            .repeat(0)
            .easing(Tween.Easing.Cubic.In)
            .start()
            .onComplete(() => {
                fn && fn();
            })
    }

    addLayers() {
        this.stage.addChild(this.lower, this.middle, this.upper);
        this.addCardBoxAltUst("cardAltlik", this.lower);
        this.addCardBoxAltUst("cardUstluk", this.upper);
    }

    addCardBoxAltUst(imgName: "cardAltlik" | "cardUstluk", parent) {
        const cardAltlik = PIXI.Sprite.from(imgName);
        cardAltlik.width = 100;
        cardAltlik.height = imgName == "cardAltlik" ? 100 : 200;
        cardAltlik.rotation = .8;
        cardAltlik.anchor.set(0, 1)
        cardAltlik.position.set(W - 300, 300);
        parent.addChild(cardAltlik);
    }

    actionCard(n: string, type: string, owner: Owner, fn?: () => void) {
        const number = (n == "J" || n == "Q" || n == "K") ? 10 : n == "A" ? 11 : Number(n);
        const coord = { x: 1400, y: -250 }
        const card: CardIntFace = this.Card.add(n, number, type, coord);
        this.middle.addChild(card);
        this.action(card, cardConCoords[owner], fn);
    }
    update(lastTime: number) {
        Tween.update(lastTime);
    }
}