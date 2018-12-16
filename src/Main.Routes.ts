import express from "express";
import { RoleController } from "./Controllers/Role.Controller";
import { Db } from "mongodb";

export class MainRoutes {
    public router = express();
    private readonly database: Db;
    constructor(
        database: Db
    ) {
        this.database = database;
        this.buildMainRoutes();
    }

    private async buildMainRoutes() {
        this.router.post("/role", new RoleController(this.database).create);
        this.router.get("/role/list", new RoleController(this.database).list);
    }
}
