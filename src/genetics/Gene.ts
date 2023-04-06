import { GeneFunction, GeneInfluence, IGene, ILocus } from "../interface";
import { randomEnum } from "./Utils";

let counter = 0;
const RANDOM_START_LIMIT = 200;
const RANDOM_LENGTH_LIMIT = 20;

export class Gene implements IGene {
    key: string;
    locus: ILocus;
    influence: GeneInfluence;
    func: GeneFunction;
    constructor(
        key: string,
        locus: ILocus,
        influence: GeneInfluence,
        func: GeneFunction
    ) {
        this.key = key;
        this.locus = locus;
        this.influence = influence;
        this.func = func;
    }
    static getRandom(): Gene {
        const func = randomEnum(GeneFunction);
        const infl = randomEnum(GeneInfluence);
        const locus = {
            start: Math.floor(Math.random() * RANDOM_START_LIMIT),
            length: Math.floor(Math.random() * RANDOM_LENGTH_LIMIT),
        };
        return new Gene(`${++counter}`, locus, infl, func);
    }
}
