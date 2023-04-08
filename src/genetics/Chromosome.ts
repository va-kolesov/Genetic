import { IChromosome, IGene } from "../interface";

const ALPH = "ABCDEFGHIJKL";
const SEPARATORS = "-";
const ALL = ALPH+SEPARATORS;
const GENE_LENGTH_AVG = 10;
const GENE_LENGTH_SGM = 0;

let counter = 0;

export class Chromosome implements IChromosome {
    key: string;
    code: string;
    protected length: number;
    constructor(key: string, genesCount, code?: string) {
        this.key = key;
        this.code = code ?? Chromosome.getRandomCode(genesCount);
    }
    mutate(chance: number) {
        let code = '';
        for (let i = 0; i < this.code.length; i++) {
            code += Math.random() < chance ? ALL[Math.floor(ALL.length * Math.random())]: this.code[i];
        }
        this.code = code;
    }
    crossover(ch: IChromosome): IChromosome {
        const minLen = Math.min(this.code.length, ch.code.length);
        const codes = [this.code, ch.code];
        let s0 = 0;
        let s1 = Math.floor((Math.random() * minLen) / 4);
        let code = "";
        while (s1 < minLen) {
            code += codes[Math.round(Math.random())].slice(s0, s1);
            s0 = s1;
            s1 += Math.floor((Math.random() * minLen) / 4);
        }
        if (codes[0].length > s1) {
            code += codes[0].slice(s0);
        } else if (codes[1].length > s0) {
            code += codes[1].slice(s0);
        }
        return new Chromosome(this.key, 0, code);
    }
    getGenes() {
        return this.code.split(SEPARATORS).map((code): IGene => {
            const influence = ALPH.indexOf(code[0]) % 5;
            const func = ALPH.indexOf(code[1]);
            return {
                influence,
                func,
                code: code.slice(2),
            };
        });
    }
    static getRandomeGene(start: string = '') {
        const len = Math.floor(
            GENE_LENGTH_AVG + Math.random() * GENE_LENGTH_SGM
        );
        let code = start;
        for (let i = 0; i < len; i++) {
            code += ALPH[Math.floor(ALPH.length * Math.random())];
        }
        return code + SEPARATORS;
    }
    static getRandomCode(genesCount): string {
        let code = "";
        for (let i = 0; i < genesCount; i++) {
            code += Chromosome.getRandomeGene(ALPH[i%5]+ALPH[i%12]);
        }
        return code;
    }
    static getRandom(genesCount: number = ALPH.length*5): Chromosome {
        return new Chromosome(`${++counter}`, genesCount);
    }
}
