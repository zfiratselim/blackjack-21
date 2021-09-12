import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import Card from "./card";
import { cardConCoords, cardScale, dealerCordandRot } from "./config";
import { CardIntFace, Owner, ActionCardIntFace, Coord } from "./interface";

export default class CardLayer {
  private renderer;
  private stage;
  private Card;

  private lower = new PIXI.Container();
  middle = new PIXI.Container();
  private upper = new PIXI.Container();

  private gameCards: CardIntFace[][][] = [[[], [], []], [[], [], []], [[], [], []]];
  private actionCardList: ActionCardIntFace[] = [];

  constructor(stage, renderer) {
    this.stage = stage;
    this.renderer = renderer;
    this.Card = new Card(cardScale, this.renderer);
  }

  setActionCardList(card: PIXI.Container, targetCoord: Coord, rotation?: number, onComplete?: () => void, scaleForX?: number) {
    const numberOfFrames = 30;
    const actionCard: ActionCardIntFace = {} as ActionCardIntFace;
    if(scaleForX==-1){
      
    }
    const brmCoord = {
      x: (targetCoord.x - card.x) / numberOfFrames,
      y: (targetCoord.y - card.y) / numberOfFrames
    }

    actionCard.time = 0;
    actionCard.card = card;
    actionCard.targetCoord = targetCoord;
    actionCard.brmCoord = brmCoord;

    if (onComplete) actionCard.onComplete = onComplete;
    if (rotation) {
      console.log(rotation);
      actionCard.rotation = rotation;
      actionCard.brmRot = (rotation - card.rotation) / numberOfFrames;
    }
    if (scaleForX) {
      actionCard.scaleForX = scaleForX;
      actionCard.brmScaleForX = (scaleForX - card.scale.x) / numberOfFrames
    }
    this.actionCardList.push(actionCard);
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

  action() {
    this.actionCardList.forEach((e, i) => {
      e.time++;
      e.card.x += e.brmCoord.x;
      e.card.y += e.brmCoord.y;
      e.brmRot ? e.card.rotation += e.brmRot : "";
      e.scaleForX ? e.card.scale.set(e.card.scale.x += e.brmScaleForX, 1) : "";
      if(e.time==15){
        this.Card.addCard(e.card);
      }
      if (e.time == 30) {
        e.card.position.set(e.targetCoord.x, e.targetCoord.y);
        e.rotation = e.rotation;
        this.actionCardList.splice(i, 1);
      }
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
        this.setActionCardList(e, { x: e.x + targetInfo.raiseX, y: e.y + targetInfo.raiseY });
      })
      console.log(targetInfo.rotation)
      this.setActionCardList(card, targetInfo.coords[coordIndex], targetInfo.rotation, fn, -1);
    }
    else {
      const target = gameCardArr[gameCardArr.length - 4];
      this.setActionCardList(card, { x: target.x + targetInfo.newPerX, y: target.y + targetInfo.newPerY }, targetInfo.rotation, fn,-1);
    }

    gameCardArr.push(card);
  }

  update() {
    this.action()
  }
}