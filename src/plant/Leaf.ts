import { IBranch, ILeaf, ILeafProps } from "../interface";
import { getAngle, getColor, getLength, getRandom, getSign } from "./Utils";
const GROWTH_COEFFICIENT = 0.1;
const VERTICAL = -Math.PI / 2;
export class Leaf implements ILeaf {
    parent: IBranch;
    position = { x: 0, y: 0 };
    size: number;
    angle: number;
    length: number;
    growCoeff: number;
    color1: number[];
    color2: number[];
    constructor(parent: IBranch, props: ILeafProps) {
        this.parent = parent;
        this.color1 = [
            getColor(props.red?.[0]),
            getColor(props.green?.[0]),
            getColor(props.blue?.[0]),
        ];
        this.color2 = [
            getColor(props.red?.[1]) || this.color1[0],
            getColor(props.green?.[1]) || this.color1[0],
            getColor(props.blue?.[1]) || this.color1[0],
        ];
        this.length = getLength(props.f1);
        this.angle =
            (props.baseAngle ?? VERTICAL) +
            getAngle(props.f2) * (1 - 2 * getRandom());
        this.size = 0.1;
        this.growCoeff = props.f5 ? (props.f5 + 1.1) / 10 : GROWTH_COEFFICIENT;
    }
    grow(): void {
        if (this.size < 1) {
            this.size += this.growCoeff;
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        let { x, y } = this.parent ? this.parent.end : { x: 0, y: 0 };
        ctx.beginPath();
        ctx.arc(x, y, this.size * this.length, 0, this.angle);
        ctx.fillStyle = this.getColor();
        ctx.fill();
    }
    getColor(): string {
        const k = Math.min(this.size, 1);
        return `rgb(${Math.floor(
            this.color1[0] + k * (this.color2[0] - this.color1[0])
        )},${Math.floor(
            this.color1[1] + k * (this.color2[1] - this.color1[1])
        )},${Math.floor(
            this.color1[2] + k * (this.color2[2] - this.color1[2])
        )}`;
    }
}
