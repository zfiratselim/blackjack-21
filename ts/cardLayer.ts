import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import Card from "./card";
import { cardConCoords, cardScale, dealerCordandRot, StackOnCoordAndRot } from "./config";
import { CardIntFace, Owner, ActionCardIntFace, Coord, NewCardListInt } from "./interface";

export default class CardLayer {
  private stage: PIXI.Container;
  private renderer: PIXI.Renderer;
  private Card;

  private lower = new PIXI.Container();
  private middle = new PIXI.Container();
  private upper = new PIXI.Container();

  private newCardList: NewCardListInt[] = []
  private gameCards: CardIntFace[][][] = [[[], [], []], [[], [], []], [[], [], []], [[], [], []]];
  private gameTotalPuanCon: { [key: string]: PIXI.Container } = {};
  private fakeCards: CardIntFace[] = [];
  private actionCardList: ActionCardIntFace[] = [];

  constructor(stage, renderer) {
    this.stage = stage;
    this.renderer = renderer;
    this.Card = new Card(cardScale, this.renderer);
  }

  setActionCardList(card: PIXI.Container, targetCoord: Coord, numOfAniFrame: number, rotation?: number, changeSurface?: () => void, onComplete?: () => void, scaleForX?: number) {
    const actionCard: ActionCardIntFace = {} as ActionCardIntFace;
    const brmCoord = {
      x: (targetCoord.x - card.x) / numOfAniFrame,
      y: (targetCoord.y - card.y) / numOfAniFrame
    }

    actionCard.time = 0;
    actionCard.card = card;
    actionCard.targetCoord = targetCoord;
    actionCard.brmCoord = brmCoord;
    actionCard.numOfAniFrame = numOfAniFrame;
    if (onComplete) actionCard.onComplete = onComplete;
    if (changeSurface) actionCard.changeSurface = changeSurface;
    if (rotation) {
      actionCard.rotation = rotation;
      actionCard.brmRot = (rotation - card.rotation) / numOfAniFrame;
    }
    if (scaleForX) {
      actionCard.scaleForX = scaleForX;
      actionCard.brmScaleForX = (scaleForX - card.scale.x) / numOfAniFrame;
    }
    this.actionCardList.push(actionCard);
  }

  private addCircle(size, color: number) {
    let circle = new Graphics();
    circle.beginFill(color);
    circle.drawCircle(0, 0, size);
    circle.endFill();
    return circle
  }
  private addTotalPuanCon(coord: Coord, color: number) {
    const size = 18
    const totalPuanCon = new PIXI.Container();
    const circle = this.addCircle(size, color);
    const text = new PIXI.Text("", { fontSize: 20, fill: 0x000000 });

    circle.position.set(size);

    text.anchor.set(.5);
    text.position.set(size);

    totalPuanCon.position.set(coord.x, coord.y);
    totalPuanCon.addChild(circle, text);
    this.upper.addChild(totalPuanCon);
    return totalPuanCon
  }

  action() {
    this.actionCardList.forEach((e, i) => {
      e.time++;
      e.card.x += e.brmCoord.x;
      e.card.y += e.brmCoord.y;
      e.brmRot ? e.card.rotation += e.brmRot : "";
      e.scaleForX ? e.card.scale.set(e.card.scale.x += e.brmScaleForX, 1) : "";
      if (e.changeSurface && e.time == e.numOfAniFrame / 2) {
        e.changeSurface();
      }
      if (e.time == e.numOfAniFrame) {
        e.card.position.set(e.targetCoord.x, e.targetCoord.y);
        e.rotation = e.rotation;
        this.actionCardList.splice(i, 1);
        if (e.onComplete) e.onComplete();
      }
    })
  }
  addPlasticCard(n: number) {
    this.Card.addPlasticCard(this.fakeCards[n]);
    if (n < this.fakeCards.length - 1) {
      this.Card.addCardArkaTaraf(this.fakeCards[n + 1]);
    }
  }
  addFakeCard() {
    for (let i = 0; i < 10; i++) {
      const coord = {
        x: dealerCordandRot.coord.x,
        y: dealerCordandRot.coord.y - 20 + 3 * i
      }
      const fakeCard = this.Card.add("4", "karo", coord);
      fakeCard.rotation = -dealerCordandRot.rotation - Math.PI / 2;
      fakeCard.scale.set(.8);
      this.middle.addChild(fakeCard);
      this.fakeCards.push(fakeCard);
    }
    this.fakeCards = this.fakeCards.reverse();
  }
  addLayers() {
    this.stage.addChild(this.lower, this.middle, this.upper);
    this.addCardBoxAltUst("cardAltlik", this.lower);
    this.addCardBoxAltUst("cardUstluk", this.upper);
    this.addFakeCard();
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
  getNewCard(newCard: NewCardListInt) {
    this.newCardList.push(newCard);
  }
  addNewCard(newCard: NewCardListInt) {
    newCard.changeSurface = true;
    this.actionCard(newCard);
  }

  actionCard(newCard: NewCardListInt) {
    const gameCardArr = this.gameCards[newCard.owner][newCard.coordIndex];
    const coord = dealerCordandRot.coord;
    coord.y += 4;
    const card: CardIntFace = this.Card.add(newCard.n, newCard.type, coord);
    const targetInfo = cardConCoords[newCard.owner];
    const addCardSurface = () => this.Card.addCard(card);
    const changeSurfaceFunc = newCard.changeSurface ? addCardSurface : () => { };

    card.rotation = -dealerCordandRot.rotation - Math.PI / 2;
    card.scale.set(.8);
    this.middle.addChild(card);
    if (gameCardArr.length < 4) {
      gameCardArr.forEach(e => {
        this.setActionCardList(e, { x: e.x + targetInfo.raiseX, y: e.y + targetInfo.raiseY }, 40);
      });
      const onComplete = () => {
        this.setActionCardList(card, targetInfo.coords[newCard.coordIndex], 40, targetInfo.rotation, changeSurfaceFunc, () => { }, -1);
      }
      this.setActionCardList(card, { x: dealerCordandRot.coord.x, y: dealerCordandRot.coord.y + 80 }, 20, 0, () => { }, onComplete);
    }
    else {
      const target = gameCardArr[gameCardArr.length - 4];
      const onComplete = () => {
        this.setActionCardList(card, { x: target.x + targetInfo.newPerX, y: target.y + targetInfo.newPerY }, 40, targetInfo.rotation, changeSurfaceFunc, () => { }, -1);
      }
      this.setActionCardList(card, { x: dealerCordandRot.coord.x, y: dealerCordandRot.coord.y + 80 }, 20, 0, () => { }, onComplete);
    }
    gameCardArr.push(card);

    if (gameCardArr.length == 1) {
      const tCoord = targetInfo.coords[newCard.coordIndex]
      const targetC = {
        x: tCoord.x + targetInfo.totalPuanDistanceX,
        y: tCoord.y + targetInfo.totalPuanDistanceY
      }
      const totalPuanCon = this.addTotalPuanCon(targetC, 0x0fe244);
      (totalPuanCon.children[1] as PIXI.Text).text = "25";
    }
  }

  stackOnCards(owner, cardsIndex) {
    const cards: CardIntFace[] = this.gameCards[owner][cardsIndex];
    cards.forEach(e => {
      const changeSurface = () => { this.Card.addCardArkaTaraf(e) };
      const onComplete = () => {
        setTimeout(() => {
          this.setActionCardList(e, StackOnCoordAndRot.coord, 30, StackOnCoordAndRot.rotation)
        }, 200);
      }
      this.setActionCardList(e, cardConCoords[owner].coords[0], 20, 0, changeSurface, onComplete, 1)
    })
  }
  update() {
    this.newCardList.forEach((e, i) => {
      this.addNewCard(e);
      this.newCardList.splice(i, 1);
    })
    this.action();
  }
}