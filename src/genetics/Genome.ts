import { Chromosome } from "./Chromosome";
import { IChromosome, IGenome } from "../interface";

export class Genome implements IGenome {
    chromosomes: IChromosome[];
    constructor(chromosomes: IChromosome[]) {
        this.chromosomes = chromosomes;
    }

    static getRandom(chromosomesCount: number = 20): Genome {
        let chromosomes = Array.from({length: chromosomesCount}, () => Chromosome.getRandom());
        return new Genome(chromosomes);
    }
}