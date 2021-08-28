import * as PIXI from "pixi.js";
import Card from "./Card";
import Tween from "tween.ts";
import { cardSizes } from "./config";

const W = 1495;
const H = 840;
interface Coords {
  x: number,
  y: number
}

export default class BlackJack extends PIXI.Application {
  Card = new Card(this.renderer, this.loader);
  constructor() {
    super({
      view: <HTMLCanvasElement>document.querySelector("#canvas"),
      width: W,
      height: H,
      backgroundColor: 0x53FF15
    })

  }
  action(card: PIXI.Container, { x, y }: Coords) {
    return new Tween.Tween(card)
      .to({ x, y }, 500)
      .repeat(0)
      .delay(500)
      .easing(Tween.Easing.Cubic.In)
      .start();
  }
  ticcker() {
    this.ticker.add(delta => {
      Tween.update(this.ticker.lastTime)
    })
  }
  actionCard(n: string, type: string, coord: Coords, targetCoords: Coords) {
    const card = this.Card.add(n, type, coord);
    this.stage.addChild(card);
    this.action(card, targetCoords)
  }
  startGame() {
    this.ticcker();
    this.actionCard("10", "maca", { x: 1400, y: -250 }, { x: W / 2 - 120 - cardSizes.width / 2, y: 100 })
    this.actionCard("8", "karo", { x: 1400, y: -250 }, { x: W / 2 - 40 - cardSizes.width / 2, y: 108 })
    this.actionCard("K", "kupa", { x: 1400, y: -250 }, { x: W / 2 + 40 - cardSizes.width / 2, y: 100 })
    this.actionCard("4", "karo", { x: 1400, y: -250 }, { x: W / 2 + 120 - cardSizes.width / 2, y: 104 })

    this.actionCard("10", "maca", { x: 1400, y: -250 }, { x: W / 2 - 120 - cardSizes.width / 2, y: 400 })
    this.actionCard("8", "karo", { x: 1400, y: -250 }, { x: W / 2 - 40 - cardSizes.width / 2, y: 408 })
    this.actionCard("K", "kupa", { x: 1400, y: -250 }, { x: W / 2 + 40 - cardSizes.width / 2, y: 400 })
    this.actionCard("10", "kupa", { x: 1400, y: -250 }, { x: W / 2 + 120 - cardSizes.width / 2, y: 404 })
  }
}
(window as any).context = new BlackJack();