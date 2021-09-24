import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import { H, W } from "./config";

const sliderSizes = {
  width: 160,
  height: 320
}


export default class BetSlider {
  private renderer;
  private stage;
  private betSliderCon: PIXI.Container = new PIXI.Container;
  constructor(stage, renderer) {
    this.renderer = renderer;
    this.stage = stage;
  }
  addLayer() {
    this.betSliderCon.x = W - 420;
    this.betSliderCon.y = H - 430
    this.stage.addChild(this.betSliderCon);
  }
  private addReactange({ width, height }: { width: number, height: number }, radius: number, color: number) {
    let rectangle = new Graphics();
    rectangle.beginFill(color);
    rectangle.drawRoundedRect(0, 0, width, height, radius);
    rectangle.endFill();
    return rectangle;
  }
  addTireler() {
    for (let i = 0; i < 10; i++) {
      const tire = this.addReactange({ width: 45 - i * 2, height: 5 }, 5, 0xdddddd);
      tire.position.set(58 + i, 30 * i + 20);
      this.betSliderCon.addChild(tire);
    }
  }
  addBg() {
    const sliderBG = PIXI.Sprite.from("betSlider");
    Object.assign(sliderBG, sliderSizes);
    this.betSliderCon.addChild(sliderBG);
  }
  addSliderButton() {
    const sliderScrollButton = PIXI.Sprite.from("sliderScrollButton");
    sliderScrollButton.position.set(48, 265)
    this.betSliderCon.addChild(sliderScrollButton);
  }
  add() {
    this.addBg();
    this.addTireler();
    this.addSliderButton();
  }

}