import * as PIXI from "pixi.js";
import Card from "./Card";
import Tween from "tween.ts";


interface Coords {
  x: number,
  y: number
}

export default class BlackJack extends PIXI.Application {
  Card = new Card(this.renderer);
  constructor() {
    super({
      view: <HTMLCanvasElement>document.querySelector("#canvas"),
      width: 600,
      height: 600,
      backgroundColor: 0x53FF15
    })
    this.loader
      .add("mugSoftLogo", "images/mugsoft.png")
      .add("Q", "images/queen.png")
      .add("K", "images/king.png")
      .add("J", "images/joker.png")
      .add("sinek", "images/sinek.png")
      .add("karo", "images/karo.png")
      .add("maca", "images/maca.png")
      .add("kupa", "images/kupa.png")
      .load(() => this.startGame())
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
  actionCard(n: string, type: string, coord: Coords, targetCoords: Coords, rot: number) {
    const card = this.Card.add(n, type, coord);
    card.rotation = rot;
    this.stage.addChild(card);
    this.action(card, targetCoords)
  }
  startGame() {
    this.ticcker();
    this.actionCard("10", "maca", { x: 800, y: -250 }, { x: 100, y: 100 }, 0)
    this.actionCard("8", "karo", { x: 800, y: -250 }, { x: 180, y: 108 }, 0)
    this.actionCard("9", "kupa", { x: 800, y: -250 }, { x: 260, y: 100 }, 0)
    this.actionCard("1", "maca", { x: 800, y: -250 }, { x: 340, y: 104 }, 0)
  }
}
(window as any).context = new BlackJack();