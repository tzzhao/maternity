import { FeedData } from "./feed.interface";

export const RIGHT = 'r';
export const LEFT = 'l';

export type BreastFeedType = typeof RIGHT | typeof LEFT;

export interface BreastFeedData extends FeedData {
    type: BreastFeedType
}