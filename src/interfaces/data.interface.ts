import { BABY_BOTTLE_TYPE } from "./babyBottle.interface";
import { LEFT, RIGHT } from "./breastFeed.interfaces";
import { PEE, STOOL } from "./diaper.interfaces";

export interface DataModel {
    start: number,
    duration?: number,
    quantity?: number,
    type:  typeof PEE | typeof STOOL | typeof RIGHT | typeof LEFT | typeof BABY_BOTTLE_TYPE;
}