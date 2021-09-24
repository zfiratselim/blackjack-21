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
    const buttonSizes = { width: 80, height: 35 }
    const buttonLocs: Coord[] = [{ x: -85, y: 0 }, { x: -80, y: 50 }, { x: -75, y: 100 }, { x: -70, y: 200 }];
    buttonLocs.forEach(e => {
      const button = PIXI.Sprite.from("sliderButton");
      button.tint = 0x85465f;
      Object.assign(button, buttonSizes, e);
      this.betSliderCon.addChild(button)
    })
  }
  private addBg() {
    const sliderBG = PIXI.Sprite.from("betSlider");
    sliderBG.alpha = .7;
    Object.assign(sliderBG, sliderSizes);
    this.betSliderCon.addChild(sliderBG);
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
      const x = target.position.y + e.data.originalEvent.movementY * (1 / this.scale);
      target.position.y = x > 280 ? returnValue(280) : x < 25 ? returnValue(25) : x;
    });
  }
  private addSliderButton() {
    const sliderScrollButton = PIXI.Sprite.from("sliderScrollButton");
    sliderScrollButton.anchor.set(.5);
    sliderScrollButton.position.set(sliderSizes.width / 2, 280);
    this.createDragAndDropForSliderButton(sliderScrollButton);
    this.betSliderCon.addChild(sliderScrollButton);
  }
  add() {
    this.addBg();
    this.addTireler();
    this.addSliderButton();
    this.addButtons();
  }
  addLayer() {
    this.betSliderCon.x = W - 420;
    this.betSliderCon.y = H - 430
    this.stage.addChild(this.betSliderCon);
  }
}