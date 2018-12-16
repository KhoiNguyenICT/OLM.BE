import { QueryParams } from './../Commons/Interfaces';
import { IWrite } from "../Interfaces/BaseService/IWrite"
import { IRead } from "../Interfaces/BaseService/IRead"
import { MongoClient, Db, Collection, InsertOneWriteOpResult, InsertWriteOpResult } from 'mongodb'
import { Types } from 'mongoose'
import * as fs from 'fs'

export abstract class BaseService<T> implements IWrite<T>, IRead<T> {
        public readonly collection: Collection

    constructor(db: Db, collectionName: string) {
        this.collection = db.collection(collectionName)
    }
    async seed(path: string): Promise<void> {
        const count = await this.count()
        if (count === 0) {
            fs.readFile(path, 'utf8', async (err, data: any) => {
                const entities = JSON.parse(data)
                await this.createMany(entities)
            })
        }
    }
    async create(item: T): Promise<boolean> {
        const result: InsertOneWriteOpResult = await this.collection.insert((item) as any)
        return !!result.result.ok
    }
    async createMany(items: T[]): Promise<boolean> {
        const result: InsertWriteOpResult = await this.collection.insertMany((items) as any)
        return !!result.result.ok
    }
    async update(id: string, item: T): Promise<T> {
        const result = await this.collection.findOneAndUpdate(this.toObjectId(id), item)
        return result.value
    }
    async  delete(id: string): Promise<boolean> {
        const result = await this.collection.findOneAndDelete(this.toObjectId(id))
        return result.value
    }
    async find(filter: any, queryParams?: QueryParams): Promise<T[]> {
        const result = await this.collection.find(filter).skip(Number(queryParams.skip)).limit(Number(queryParams.take)).toArray()
        return result
    }
    async findOne(id: string): Promise<T> {
        const result = await this.collection.findOne(this.toObjectId(id))
        return result
    }
    async count(): Promise<number> {
        const result = await this.collection.count({})
        return result
    }
    private toObjectId(id: string): Types.ObjectId {
        return Types.ObjectId(id)
    }
}