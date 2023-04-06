import { Genome } from "../genetics/Genome";
import { getGenValue } from "../genetics/Utils";
import { GeneFunction } from "../interface";
import { IPlantProperties } from "./Plant";
import { RandomGenerator } from "./RandomGenerator";

const AVG_BRANCH_LENGHT = 5;

export function parseGenome(genome: Genome): IPlantProperties {
    const props: IPlantProperties = {
        plant: {},
        branch: {},
        leaf: {},
    };
    genome.chromosomes.forEach((chr) => {
        chr.genes.forEach((gen) => {
            const str = chr.code.slice(
                gen.locus.start,
                gen.locus.start + gen.locus.length
            );
            const val = getGenValue(str, gen.func);
            setPropValue(props, INFLUENCES[gen.influence], gen.func, val);
        });
    });
    return props;
}
const INFLUENCES = ["plant", "branch", "leaf", "flower", "fruit"];

function setPropValue(
    props: IPlantProperties,
    infl: string,
    func: GeneFunction,
    val: number
) {
    if (!props.hasOwnProperty(infl)) {
        props[infl] = {};
    }
    switch (func) {
        case GeneFunction.RED:
            if (!props[infl].red) {
                props[infl].red = [];
            }
            props[infl].red.push(val);
            break;
        case GeneFunction.GREEN:
            if (!props[infl].green) {
                props[infl].green = [];
            }
            props[infl].green.push(val);
            break;
        case GeneFunction.BLUE:
            if (!props[infl].blue) {
                props[infl].blue = [];
            }
            props[infl].blue.push(val);
            break;
        case GeneFunction.F1:
            props[infl].f1 = val;
            break;
        case GeneFunction.F2:
            props[infl].f2 = val;
            break;
        case GeneFunction.F3:
            props[infl].f3 = val;
            break;
        case GeneFunction.F4:
            props[infl].f4 = val;
            break;
        case GeneFunction.F5:
            props[infl].f5 = val;
            break;
        case GeneFunction.F6:
            props[infl].f6 = val;
            break;
        case GeneFunction.F7:
            props[infl].f7 = val;
            break;
        case GeneFunction.F8:
            props[infl].f8 = val;
            break;
        case GeneFunction.F9:
            props[infl].f9 = val;
            break;
    }
}

const DEFAULT_ANGLE = Math.PI / 6;
const DEFAULT_LENGTH = 10;
const DEFAULT_THICKNESS = 3;

export function getColor(val?: number) {
    return val !== undefined ? Math.floor(Math.abs(val * 255)) : 127;
}
export function getLength(val?: number) {
    return val !== undefined ? AVG_BRANCH_LENGHT + (val+1)*(val+1)*3 : DEFAULT_LENGTH;
}
export function getAngle(val?: number) {
    return val !== undefined ? (val * Math.PI) / 6 : DEFAULT_ANGLE;
}
export function getThickness(val?: number) {
    return val !== undefined ? 3 + val * 2 : DEFAULT_THICKNESS;
}
export function getSign(val?: number) {
    return val !== undefined ? Math.sign(val) : 0;
}

let r = new RandomGenerator(107);
export function getRandom(): number {
    return r.next();
}
export function resetRandom() {
    r = new RandomGenerator(107)
}