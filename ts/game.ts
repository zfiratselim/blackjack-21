import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import { cardSizes, cardsElementsPosiiton } from "./config";

export default class BlackJack extends PIXI.Application {
  cElPos = cardsElementsPosiiton;
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
  addReactange() {
    let rectangle = new Graphics();
    rectangle.beginFill(0xFFFFFF);
    rectangle.lineStyle(0);
    rectangle.drawRoundedRect(0, 0, cardSizes.width, cardSizes.height, 10);
    rectangle.endFill();
    return this.renderer.generateTexture(rectangle);
  }
  addCardType(type: string) {
    const cardType = PIXI.Sprite.from(type);
    cardType.width = 40;
    cardType.height = 45;
    cardType.anchor.set(.5);
    return cardType;
  }
  addRoyalCardImages(name, color) {
    const hat = PIXI.Sprite.from(name);
    const mugsoft = PIXI.Sprite.from("mugSoftLogo");
    mugsoft.tint = color;
    return { hat, mugsoft }
  }
  addCard(name: string, type: string) {
    const color = (type == "kupa" || type == "karo") ? 0xFF0000 : 0x000000;
    const card = new PIXI.Container();
    const bgTexture = this.addReactange();
    card.position.set(100, 100);

    const bg = PIXI.Sprite.from(bgTexture);
    bg.position.set(0, 0);

    card.addChild(bg)

    if (name == "J" || name == "Q" || name == "K") {
      const e = this.cElPos[name];
      const images = this.addRoyalCardImages(name, color);
      Object.assign(images.hat, e.hat);
      console.log(images.mugsoft,e.logo)
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
  startGame() {
    const card = this.addCard("Q", "sinek");
    this.stage.addChild(card);
  }
}
(window as any).context = new BlackJack();