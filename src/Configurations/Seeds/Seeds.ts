import { collectionName } from "../../Commons/Constants";
import { Db } from "mongodb";
import { PermissionData } from "./../../Datas/Permission.Data";
import { PermissionService } from "./../../Services/PermissionService";

export class Seeds {
    private readonly database: Db;
    constructor(
        database: Db
    ) {
        this.database = database;
        this.seedPermissionData();
    }
    private async seedPermissionData() {
        const permissionService = new PermissionService(this.database, collectionName.Permission);
        await permissionService.seed(PermissionData);
    }
}
