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
    db = await openDB('maternity', 2, {
        upgrade: async (database: IDBPDatabase, oldVersion: number, newVersion: number | null, transaction: IDBPTransaction<any, StoreNames<any>[], 'versionchange'>) => {
            if (oldVersion === 1 && newVersion === 2) {
                const diaperStore = transaction.objectStore(ObjectStore.DIAPERS);
                const diapersData = await diaperStore.getAll();
                const newData = diapersData.map((data) => {
                    data.start = data.time;
                    delete data.time;
                    return data;
                });
                await database.deleteObjectStore(ObjectStore.DIAPERS);
                const objectStore = await database.createObjectStore(ObjectStore.DIAPERS, {keyPath: 'start'});
                await putManyDiaperData(newData, objectStore);
                
            } else {
                database.createObjectStore(ObjectStore.BREAST_FEED, {keyPath: 'start'});
                database.createObjectStore(ObjectStore.DIAPERS, {keyPath: 'start'});
                database.createObjectStore(ObjectStore.BABY_BOTTLE, {keyPath: 'start'});
            }
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

export async function putManyBabyBottleData(data: {[key:number] :BabyBottleData}) {
    const transaction = db.transaction(ObjectStore.BABY_BOTTLE, 'readwrite');

    return await Promise.all([...Object.values(data).map((d) => {
        return transaction.store.put(d);
    }), transaction.done] as Promise<any>[]);
}

export async function putManyDiaperData(data:  {[key:number] :DiaperData}, objectStore?: any) {

    if (objectStore) {
        return await Promise.all([...Object.values(data).map((d) => {
            return objectStore.put(d);
        })] as Promise<any>[]);
    } else {
        const transaction = db.transaction(ObjectStore.DIAPERS, 'readwrite');

        return await Promise.all([...Object.values(data).map((d) => {
            return transaction.store.put(d);
        }), transaction.done] as Promise<any>[]);
    }

}

export async function putManyBreastFeedData(data:  {[key:number] :BreastFeedData}) {
    const transaction = db.transaction(ObjectStore.BREAST_FEED, 'readwrite');

    return await Promise.all([...Object.values(data).map((d) => {
        return transaction.store.put(d);
    }), transaction.done] as Promise<any>[]);
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