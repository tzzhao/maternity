import { openDB, deleteDB, IDBPDatabase, IDBPTransaction, StoreNames } from 'idb';
import { BreastFeedData, DiaperData } from '../interfaces';
import { BabyBottleData } from '../interfaces/babyBottle.interface';

let db: IDBPDatabase;

export const ObjectStore = {
    BREAST_FEED: 'breastFeed',
    DIAPERS: 'diapers',
    BABY_BOTTLE: 'babyBottle'
}

export async function initDb() {
    db = await openDB('maternity', 1, {
        upgrade: (database: IDBPDatabase, oldVersion: number, newVersion: number | null, transaction: IDBPTransaction<any, StoreNames<any>[], 'versionchange'>) => {
            database.createObjectStore(ObjectStore.BREAST_FEED, {keyPath: 'start'});
            database.createObjectStore(ObjectStore.DIAPERS, {keyPath: 'time'});
            database.createObjectStore(ObjectStore.BABY_BOTTLE, {keyPath: 'start'});
        }
    });
    return db;
}

export async function putBreastFeedData(data: BreastFeedData) {
    db.put(ObjectStore.BREAST_FEED, data);
}

export async function putDiapersData(data: DiaperData) {
    db.put(ObjectStore.DIAPERS, data);
}

export async function putBabyBottleData(data: BabyBottleData) {
    db.put(ObjectStore.BABY_BOTTLE, data);
}

export async function deleteBreastFeedData(key: number) {
    db.delete(ObjectStore.BREAST_FEED, key);
}

export async function deleteDiapersData(key: number) {
    db.delete(ObjectStore.DIAPERS, key);
}

export async function deleteBabyBottleData(key: number) {
    db.delete(ObjectStore.BABY_BOTTLE, key);
}

export async function getAllBreastFeedData(): Promise<BreastFeedData[]> {
    return db.getAll(ObjectStore.BREAST_FEED);
}

export async function getAllBabyBottleData(): Promise<BabyBottleData[]> {
    return db.getAll(ObjectStore.BABY_BOTTLE);
}

export async function getAllDiapersData(): Promise<DiaperData[]> {
    return db.getAll(ObjectStore.DIAPERS)
}

export async function resetData() {
    Object.values(ObjectStore).forEach((storeKey: string) => {
        resetObjectStore(storeKey);
    });
}

export async function resetObjectStore(storeKey: string) {
    db.deleteObjectStore(storeKey);
    db.createObjectStore(storeKey);
}