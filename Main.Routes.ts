import * as express from "express"
import { RoleService } from "./Services/RoleService";
import { RoleController } from "./Controllers/Role.Controller";
import { MongoClient } from 'mongodb';
import { environmentVariable } from "./Commons/Constants"

let router = express();

export class MainRoutes {
    public router = express();
    constructor() {
        this.buildMainRoutes();
    }

    private async buildMainRoutes() {
        const connection = await MongoClient.connect(process.env[environmentVariable.MONGO_CONNECTION], { useNewUrlParser: true });
        const database = connection.db(process.env[environmentVariable.DATABASE_NAME]);
        this.router.post('/role', new RoleController(database).create);
    }
}

