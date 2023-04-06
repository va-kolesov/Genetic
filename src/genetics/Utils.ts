import { GeneFunction } from "../interface";

/**
 * Преобразование строки к числу из отрезка [-1,1]
 * @param str - генетический код
 * @returns
 */
function geneToNumber(str: string): number {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }

    const maxInt = 2147483647; // Max value of 32-bit integers
    const normalizedHash = hash / maxInt;

    return normalizedHash;
}

export function getGenValue(str: string, func: GeneFunction) {
    const val = geneToNumber(str);
    return val;
}

export function randomEnum<T extends {}>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
        .map((n) => Number.parseInt(n))
        .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
}
