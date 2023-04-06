export class RandomGenerator {
    private seed: number;
    private readonly a: number = 1664525;
    private readonly c: number = 1013904223;
    private readonly m: number = Math.pow(2, 32);

    constructor(seed?: number) {
        this.seed = seed || Date.now();
    }

    next(): number {
        this.seed = (this.a * this.seed + this.c) % this.m;
        return this.seed / this.m;
    }
}
