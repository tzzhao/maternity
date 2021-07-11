import { FeedData } from "./feed.interface";

export const BABY_BOTTLE_TYPE = 'babyBottle';

export interface BabyBottleData extends FeedData {
    quantity: number
}