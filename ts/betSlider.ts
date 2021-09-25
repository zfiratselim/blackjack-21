import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import { H, W } from "./config";
import { Coord } from "./interface";

const sliderSizes = {
  width: 150,
  height: 320
}

export default class BetSlider {
  private stage: PIXI.Container;
  private renderer: PIXI.Renderer;
  private scale: number;
  private betSliderCon: PIXI.Container = new PIXI.Container;
  private valueBaloon: PIXI.Container;
  private maxBet: number = 0;
  private minBet = 0;
  constructor(stage, renderer, scale) {
    this.renderer = renderer;
    this.stage = stage;
    this.scale = scale;
  }
  private addReactange({ width, height }: { width: number, height: number }, radius: number, color: number) {
    let rectangle = new Graphics();
    rectangle.beginFill(color);
    rectangle.drawRoundedRect(0, 0, width, height, radius);
    rectangle.endFill();
    return this.renderer.generateTexture(rectangle);
  }
  private addTireler() {
    for (let i = 0; i < 22; i++) {
      const tireTexture = this.addReactange({ width: 64 - i * 2, height: 4 }, 5, 0xeeeeee);
      const tire = PIXI.Sprite.from(tireTexture);
      tire.anchor.set(.5);
      tire.position.set(sliderSizes.width / 2, 12 * i + 26);
      this.betSliderCon.addChild(tire);
    }
  }
  private addButtons() {
    const buttonSizes = { width: 120, height: 35 }
    const buttonLocs: Coord[] = [{ x: -125, y: 0 }, { x: -120, y: 50 }, { x: -115, y: 100 }, { x: -100, y: 200 }];
    buttonLocs.forEach(e => {
      const button = PIXI.Sprite.from("sliderButton");
      button.tint = 0x85465f;
      Object.assign(button, buttonSizes, e);
      this.betSliderCon.addChild(button)
    })
  }
  private addValueBaloon() {
    const sizes={width:80,height:40}
    this.valueBaloon = new PIXI.Container();
    const baloonTexture = this.addReactange(sizes, 10, 0x045803);
    const valueBaloonSpr = PIXI.Sprite.from(baloonTexture);
    
    Object.assign(valueBaloonSpr,sizes);

    const valueText = new PIXI.Text(this.minBet + "", { fill: 0xffffff, fontSize: 25, fontWeight:800 });
    valueText.anchor.set(.5);
    valueText.position.set(sizes.width/2, 20);

    this.valueBaloon.position.set(sliderSizes.width / 2 - sizes.width/2, 210);
    this.valueBaloon.addChild(valueBaloonSpr, valueText);
    this.betSliderCon.addChild(this.valueBaloon);
  }
  private addBg() {
    const sliderBG = PIXI.Sprite.from("betSlider");
    sliderBG.alpha = .7;
    Object.assign(sliderBG, sliderSizes);
    this.betSliderCon.addChild(sliderBG);
  }
  private changeValueBaloonValue(value: number) {
    (this.valueBaloon.children[1] as PIXI.Text).text = value + "";
  }
  private createDragAndDropForSliderButton(target: PIXI.Sprite) {
    let t: boolean = false;
    const returnValue = (v) => {
      t = false;
      return v
    }
    target.interactive = true;
    target.on("pointerdown", e => t = true)
    target.on("pointerup", e => t = false)
    target.on("pointermove", (e) => {
      if (!t) return;
      const y = target.position.y + e.data.originalEvent.movementY * (1 / this.scale);
      const newPosY = y > 280 ? returnValue(280) : y < 25 ? returnValue(25) : y;
      target.position.y = newPosY;
      this.valueBaloon.position.y = newPosY - 70;
      const delta = 280 - 25;
      const deltaY = newPosY - 25;
      const bet = this.maxBet - (Math.floor((this.maxBet - this.minBet) / delta * deltaY));
      this.changeValueBaloonValue(bet);
    });
  }
  private addSliderButton() {
    const sliderScrollButton = PIXI.Sprite.from("sliderScrollButton");
    sliderScrollButton.anchor.set(.5);
    sliderScrollButton.position.set(sliderSizes.width / 2, 280);
    this.createDragAndDropForSliderButton(sliderScrollButton);
    this.betSliderCon.addChild(sliderScrollButton);
  }
  add(minBet: number, maxBet: number) {
    this.minBet = minBet;
    this.maxBet = maxBet;

    this.addBg();
    this.addTireler();
    this.addSliderButton();
    this.addValueBaloon();
    //this.addButtons();
  }
  addLayer() {
    this.betSliderCon.x = W - 420;
    this.betSliderCon.y = H - 430
    this.stage.addChild(this.betSliderCon);
  }
}