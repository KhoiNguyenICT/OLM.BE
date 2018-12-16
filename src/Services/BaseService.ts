import { QueryParams } from "./../Commons/Interfaces";
import { IWrite } from "../Interfaces/BaseService/IWrite";
import { IRead } from "../Interfaces/BaseService/IRead";
import { Db, Collection, InsertOneWriteOpResult, InsertWriteOpResult } from "mongodb";
import { Types } from "mongoose";

export abstract class BaseService<T> implements IWrite<T>, IRead<T> {
    public readonly collection: Collection;

    constructor(db: Db, collectionName: string) {
        this.collection = db.collection(collectionName);
    }
    public async seed(data: string): Promise<void> {
        const count = await this.count();
        if (count === 0) {
            const entities = JSON.parse(data);
            await this.createMany(entities);
        }
    }
    public async create(item: T): Promise<boolean> {
        const result: InsertOneWriteOpResult = await this.collection.insert((item) as any);
        return !!result.result.ok;
    }
    public async createMany(items: T[]): Promise<boolean> {
        const result: InsertWriteOpResult = await this.collection.insertMany((items) as any);
        return !!result.result.ok;
    }
    public async update(id: string, item: T): Promise<T> {
        const result = await this.collection.findOneAndUpdate(this.toObjectId(id), item);
        return result.value;
    }
    public async delete(id: string): Promise<boolean> {
        const result = await this.collection.findOneAndDelete(this.toObjectId(id));
        return result.value;
    }
    public async find(filter: any, queryParams?: QueryParams): Promise<T[]> {
        const result = await this.collection.find(filter).skip(Number(queryParams.skip)).limit(Number(queryParams.take)).toArray();
        return result;
    }
    public async findOne(id: string): Promise<T> {
        const result = await this.collection.findOne(this.toObjectId(id));
        return result;
    }
    public async count(): Promise<number> {
        const result = await this.collection.countDocuments({});
        return result;
    }
    private toObjectId(id: string): Types.ObjectId {
        return Types.ObjectId(id);
    }
}
