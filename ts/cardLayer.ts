import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import Tween from "tween.ts";
import Card from "./card";
import { cardConCoords, cardScale, dealerCordandRot } from "./config";
import { CardIntFace, Owner, CardConCoords, Coord } from "./interface";

export default class CardLayer {
  private renderer;
  private stage;
  private Card;

  private lower = new PIXI.Container();
  middle = new PIXI.Container();
  private upper = new PIXI.Container();

  private gameCards: CardIntFace[][][] = [[[], [], []], [[], [], []], [[], [], []]]
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

  action(Elem: PIXI.Container, targetCoord: Coord, rotation?: number, fn?: () => void) {
    return new Tween.Tween(Elem)
      .to({ x: targetCoord.x, y: targetCoord.y, rotation }, 1000)
      .easing(Tween.Easing.Cubic.In)
      .start()
      .onComplete(() => {
        Elem.scale.set(1);
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
    cardAltlik.rotation = dealerCordandRot.rotation;
    cardAltlik.anchor.set(0, 1)
    cardAltlik.position.set(dealerCordandRot.coord.x, dealerCordandRot.coord.y);
    parent.addChild(cardAltlik);
  }

  actionCard(n: string, type: string, owner: Owner, coordIndex: number, fn?: () => void) {
    const number = (n == "J" || n == "Q" || n == "K") ? 10 : n == "A" ? 11 : Number(n);
    const gameCardArr = this.gameCards[owner][coordIndex]
    const coord = dealerCordandRot.coord;
    coord.y += 4;
    const card: CardIntFace = this.Card.add(n, number, type, coord);
    const targetInfo = cardConCoords[owner];
    card.rotation = -dealerCordandRot.rotation - Math.PI / 2;
    card.scale.set(.8);
    this.middle.addChild(card);
    if (gameCardArr.length < 4) {
      gameCardArr.forEach(e => {
        this.action(e, { x: e.x + targetInfo.raiseX, y: e.y + targetInfo.raiseY });
      })
      this.action(card, targetInfo.coords[coordIndex], targetInfo.rotation, fn);
    }
    else {
      const target = gameCardArr[gameCardArr.length - 4];
      this.action(card, { x: target.x + targetInfo.newPerX, y: target.y + targetInfo.newPerY }, targetInfo.rotation, fn);
    }

    gameCardArr.push(card);
  }

  update(lastTime: number) {
    Tween.update(lastTime);
  }
}