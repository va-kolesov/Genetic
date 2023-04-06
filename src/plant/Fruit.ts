import { IFruit } from "../interface";

class Fruit implements IFruit {
    size: number;
    color: string;
    shape: string;
    texture: string;
    matureAge: number;
    age: number;
    position: { x: number; y: number };

    constructor(size: number, color: string, shape: string, texture: string, matureAge: number, position: { x: number; y: number }) {
        this.size = size;
        this.color = color;
        this.shape = shape;
        this.texture = texture;
        this.matureAge = matureAge;
        this.age = 0;
        this.position = position;
    }

    isRipe(): boolean {
        return this.age >= this.matureAge;
    }

    fall(): void {
        // реализация падения плода на землю
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}