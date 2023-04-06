import { Gene } from "./Gene";
import { IChromosome, IGene } from "../interface";

const ALPH = "ABCDEFGH";

let counter = 0;

export class Chromosome implements IChromosome {
    key: string;
    code: string;
    genes: IGene[];
    protected length: number;
    constructor(key: string, genes: IGene[], code?: string) {
        this.key = key;
        this.genes = genes;
        this.length = Math.max(
            ...genes.map((g) => g.locus.start + g.locus.length)
        );
        this.code = code ?? Chromosome.getRandomCode(this.length);
    }
    static getRandomCode(length): string {
        let code = '';
        for (let i = 0; i < length; i++) {
            code += ALPH[Math.floor(ALPH.length * Math.random())];
        }
        return code;
    }
    static getRandom(genesCount: number = 20): Chromosome {
        let genes = Array.from({length: genesCount}, () => Gene.getRandom());
        return new Chromosome(`${++counter}`, genes); 
    }
}
