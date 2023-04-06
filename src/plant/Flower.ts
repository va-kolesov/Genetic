import { IFlower } from "../interface";

export class Flower implements IFlower {
    size: number;
    color: string;
    shape: string;
    texture: string;
    isPollinated: boolean;
    position: { x: number; y: number };

    constructor(size: number, color: string, shape: string, texture: string, position: { x: number; y: number }) {
        this.size = size;
        this.color = color;
        this.shape = shape;
        this.texture = texture;
        this.isPollinated = false;
        this.position = position;
    }

    pollinate(): void {
        this.isPollinated = true;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}