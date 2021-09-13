import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import { cardSizes, cardsElementsPosiiton } from "./config";
import { Container } from "pixi.js";
import { CardIntFace } from "./interface";


export default class Card {
  cardScale: number = 1;
  cElPos = cardsElementsPosiiton;
  cardElemsForNum = {
    x: cardSizes.width / 2,
    y: cardSizes.height - 90
  }
  private renderer;
  constructor(cardScale, renderer) {
    this.renderer = renderer
    this.cardScale = cardScale;
  }
  private addReactange() {
    let rectangle = new Graphics();
    rectangle.beginFill(0xFFFFFF);
    rectangle.lineStyle(1, 0x000000, .5);
    rectangle.drawRoundedRect(0, 0, cardSizes.width, cardSizes.height, 10);
    rectangle.endFill();
    return this.renderer.generateTexture(rectangle);
  }

  private addCardType(type: string) {
    const cardType = PIXI.Sprite.from(type);
    cardType.width = 120;
    cardType.height = 125;
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

  private addCardNum(n: string, color: number, type: string) {
    const numCon = new Container();
    numCon.width = cardSizes.width;
    numCon.height = cardSizes.height;
    //@ts-ignore
    const num = new PIXI.Text(n, { fill: color, fontFamily: "Arial", fontSize: 55, fontWeight: 400 });
    num.anchor.set(.5);
    Object.assign(num, { x: 30, y: 35 });

    const typeImg = PIXI.Sprite.from(type);
    typeImg.anchor.set(.5);
    typeImg.width = 30;
    typeImg.height = 30;
    Object.assign(typeImg, { x: 30, y: 75 })

    numCon.addChild(num, typeImg);
    return numCon
  }
  add(name: string, puan: number, type: string, { x, y }: { x: number, y: number }) {
    const card = new PIXI.Container() as CardIntFace;
    const bg = PIXI.Sprite.from("arkataraf");

    card.puan = puan;
    card.name = name;
    card.type = type;
    card.position.set(x, y);

    bg.position.set(0, 0);
    bg.width = cardSizes.width * this.cardScale;
    bg.height = cardSizes.height * this.cardScale;
    card.addChild(bg);
    return card;
  }
  addCardArkaTaraf(card:CardIntFace){
    const intornCard = card.children[0];
    intornCard.destroy();
    const arkataraf = PIXI.Sprite.from("arkataraf");
    arkataraf.position.set(0, 0);
    arkataraf.width = cardSizes.width * this.cardScale;
    arkataraf.height = cardSizes.height * this.cardScale;
    card.addChild(arkataraf);
  }
  addCard(card: CardIntFace) {
    const arkataraf = card.children[0];
    arkataraf.destroy();
    const intornCard = new PIXI.Container();

    const name = card.name;
    const type = card.type;

    const color = (type == "kupa" || type == "karo") ? 0xFF0000 : 0x000000;
    const bgTexture = this.addReactange();
    const bg = PIXI.Sprite.from(bgTexture);
    const cardNum = this.addCardNum(name, color, type);

    bg.position.set(0, 0);

    intornCard.addChild(bg, cardNum);

    if (name == "J" || name == "Q" || name == "K") {
      const e = this.cElPos[name];
      const images = this.addRoyalCardImages(name, color);
      Object.assign(images.hat, e.hat);
      Object.assign(images.mugsoft, e.logo);
      intornCard.addChild(images.hat, images.mugsoft)
    } else {
      const el = this.addCardType(type);
      Object.assign(el, this.cardElemsForNum)
      intornCard.addChild(el);
    }
    intornCard.width = cardSizes.width * this.cardScale;
    intornCard.height = cardSizes.height * this.cardScale;
    intornCard.scale.set(-1*this.cardScale, 1*this.cardScale);
    card.addChild(intornCard);
  }
}