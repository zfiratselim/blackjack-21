import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from "@pixi/graphics-smooth";
import { ButtonIntFace } from "./interface";

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
        const Button = new PIXI.Container() as ButtonIntFace;
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


export default class ButtonLayer {
    private renderer;
    private Button;
    constructor(renderer) {
        this.renderer = renderer;
        this.Button = new Button(this.renderer);
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
}