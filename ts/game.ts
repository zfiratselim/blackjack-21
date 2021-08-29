import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import Card from "./card";
import Chip from "./chip";
import Tween from "tween.ts";
import { W, H, cardSizes, chipCoords, totalPuanCoords } from "./config";
import { ChipIntFace } from "./interface";

interface Coords {
  x: number,
  y: number
}
interface CardIntFace extends PIXI.Container {
  puan: number
}

interface Button extends PIXI.Container {
  fn: () => void
}
enum Owner {
  player,
  kasa
}

class Button {
  private renderer
  constructor(renderer) {
    this.renderer = renderer;
  }
  private addReactange({ width, height }: { width: number, height: number }, color) {
    let rectangle = new Graphics();
    rectangle.beginFill(color);
    rectangle.drawRoundedRect(0, 0, width, height, 5);
    rectangle.endFill();
    return this.renderer.generateTexture(rectangle);
  }

  add(parent: PIXI.Container, color: number, title: string, coords: { x: number, y: number }) {
    const buttonSize = { width: 140, height: 65 }
    const Button = new PIXI.Container() as Button;
    const buttonBG = PIXI.Sprite.from(this.addReactange(buttonSize, color));
    const buttonText = new PIXI.Text(title, { fontFamily: "Arial", fontSize: 36, fill: 0xFFFFFF });


    buttonBG.position.set(0, 0);
    buttonBG.width = buttonSize.width;
    buttonBG.height = buttonSize.height;

    buttonText.anchor.set(.5);
    buttonText.position.set(buttonSize.width / 2, buttonSize.height / 2);

    Button.width = buttonSize.width;
    Button.height = buttonSize.height;
    Button.position.set(coords.x, coords.y);
    Button.addChild(buttonBG, buttonText);
    parent.addChild(Button);
    return Button
  }
}



export default class BlackJack extends PIXI.Application {
  Card = new Card(this.renderer);
  Chip = new Chip();
  Button = new Button(this.renderer);
  chipAreaCon: PIXI.Container;
  chipPrices = [10, 20, 50, 100, 200, 500, 1000]

  kasa: CardIntFace[] = [];
  player: CardIntFace[] = [];
  bahisSpr: PIXI.Text;
  totalBahis: number = 0;
  totalPuanText: PIXI.Text[] = [];
  click: boolean = false;
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
      .add("kurdele", "images/kurdele.png")
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
  changeTotalPuans() {
    let kasaTotalPuan: number = 0;
    let playerTotalPuan: number = 0;

    this.kasa.forEach(e => kasaTotalPuan += e.puan)
    this.player.forEach(e => playerTotalPuan += e.puan)

    this.totalPuanText[0].text = kasaTotalPuan + ""
    this.totalPuanText[1].text = playerTotalPuan + ""
  }
  addInteractivityForButton(button: Button, fn: () => void) {
    button.interactive = true;
    const buttonTint = (button.children[0] as PIXI.Sprite).tint;
    button.on("pointerdown", e => {
      fn();
    })
    button.on("pointerover", e => {
      (button.children[0] as PIXI.Sprite).tint = 0x3289f3;
    })
    button.on("pointerout", e => {
      (button.children[0] as PIXI.Sprite).tint = buttonTint;
    })
  }
  addKurdele(title: string, color: number, { x, y }: { x: number, y: number }) {
    const KurdeleCon = new PIXI.Container();
    const kurdeleImg = PIXI.Sprite.from("kurdele");
    const kurdeleText = new PIXI.Text(title, { fontFamily: "Arial", fontSize: 36, fill: 0xFFFFFF });

    kurdeleImg.width = cardSizes.width + 150;
    kurdeleImg.height = 52;
    kurdeleImg.tint = color;
    kurdeleImg.position.set(0, 0);

    kurdeleText.anchor.set(.5);
    kurdeleText.position.set((cardSizes.width + 150) / 2, 52 / 2)

    KurdeleCon.position.set(x, y);
    KurdeleCon.addChild(kurdeleImg, kurdeleText);
    return KurdeleCon;
  }

  action(Elem: PIXI.Container | ChipIntFace, { x, y }: Coords, fn?: () => void) {
    return new Tween.Tween(Elem)
      .to({ x, y }, 500)
      .repeat(0)
      .easing(Tween.Easing.Cubic.In)
      .start()
      .onComplete(() => {
        fn && fn();
        this.click = false;
      })
  }
  ticcker() {
    this.ticker.add(delta => {
      Tween.update(this.ticker.lastTime)
    })
  }
  calculateTargetCoord(card: PIXI.Container, owner: Owner) {
    let center;
    let targetCoords: { x: number, y: number };
    let cards;
    if (owner == Owner.kasa) {
      cards = this.kasa;
      center = { x: W / 2 - cardSizes.width / 2, y: 60 }
    }
    if (owner == Owner.player) {
      cards = this.player;
      center = { x: W / 2 - cardSizes.width / 2, y: H - 300 }
    }
    if (cards.length == 0) targetCoords = center;
    cards.forEach((e, i) => {
      this.action(e, { x: e.x - 60, y: e.y })
      if (i == cards.length - 1) {
        targetCoords = { x: e.x, y: center.y + Math.floor(Math.random() * 6 - 2) }
      }
    })
    cards.push(card);
    return targetCoords
  }
  actionCard(n: string, type: string, owner: Owner, fn?: () => void) {
    const number = (n == "J" || n == "Q" || n == "K") ? 10 : n == "A" ? 11 : Number(n);
    const coord = { x: 1400, y: -250 }
    const card = this.Card.add(n, type, coord) as CardIntFace;
    card.scale.set(.8)
    card.puan = number;
    this.stage.addChild(card);
    const targetCoords = this.calculateTargetCoord(card, owner);
    this.action(card, targetCoords, fn);
    this.changeTotalPuans();
  }
  updateBahis() {
    this.bahisSpr.text = this.totalBahis + ""
  }
  addBahis() {
    const bahis = new PIXI.Text(this.totalBahis + "", { fontFamily: "Arial", fontSize: 36 });
    bahis.anchor.set(.5);
    bahis.position.set(W / 2 + 60, H / 2);
    this.stage.addChild(bahis);
    this.bahisSpr = bahis;
  }
  createChipArea() {
    const chipColors: number[] = [0xFF0000, 0x00FF00, 0x0000FF, 0x000000, 0xF359da, 0xd5a3f8];
    this.chipAreaCon = new PIXI.Container();
    const chipAreaBG = PIXI.Sprite.from(PIXI.Texture.WHITE);

    const addChiponCon = (e, i) => {
      const chip = this.Chip.add(this.chipPrices[i], chipColors[i], e);
      chip.interactive = true;
      chip.parentName = "chipAreaCon";
      this.chipAreaCon.addChild(chip);
      chip.on("pointerdown", el => {
        if (this.click) return
        this.click = true;
        addChiponCon(e, i);
        if (chip.parentName == "stage") {
          const fn = () => {
            chip.parent.removeChild(chip);
            this.chipAreaCon.addChild(chip);
            chip.position.set(e.x, e.y);
          }
          this.action(chip, { x: e.x, y: e.y + H / 3 * 2 }, fn);
          this.totalBahis -= this.chipPrices[i];
          chip.parentName = "chipAreaCon";
        }
        else if (chip.parentName == "chipAreaCon") {
          chip.parent.removeChild(chip);
          chip.position.set(chip.position.x + 0, chip.position.y + H / 3 * 2);
          this.action(chip, { x: W / 2, y: H / 2 - 150 });
          this.totalBahis += this.chipPrices[i];
          chip.parentName = "stage";
          this.stage.addChild(chip);
        }
        this.updateBahis();
      })
    }

    chipAreaBG.tint = 0x000000;
    chipAreaBG.alpha = .15;
    chipAreaBG.position.set(0, 0);
    chipAreaBG.width = W;
    chipAreaBG.height = H / 3;

    this.chipAreaCon.addChild(chipAreaBG);
    this.chipAreaCon.position.set(0, H / 3 * 2);

    chipCoords.forEach((e, i) => {
      addChiponCon(e, i)
    })
    this.stage.addChild(this.chipAreaCon);
  }

  sendSocketCardRequest() {
    this.recieveCardfromSocket(Math.floor(Math.random() * 9) + 1 + "", "sinek", Owner.player)
  }
  recieveCardfromSocket(num: string, type: string, owner: Owner) {
    this.changeTotalPuans();
    this.actionCard(num, type, owner);
  }
  addButtons() {
    const gameButtons = () => {
      const hitFunc = () => {
        this.sendSocketCardRequest()
      }

      const standFunc = () => {

      }

      this.actionCard("5", "karo", Owner.kasa, () => {
        this.actionCard("5", "karo", Owner.player, () => {
          this.actionCard("8", "karo", Owner.kasa, () => {
            const hit = this.Button.add(this.stage, 0x3399ff, "Hit", { x: W / 4, y: H / 2 - 100 })
            const stand = this.Button.add(this.stage, 0x3399ff, "Stand", { x: W / 4 * 3, y: H / 2 - 100 })
            this.addInteractivityForButton(hit, hitFunc);
            this.addInteractivityForButton(stand, standFunc);
          })
        })
      })


    }
    const dealButton = () => {
      const Button = this.Button.add(this.stage, 0x3399ff, "Deal", { x: W / 4 * 3, y: H / 2 - 100 })
      const destroyChipArea = () => {
        if (this.totalBahis > 0) {
          this.addTotalPuans();
          this.chipAreaCon.destroy();
          Button.destroy();
          gameButtons();
        }
      }
      this.addInteractivityForButton(Button, destroyChipArea);
    }
    dealButton();
  }
  startGame() {
    this.ticcker();
    this.addBahis();
    this.createChipArea();
    this.addButtons();
    const kurdele = this.addKurdele("Win", 0x00b300, { x: 200, y: 200 });
    const BJ = this.addKurdele("BlackJack", 0xBA0000, { x: 200, y: 500 });
    this.stage.addChild(kurdele, BJ);
  }
}
(window as any).context = new BlackJack();