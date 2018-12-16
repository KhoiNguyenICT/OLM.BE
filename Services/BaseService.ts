import { IWrite } from "../Interfaces/BaseService/IWrite";
import { IRead } from "../Interfaces/BaseService/IRead";
import { MongoClient, Db, Collection, InsertOneWriteOpResult } from 'mongodb';
import { Types } from 'mongoose';

export abstract class BaseService<T> implements IWrite<T>, IRead<T> {
    public readonly collection: Collection;

    constructor(db: Db, collectionName: string) {
        this.collection = db.collection(collectionName);
    }
    async create(item: T): Promise<boolean> {
        const result: InsertOneWriteOpResult = await this.collection.insert((item) as any);
        return !!result.result.ok;
    }
    async update(id: string, item: T): Promise<T> {
        const result = await this.collection.findOneAndUpdate(this.toObjectId(id), item);
        return result.value;
    }
    async  delete(id: string): Promise<boolean> {
        const result = await this.collection.findOneAndDelete(this.toObjectId(id));
        return result.value;
    }
    async find(filter: any): Promise<T[]> {
        const result = await this.collection.find(filter).toArray();
        return result;
    }
    async findOne(id: string): Promise<T> {
        const result = await this.collection.findOne(this.toObjectId(id));
        return result;
    }
    async count(): Promise<number> {
        const result = await this.collection.count({});
        return result;
    }
    private toObjectId(id: string): Types.ObjectId {
        return Types.ObjectId(id);
    }
}