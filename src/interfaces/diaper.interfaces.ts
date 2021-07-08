export const PEE = 'p';
export const STOOL = 's';

export type DiaperType = typeof PEE | typeof STOOL;

export interface DiaperData {
    time: number,
    type: DiaperType
}