export interface IWrite<T> {
    create(item: T): Promise<boolean>;
    createMany(items: T[]): Promise<boolean>;
    update(id: string, item: T): Promise<T>;
    delete(id: string): Promise<boolean>;
}
