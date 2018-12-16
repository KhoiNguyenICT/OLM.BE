export class RoleEntity {
    private name: string;
    private description: string;
    private createdAt: Date;
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.createdAt = new Date(Date.now());
    }
}