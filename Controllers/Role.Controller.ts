import { Request, Response } from "express"
import { RoleService } from "../Services/RoleService"
import { CREATED, INTERNAL_SERVER_ERROR, OK } from "http-status-codes"
import { Db } from 'mongodb'
import { collectionName } from "../Commons/Constants"
import { RoleEntity } from "../Entities/RoleEntity"
import { QueryParams } from '../Commons/Interfaces'

export class RoleController {
    private readonly database: Db
    private roleService: RoleService
    constructor(
        database: Db
    ) {
        this.database = database
        this.buildRoleService()
    }

    create = async (req: Request, res: Response) => {
        const { name, description } = req.body
        const roleEntity = new RoleEntity(name, description)
        try {
            this.roleService.create(roleEntity)
            return res.status(CREATED).send(roleEntity)
        } catch (e) {
            return res.status(INTERNAL_SERVER_ERROR).send(e)
        }
    }

    list = async (req: Request, res: Response) => {
        const queryParams: QueryParams = req.query
        try {
            const result = await this.roleService.find({}, queryParams)
            const queryResult = {
                count: result.length,
                items: result
            }
            return res.status(OK).send(queryResult)
        } catch (e) {
            return res.status(INTERNAL_SERVER_ERROR).send(e)
        }
    }

    private async buildRoleService() {
        this.roleService = await new RoleService(this.database, collectionName.Role)
    }
}
