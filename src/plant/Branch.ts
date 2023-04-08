import { IBranch, IBranchProps, IFlower, IFruit, ILeaf } from "../interface";
import { Leaf } from "./Leaf";
import { IPlantProperties } from "./Plant";
import {
    getLength,
    getAngle,
    getThickness,
    getColor,
    getSign,
    getRandom,
} from "./Utils";

const GROWTH_COEFFICIENT = 0.1;
const VERTICAL = -Math.PI / 2;

//TODO случайные отклонения величин зашить в гены

export class Branch implements IBranch {
    parent: IBranch | null;
    plantProps: IPlantProperties;
    branches: IBranch[] = [];
    flowers: IFlower[] = [];
    fruits: IFruit[] = [];
    leaves: ILeaf[] = [];
    color1: number[];
    color2: number[];
    angle: number;
    length: number;
    thickness: number;
    lSize: number;
    tsize: number;
    tGrowCoeff: number;
    lGrowCoeff: number;
    maxAge: number;
    childChance: number;
    age: number = 0;
    level: number = 0;
    isStem: boolean;
    end = { x: 0, y: 0 };
    position = { x: 0, y: 0 };
    constructor(
        parent: IBranch | null,
        props: IBranchProps,
        plantProps: IPlantProperties
    ) {
        this.parent = parent;
        this.level = parent ? (parent.level ?? 0) + 1 : 0;
        this.isStem = !!props.isStem;
        this.plantProps = plantProps;
        this.length =
            getLength(props.f1) +
            (this.isStem ? (getSign(props.f4) * getLength(props.f5)) / 2 : 0);
        this.angle =
            (props.baseAngle ?? VERTICAL) +
            getAngle(props.f2) * (1 - 2 * getRandom());
        this.thickness =
            getThickness(props.f3) +
            (this.isStem ? getThickness(plantProps.branch.f3) : 0);

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
        this.lSize = 0.1;
        this.tsize = 0.1;
        this.lGrowCoeff = props.f5 ? (props.f5 + 1.1) / 10 : GROWTH_COEFFICIENT;
        this.tGrowCoeff = props.f6 ? (props.f6 + 1.1) / 10 : GROWTH_COEFFICIENT;
        this.childChance = props.f7 ? Math.abs(props.f7) : 0.5;
        this.maxAge = this.isStem
            ? Infinity
            : props.f8
            ? (props.f8 + 10) / this.lGrowCoeff / this.lGrowCoeff
            : Infinity;
    }
    grow(): boolean {
        const oldSize = this.lSize;
        if (oldSize < 1) {
            this.lSize += this.lGrowCoeff;
            this.tsize += this.tGrowCoeff;
        } else if (oldSize < 2) {
            this.lSize += this.lGrowCoeff * this.lGrowCoeff;
            this.tsize += this.tGrowCoeff * this.tGrowCoeff;
        } else {
            this.tsize += this.tGrowCoeff * this.tGrowCoeff;
        }
        this.branches.forEach((br) => {
            const alive = br.grow();
            if (!alive) {
                br.dead = true;
            }
        });
        this.leaves.forEach((lv) => {
            lv.grow();
        });
        this.branches = this.branches.filter((br) => !br.dead);
        if (this.lSize >= 0.5 && oldSize < 0.5) {
            if (this.childChance < getRandom()) {
                const child = new Branch(
                    this,
                    {
                        ...this.plantProps.branch,
                        baseAngle: this.angle,
                        f2: this.plantProps.branch.f2,
                    },
                    this.plantProps
                );
                this.branches.push(child);
            } else if (!this.isStem) {
                const leaf = new Leaf(this, {
                    ...this.plantProps.leaf,
                    baseAngle: this.angle,
                });
                this.leaves.push(leaf);
            }
        }
        if (this.lSize >= 1 && oldSize < 1) {
            if (this.isStem) {
                const child = new Branch(
                    this,
                    {
                        ...this.plantProps.plant,
                        baseAngle: this.angle,
                        isStem: this.isStem,
                    },
                    this.plantProps
                );
                this.branches.push(child);
            } else {
                if (this.childChance < getRandom()) {
                    const child = new Branch(
                        this,
                        {
                            ...this.plantProps.branch,
                            baseAngle: this.angle,
                            f2: this.plantProps.branch.f2,
                        },
                        this.plantProps
                    );
                    this.branches.push(child);
                } else {
                    const leaf = new Leaf(this, {
                        ...this.plantProps.leaf,
                        baseAngle: this.angle,
                    });
                    this.leaves.push(leaf);
                }
            }
        }
        this.age++;
        return this.age < this.maxAge;
    }
    draw(ctx: CanvasRenderingContext2D) {
        let { x: x1, y: y1 } = this.parent ? this.parent.end : { x: 0, y: 0 };
        x1 = x1 + this.position.x;
        y1 = y1 + this.position.y;
        const x2 = x1 + this.lSize * this.length * Math.cos(this.angle);
        const y2 = y1 + this.lSize * this.length * Math.sin(this.angle);
        this.end = { x: x2, y: y2 };
        this.drawSelf(ctx, x1, y1, x2, y2);
        this.drawChildren(ctx);
    }
    getColor(): string {
        const k = Math.min(this.lSize, 1);
        return `rgb(${Math.floor(
            this.color1[0] + k * (this.color2[0] - this.color1[0])
        )},${Math.floor(
            this.color1[1] + k * (this.color2[1] - this.color1[1])
        )},${Math.floor(
            this.color1[2] + k * (this.color2[2] - this.color1[2])
        )}`;
    }
    drawSelf(ctx, x1, y1, x2, y2) {
        const width = this.tsize * this.thickness;
        const gradient = ctx.createLinearGradient(
            ...getPerpendicularVector(x1, y1, x2, y2, width)
        );
        gradient.addColorStop(0, this.getColor());
        gradient.addColorStop(1, "white");
        ctx.lineWidth = width;
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.strokeStyle = "none";
        ctx.lineWidth = 0;
        ctx.fillStyle = gradient;
        ctx.arc(x2, y2, width / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
    drawChildren(ctx) {
        this.branches.forEach((br) => {
            br.draw(ctx);
        });
        this.leaves.forEach((br) => {
            br.draw(ctx);
        });
        this.flowers.forEach((br) => {
            br.draw(ctx);
        });
        this.fruits.forEach((br) => {
            br.draw(ctx);
        });
    }
}

function getPerpendicularVector(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    len: number
): [number, number, number, number] {
    // Находим разность координат между концами отрезка:
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Создаем новые координаты для перпендикулярного вектора:
    const perpDeltaX = -deltaY;
    const perpDeltaY = deltaX;
    const norm = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Начальные координаты перпендикулярного вектора устанавливаем в ноль:
    const perpX1 = 0;
    const perpY1 = 0;
    const perpX2 = (perpDeltaX / norm) * len;
    const perpY2 = (perpDeltaY / norm) * len;

    return [x1 - perpX2, y1 - perpY2, x1 + perpX2, y1 + perpY2];
}
