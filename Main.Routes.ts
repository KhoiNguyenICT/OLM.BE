import * as express from "express"
import { RoleService } from "./Services/RoleService"
import { RoleController } from "./Controllers/Role.Controller"
import { MongoClient } from 'mongodb'
import { environmentVariable } from "./Commons/Constants"
import { Db } from 'mongodb'

let router = express()

export class MainRoutes {
    private readonly database: Db
    public router = express()
    constructor(
        database: Db
    ) {
        this.database = database
        this.buildMainRoutes()
    }

    private async buildMainRoutes() {
        this.router.post('/role', new RoleController(this.database).create)
        this.router.get('/role/list', new RoleController(this.database).list)
    }
}
