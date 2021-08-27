import * as PIXI from "pixi.js";
import Card from "./Card";

export default class BlackJack extends PIXI.Application {
  Card = new Card(this.renderer);
  constructor() {
    super({
      view: <HTMLCanvasElement>document.querySelector("#canvas"),
      width: 600,
      height: 600,
      backgroundColor: 0x000000
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


  startGame() {
    const card = this.Card.add("10", "kupa");
    this.stage.addChild(card);
  }
}
(window as any).context = new BlackJack();