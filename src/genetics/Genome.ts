import { Chromosome } from "./Chromosome";
import { IChromosome, IGenome } from "../interface";

const MUTATION_CHANCE = 0.01;

export class Genome implements IGenome {
    chromosomes: IChromosome[];
    constructor(chromosomes: IChromosome[]) {
        this.chromosomes = chromosomes;
    }
    mutate(chance: number = MUTATION_CHANCE) {
        this.chromosomes.forEach(ch => {
            ch.mutate(chance);
        })
    }
    crossover(gen: Genome): Genome {
        let chA = this.chromosomes;
        let chB = gen.chromosomes;
        const chromosomes: IChromosome[] = [];
        let i;
        for (i = 0; i < chA.length && i < chB.length; i++) {
            const newCh = chA[i].crossover(chB[i]);
            chromosomes.push(newCh);
        }
        return new Genome(chromosomes);
    }
    static getRandom(chromosomesCount: number = 2): Genome {
        let chromosomes = Array.from({ length: chromosomesCount }, () =>
            Chromosome.getRandom()
        );
        return new Genome(chromosomes);
    }
    static fromString(str: string): Genome {
        const obj = JSON.parse(str);
        if (obj.chromosomes instanceof Array) {
            return new Genome(
                obj.chromosomes.map(
                    (ch) => new Chromosome(ch.key, null, ch.code)
                )
            );
        } else {
            return Genome.getRandom();
        }
    }
}
