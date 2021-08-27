import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import { cardSizes, cardsElementsPosiiton, numCoords } from "./config";
import { Container } from "pixi.js";

export default class Card {
    cElPos = cardsElementsPosiiton;
    private renderer;
    constructor(renderer) {
        this.renderer = renderer
    }
    private addReactange() {
        let rectangle = new Graphics();
        rectangle.beginFill(0xFFFFFF);
        rectangle.lineStyle(0);
        rectangle.drawRoundedRect(0, 0, cardSizes.width, cardSizes.height, 10);
        rectangle.endFill();
        return this.renderer.generateTexture(rectangle);
    }

    private addCardType(type: string) {
        const cardType = PIXI.Sprite.from(type);
        cardType.width = 40;
        cardType.height = 45;
        cardType.anchor.set(.5);
        return cardType;
    }

    private addRoyalCardImages(name, color) {
        const hat = PIXI.Sprite.from(name);
        const mugsoft = PIXI.Sprite.from("mugSoftLogo");
        hat.anchor.set(.5);
        mugsoft.anchor.set(.5);
        mugsoft.tint = color;
        return { hat, mugsoft }
    }

    private addCardNum(n: string, color: number) {
        const numCon = new Container();
        numCon.width = cardSizes.width;
        numCon.height = cardSizes.height;
        numCoords.forEach((e, i) => {
            //@ts-ignore
            const num = new PIXI.Text(n, { fill: color, fontFamily: "Arial", fontSize: 28, fontWeight: 400 });


            num.anchor.set(.5);


            if (i % 2 == 1) num.rotation = Math.PI;

            Object.assign(num, e);
            numCon.addChild(num);
        });
        return numCon
    }

    add(name: string, type: string) {
        const color = (type == "kupa" || type == "karo") ? 0xFF0000 : 0x000000;
        const card = new PIXI.Container();
        const bgTexture = this.addReactange();
        card.position.set(100, 100);

        const bg = PIXI.Sprite.from(bgTexture);
        bg.position.set(0, 0);

        const cardNum = this.addCardNum(name, color);

        card.addChild(bg, cardNum);

        if (name == "J" || name == "Q" || name == "K") {
            const e = this.cElPos[name];
            const images = this.addRoyalCardImages(name, color);
            Object.assign(images.hat, e.hat);
            console.log(images.mugsoft, e.logo)
            Object.assign(images.mugsoft, e.logo);
            card.addChild(images.hat, images.mugsoft)
        } else {
            this.cElPos[name].forEach((e, i) => {
                const el = this.addCardType(type);
                el.position.set(e.x, e.y);
                if (i % 2 == 1) el.rotation = Math.PI;
                card.addChild(el);
            })
        }

        card.width = 200;
        card.height = 320;
        return card
    }
}