interface ILocus {
    start: number;
    length: number;
}

// Место влияния гена - Ствол, ветки, листья, цветы, фрукты
enum GeneInfluence {
    PLANT,
    BRANCH,
    LEAF,
    FLOWER,
    FRUIT,
}
// ген может отвечать за компонент цвета, или за функции, зависящие от места влияния гена.
enum GeneFunction {
    RED,
    GREEN,
    BLUE,
    F0,
    F1,
    F2,
    F3,
    F4,
    F5,
    F6,
    F7,
    F8,
    F9,
    F10,
    F11,
    REDF,
    GREENF,
    BLUEF,
}

interface IGene {
    influence: GeneInfluence;
    func: GeneFunction;
    code: string;
}

interface IChromosome {
    key: string;
    code: string;
    getGenes(): IGene[];
    crossover(ch: IChromosome): IChromosome;
    mutate(chance: number);
}

interface IGenome {
    chromosomes: IChromosome[];
}

interface IDrawable {
    draw(ctx: CanvasRenderingContext2D);
    position: { x: number; y: number };
}

interface IPlant extends IBranch {
    age: number;
    species: string;
    genome: IGenome;

    flower(): void;
    formFruit(): void;
    crossbreed(otherPlant: IPlant): IPlant;
}

interface ILeaf extends IDrawable {
    parent: IBranch;
    size: number;
    shape?: string;
    texture?: string;
    grow(): void;
}

interface ILeafProps {
    red?: number[];
    green?: number[];
    blue?: number[];
    baseAngle?: number;
    length?: number;
    angle?: number;
    f1?: number;
    f2?: number;
    f3?: number;
    f4?: number;
    f5?: number;
    f6?: number;
    f7?: number;
    f8?: number;
    f9?: number;
}

interface IBranchProps {
    red?: number[];
    green?: number[];
    blue?: number[];
    baseAngle?: number;
    isStem?: boolean;
    level?: number;
    length?: number;
    angle?: number;
    thickness?: number;
    f0?: number;
    f1?: number;
    f2?: number;
    f3?: number;
    f4?: number;
    f5?: number;
    f6?: number;
    f7?: number;
    f8?: number;
    f9?: number;
    f10?: number;
    f11?: number;
}

interface IBranch extends IDrawable, IBranchProps {
    dead?: boolean;
    parent: IBranch | null;
    end: { x: number; y: number };
    branches: IBranch[];
    flowers: IFlower[];
    fruits: IFruit[];
    leaves: ILeaf[];
    grow(): boolean;
}

interface IFlower extends IDrawable {
    size: number;
    color: string;
    shape: string;
    texture: string;
    isPollinated: boolean;
    pollinate(): void;
}

interface IFruit extends IDrawable {
    size: number;
    color: string;
    shape: string;
    texture: string;
    matureAge: number;
    age: number;
    isRipe(): boolean;
    fall(): void;
}

export {
    ILocus,
    GeneInfluence,
    GeneFunction,
    ILeafProps,
    IGene,
    IChromosome,
    IGenome,
    IDrawable,
    IPlant,
    ILeaf,
    IBranch,
    IBranchProps,
    IFlower,
    IFruit,
};
