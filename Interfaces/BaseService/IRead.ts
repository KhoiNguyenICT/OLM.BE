export interface IRead<T> {
    find(filter: any): Promise<T[]>;
    findOne(id: string): Promise<T>;
    count(): Promise<number>;
}