import { Request, Response, NextFunction } from "express"
import { RoleService } from "../Services/RoleService";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "http-status-codes"
import { MongoClient, Db } from 'mongodb';
import { collectionName } from "../Commons/Constants"
import { RoleEntity } from "../Entities/RoleEntity";

export class RoleController {
    private readonly database: Db;
    private roleService: RoleService;
    constructor(
        database: Db
    ) {
        this.database = database;
        this.buildRoleService();
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const { name, description } = req.body;
        const roleEntity = new RoleEntity(name, description);
        try {
            this.roleService.create(roleEntity);
            return res.status(OK).send(roleEntity);
        } catch (e) {
            return res.status(INTERNAL_SERVER_ERROR).send(e);
        }
    }

    private async buildRoleService() {
        this.roleService = await new RoleService(this.database, collectionName.Role);
    }
}
