import * as PIXI from "pixi.js";

import Table from "./table";
import CardLayer from "./cardLayer";
import ButtonLayer from "./buttonLayer";
import { W, H } from "./config";
import { Owner } from "./interface";


export default class BlackJack extends PIXI.Application {
  private Table: Table = new Table(this.stage);
  private CardLayer: CardLayer = new CardLayer(this.stage, this.renderer);
  private ButtonLayer: ButtonLayer;
  private scale: number;

  constructor(s) {
    super({
      view: <HTMLCanvasElement>document.querySelector("#canvas"),
      width: W * s,
      height: H * s,
      backgroundColor: 0x53FF15
    })
    this.scale = s;
    this.ButtonLayer = new ButtonLayer(this.stage, this.renderer, this.scale, "sockettt", 20, 100);

    this.stage.scale.set(this.scale);
    this.loader
      .add("mugSoftLogo", "images/mugsoft.png")
      .add("Q", "images/queen.png")
      .add("K", "images/king.png")
      .add("J", "images/joker.png")
      .add("sinek", "images/sinek.png")
      .add("karo", "images/karo.png")
      .add("maca", "images/maca.png")
      .add("kupa", "images/kupa.png")
      .add("arkataraf", "images/arkataraf.png")
      .add("button", "images/btn1.png")
      .add("bjTable", "images/bj_table.png")
      .add("cardAltlik", "images/card_altlik.png")
      .add("cardUstluk", "images/card_ustluk.png")
      .add("betSlider", "images/slider.png")
      .add("sliderScrollButton", "images/slider_scroll_button.png")
      .add("sliderButton", "images/slider_button.png")
      .load(() => this.startGame())
  }

  ticcker() {
    this.ticker.add(d => {
      this.CardLayer.update()
    })
  }
  startGame() {
    this.ticcker();
    this.Table.add();
    this.CardLayer.addLayers();
    const showCards = (owner, i, A) => {
      for (let a = 0; a < A; a++) {
        setTimeout(() => {
          this.CardLayer.getNewCard({ n: "4", type: "kupa", owner, coordIndex: i });
        }, 2000 * (a + 1));
      }
    }
    showCards(Owner.player1, 1, 5);
    showCards(Owner.player1, 2, 5);
    this.ButtonLayer.addButtons(0);
  }
}

function calculateScale() {
  const sW = (screen.width > 1024 ? window.innerWidth : screen.width) / W;
  const sH = (screen.width > 1024 ? window.innerHeight : screen.height) / H;
  const s = sW > sH ? sH : sW;
  (window as any).context = new BlackJack(s);
}
calculateScale();