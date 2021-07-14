import { CommonData } from "./common.interface";

export const PEE = 'p';
export const STOOL = 's';

export type DiaperType = typeof PEE | typeof STOOL;

export interface DiaperData extends CommonData {
    type: DiaperType
}