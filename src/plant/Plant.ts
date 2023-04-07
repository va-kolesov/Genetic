import { Branch } from "./Branch";
import { Genome } from "../genetics/Genome";
import {
    IPlant,
    IGenome,
    IBranchProps,
    ILeafProps,
} from "../interface";
import { parseGenome } from "./Utils";

export interface IPlantProperties {
    plant: IBranchProps;
    branch: IBranchProps;
    leaf: ILeafProps;
}

export class Plant extends Branch implements IPlant {
    age: number = 0;
    species: string;
    genome: IGenome;
    properties: IPlantProperties;
    isStem: boolean = true;
    constructor(species: string, genome: IGenome, position: {x:number, y: number}) {
        const properties = parseGenome(genome);
        super(null, properties.plant, properties);
        this.species = species;
        this.genome = genome;
        this.properties = properties;
        this.position = position;
    }

    formFruit(): void {
        //TODO: реализовать формирование плода
    }

    flower(): void {
        //TODO: реализовать цветение
    }

    crossbreed(otherPlant: IPlant): IPlant {
        //TODO: реализовать скрещивание двух растений
        return new Plant("", new Genome([]), this.position);
    }
}
