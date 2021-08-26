import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import Card from "./card";

export default class BlackJack extends PIXI.Application {
  private card = new Card();
  constructor() {
    super({
      view: <HTMLCanvasElement>document.querySelector("#canvas"),
      width: 600,
      height: 600,
      backgroundColor: 0x000000
    })
    this.loader
      .add("queen", "images/queen.png")
      .add("king", "images/king.png")
      .add("joker", "images/joker.png")
      .add("sinek", "images/sinek.png")
      .add("karo", "images/karo.png")
      .add("maca", "images/maca.png")
      .add("kupa", "images/kupa.png")
      .load(() => this.startGame())

  }
  addReactange() {
    let rectangle = new Graphics();
    rectangle.beginFill(0xFFFFFF);
    rectangle.lineStyle(0);
    rectangle.drawRoundedRect(0, 0, 200, 320, 10);
    rectangle.endFill();
    return this.renderer.generateTexture(rectangle);
  }
  addCardType(type: string) {
    const cardType = PIXI.Sprite.from(type);
    cardType.width = 40;
    cardType.height = 45;
    return cardType;
  }
  addCard() {
    const card = new PIXI.Container();
    const bgTexture = this.addReactange();
    card.position.set(100, 100);

    const bg = PIXI.Sprite.from(bgTexture);
    bg.position.set(0, 0);

    const cardType = this.addCardType("sinek");

    card.addChild(bg, cardType);

    card.width = 200;
    card.height = 320;
    return card
  }
  startGame() {
    const card = this.addCard();
    this.stage.addChild(card);
  }
}
(window as any).context = new BlackJack();