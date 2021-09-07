import * as PIXI from "pixi.js";
import Tween from "tween.ts";
import Card from "./card";
import { W, H, cardSizes, cardConCoords, cardScale } from "./config";
import { Coords, ChipIntFace, CardIntFace, Owner } from "./interface";

export default class CardLayer {
    private renderer;
    private stage;
    private Card;
    constructor(stage, renderer) {
        this.stage = stage;
        this.renderer = renderer;
        this.Card = new Card(cardScale, this.renderer);
    }
    action(Elem: PIXI.Container | ChipIntFace, { x, y }: Coords, fn?: () => void) {
        return new Tween.Tween(Elem)
            .to({ x, y }, 500)
            .repeat(0)
            .easing(Tween.Easing.Cubic.In)
            .start()
            .onComplete(() => {
                fn && fn();
            })
    }
    calculateTargetCoord(card: PIXI.Container, owner: Owner) {
        let center;
        let targetCoords: { x: number, y: number };
        let cards;
        if (owner == Owner.kasa) {
            center = { x: W / 2 - cardSizes.width / 2, y: 60 }
        }
        if (owner == Owner.player) {
            center = { x: W / 2 - cardSizes.width / 2, y: H - 300 }
        }
        if (cards.length == 0) targetCoords = center;
        cards.forEach((e, i) => {
            this.action(e, { x: e.x - 60, y: e.y })
            if (i == cards.length - 1) {
                targetCoords = { x: e.x, y: center.y + Math.floor(Math.random() * 6 - 2) }
            }
        })
        cards.push(card);
        return targetCoords
    }
    actionCard(n: string, type: string, owner: Owner, fn?: () => void) {
        const number = (n == "J" || n == "Q" || n == "K") ? 10 : n == "A" ? 11 : Number(n);
        const coord = { x: 1400, y: -250 }
        const card: CardIntFace = this.Card.add(n, number, type, coord);
        this.stage.addChild(card);
        const targetCoords = this.calculateTargetCoord(card, owner);
        this.action(card, targetCoords, fn);
    }
    update(lastTime:number) {
        Tween.update(lastTime);
    }
}