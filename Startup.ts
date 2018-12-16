import * as express from 'express'
import { Application } from 'express'
import * as mongoose from 'mongoose';
import * as dotenv from "dotenv";
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import { MainRoutes } from "./Main.Routes";

class Startup {
    public express: Application;
    constructor() {
        this.express = express();
        this.environmentVariableConfig();
        this.buildMiddleware();
        this.buildRoutes();
    }
    private buildRoutes(): void {
        const mainRoutes: MainRoutes = new MainRoutes();
        this.express.use('/api', mainRoutes.router);
    }

    private environmentVariableConfig(): void {
        dotenv.config();
    }
    private buildMiddleware(): void {
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(morgan('dev'));
    }
}

export default new Startup().express