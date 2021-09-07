import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import Chip from "./chip";
import CardLayer from "./cardLayer";
import { W, H, totalPuanCoords, cardConCoords, cardConSizesForTable} from "./config";
import { Owner } from "./interface";


class Table {
  private stage
  constructor(stage) {
    this.stage = stage;
  }
  private addReactange(rot: number) {
    let rectangle = new Graphics();
    rectangle.lineStyle(2, 0xFFFFFF, 1);
    rectangle.drawRoundedRect(0, 0, cardConSizesForTable.width, cardConSizesForTable.height, 5);
    rectangle.endFill();
    rectangle.rotation = rot;
    return rectangle;
  }
  private addCardCons(BGCon: PIXI.Container) {
    cardConCoords.forEach(e => {
      const cardConReact = this.addReactange(e.rot);
      cardConReact.position.set(e.coord.x, e.coord.y);
      BGCon.addChild(cardConReact)
    })
  }
  add() {
    const BGCon = new PIXI.Container();
    const BG = PIXI.Sprite.from("bjTable");
    BG.width = 1317;
    BG.height = 740;
    BG.position.set((W - 1317) / 2, (H - 740) / 2);
    BGCon.position.set(0, 0);
    BGCon.addChild(BG);
    this.addCardCons(BGCon)
    this.stage.addChild(BGCon);
  }
}


export default class BlackJack extends PIXI.Application {
  Chip = new Chip();
  Table = new Table(this.stage);
  CardLayer = new CardLayer(this.stage, this.renderer);
  totalPuanText: PIXI.Text[] = [];
  constructor() {
    super({
      view: <HTMLCanvasElement>document.querySelector("#canvas"),
      width: W,
      height: H,
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
      .add("chip", "images/chip.png")
      .add("button", "images/btn1.png")
      .add("bjTable", "images/bj_table.png")
      .load(() => this.startGame())
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

  sendSocketCardRequest() {
    this.recieveCardfromSocket(Math.floor(Math.random() * 9) + 2 + "", "sinek", Owner.player)
  }
  sendtoSocketStandRequest() {
    alert("Stand")
  }
  recieveCardfromSocket(num: string, type: string, owner: Owner) {
    this.CardLayer.actionCard(num, type, owner);
  }
  ticcker() {
    this.ticker.add(d => {
      this.CardLayer.update(this.ticker.lastTime)
    })
  }
  startGame() {
    this.Table.add();
    this.ticcker();
  }
}
(window as any).context = new BlackJack();