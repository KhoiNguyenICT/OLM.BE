import { PermissionService } from './../../Services/PermissionService';
import { Db } from 'mongodb';
import * as fs from 'fs'
import { collectionName } from '../../Commons/Constants';

export class Seeds {
    private readonly database: Db
    constructor(
        database: Db
    ) {
        this.database = database
        this.seedPermissionData()
    }
    private async seedPermissionData() {
        const permissionService = new PermissionService(this.database, collectionName.Permission)
        await permissionService.seed('./Datas/data.permission.json')
    }
}