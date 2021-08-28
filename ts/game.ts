import * as PIXI from "pixi.js";
import Card from "./Card";
import Chip from "./chip";
import Tween from "tween.ts";
import { cardSizes, chipCoords } from "./config";
import { ChipIntFace } from "./interface";
const W = 1495;
const H = 840;
interface Coords {
  x: number,
  y: number
}

export default class BlackJack extends PIXI.Application {
  Card = new Card(this.renderer);
  Chip = new Chip();
  chipPrices = [10, 20, 50, 100, 200, 500, 1000]

  bahisSpr: PIXI.Text;
  totalBahis: number = 0;
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
      .load(() => this.startGame())
  }
  action(Elem: PIXI.Container | ChipIntFace, { x, y }: Coords, fn?: () => void) {
    return new Tween.Tween(Elem)
      .to({ x, y }, 500)
      .repeat(0)
      .easing(Tween.Easing.Cubic.In)
      .start()
      .onComplete(() => fn && fn())
  }
  ticcker() {
    this.ticker.add(delta => {
      Tween.update(this.ticker.lastTime)
    })
  }
  actionCard(n: string, type: string, coord: Coords, targetCoords: Coords) {
    const card = this.Card.add(n, type, coord);
    this.stage.addChild(card);
    this.action(card, targetCoords)
  }
  updateBahis() {
    this.bahisSpr.text = this.totalBahis + ""
  }
  addBahis() {
    const bahis = new PIXI.Text(this.totalBahis + "", { fontFamily: "Arial", fontSize: 36 });
    bahis.anchor.set(.5);
    bahis.position.set(W / 2 + 60, H / 2 + 90);
    this.stage.addChild(bahis);
    this.bahisSpr = bahis;
  }
  createChipArea() {
    const chipColors: number[] = [0xFF0000, 0x00FF00, 0x0000FF, 0x000000, 0xF359da, 0xd5a3f8];
    const chipAreaCon = new PIXI.Container();
    const chipAreaBG = PIXI.Sprite.from(PIXI.Texture.WHITE);

    const addChiponCon = (e, i) => {
      const chip = this.Chip.add(this.chipPrices[i], chipColors[i], e);
      chip.interactive = true;
      chip.parentName = "chipAreaCon";
      chipAreaCon.addChild(chip);
      chip.on("pointerdown", el => {
        addChiponCon(e, i);
        if (chip.parentName == "stage") {
          const fn = () => {
            chip.parent.removeChild(chip);
            chipAreaCon.addChild(chip);
            chip.position.set(e.x, e.y);
          }
          this.action(chip, { x: e.x, y: e.y + H / 3 * 2 }, fn);
          this.totalBahis -= this.chipPrices[i];
          chip.parentName = "chipAreaCon";
        }
        else if (chip.parentName == "chipAreaCon") {
          chip.parent.removeChild(chip);
          chip.position.set(chip.position.x + 0, chip.position.y + H / 3 * 2);
          this.action(chip, { x: W / 2, y: H / 2 - 60 });
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

    chipAreaCon.addChild(chipAreaBG);

    chipAreaCon.position.set(0, H / 3 * 2);

    chipCoords.forEach((e, i) => {
      addChiponCon(e, i)
    })
    this.stage.addChild(chipAreaCon);
  }

  startGame() {
    this.ticcker();
    this.actionCard("10", "maca", { x: 1400, y: -250 }, { x: W / 2 - 120 - cardSizes.width / 2, y: 100 })
    this.actionCard("8", "karo", { x: 1400, y: -250 }, { x: W / 2 - 40 - cardSizes.width / 2, y: 108 })
    this.actionCard("K", "kupa", { x: 1400, y: -250 }, { x: W / 2 + 40 - cardSizes.width / 2, y: 100 })
    this.actionCard("4", "karo", { x: 1400, y: -250 }, { x: W / 2 + 120 - cardSizes.width / 2, y: 104 })
    this.addBahis();
    this.createChipArea();
  }
}
(window as any).context = new BlackJack();