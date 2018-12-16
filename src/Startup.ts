import * as bodyParser from "body-parser";
import express from "express";
import { Application } from "express";
import { Db } from "mongodb";
import { MongoClient } from "mongodb";
import morgan from "morgan";
import { Seeds } from "./Configurations/Seeds/Seeds";
import { MainRoutes } from "./Main.Routes";
import { EnvironmentVariable } from "./Configurations/EnvironmentVariable";

class Startup {
    public express: Application;
    constructor() {
        this.express = express();
        this.buildMiddleware();
        this.buildRoutes();
    }
    private async buildRoutes() {
        const connection = await MongoClient.connect(EnvironmentVariable.MONGO_CONNECTION, { useNewUrlParser: true });
        const database = connection.db(EnvironmentVariable.DATABASE_NAME);
        this.seeds(database);
        const mainRoutes: MainRoutes = new MainRoutes(database);
        this.express.use("/api", mainRoutes.router);
    }
    private buildMiddleware(): void {
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(morgan("dev"));
    }
    private async seeds(database: Db) {
        await new Seeds(database);
    }
}

export default new Startup().express;
