import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import { ButtonIntFace, Coord } from "./interface";
import { H, W } from "./config";

class Button {
  private renderer: PIXI.Renderer;
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

  add(color: number, title: string) {
    const buttonSize = { width: 180, height: 85 }
    const Button = new PIXI.Container() as ButtonIntFace;
    const buttonBG = PIXI.Sprite.from(this.addReactange(buttonSize, color));
    const buttonText = new PIXI.Text(title, { fontFamily: "Arial", fontSize: 32, fill: 0xFFFFFF });

    buttonBG.position.set(0, 0);
    buttonBG.width = buttonSize.width;
    buttonBG.height = buttonSize.height;

    buttonText.anchor.set(.5);
    buttonText.position.set(buttonSize.width / 2, buttonSize.height / 2);

    Button.width = buttonSize.width;
    Button.height = buttonSize.height;
    Button.addChild(buttonBG, buttonText);
    return Button
  }
}


export default class ButtonLayer {
  private stage;
  private renderer;
  private Button;
  private ButtonCon: PIXI.Container = new PIXI.Container();
  private buttonCoords: Coord[] = [
    { x: 60, y: H - 100 },
    { x: 250, y: H - 100 },
    { x: W - 250 - 180, y: H - 100 },
    { x: W - 60 - 180, y: H - 100 },
  ];
  private buttonInfo: { title: string, fn: () => void }[][] = [
    [
      {
        title: "MIN: 50",
        fn: () => alert("min button")
      },
      {
        title: "MAX: 200",
        fn: () => alert("max button")
      },
      {
        title: "BET",
        fn: () => alert("bet button")
      },
      {
        title: "REPEAT",
        fn: () => alert("repeat button")
      }
    ],
    [
      {
        title: "SPLIT: 50",
        fn: () => alert("split button")
      },
      {
        title: "STAND",
        fn: () => alert("stand button")
      },
      {
        title: "HIT",
        fn: () => alert("hit button")
      },
      {
        title: "DOUBLE",
        fn: () => alert("double button")
      }
    ]
  ]
  constructor(stage, renderer) {
    this.stage = stage;
    this.renderer = renderer;
    this.Button = new Button(this.renderer);
    this.stage.addChild(this.ButtonCon);
  }

  addInteractivityForButton(button: ButtonIntFace, fn: () => void) {
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
  addButtons(type = 0) {
    this.buttonCoords.forEach((e, i) => {
      const buttonInfo = this.buttonInfo[type][i];
      const button = this.Button.add(0xF35565, buttonInfo.title) as ButtonIntFace;
      this.addInteractivityForButton(button, buttonInfo.fn);
      button.position.set(e.x, e.y);
      this.ButtonCon.addChild(button);
    })
  }
}