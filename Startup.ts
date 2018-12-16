import { Db } from 'mongodb';
import { Seeds } from './Configurations/Seeds/Seeds';
import * as express from 'express'
import { Application } from 'express'
import * as mongoose from 'mongoose'
import * as dotenv from "dotenv"
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import { MainRoutes } from "./Main.Routes"
import { MongoClient } from 'mongodb';
import { environmentVariable } from './Commons/Constants';

class Startup {
    public express: Application
    constructor() {
        this.express = express()
        this.environmentVariableConfig()
        this.buildMiddleware()
        this.buildRoutes()
    }
    private async buildRoutes() {
        const connection = await MongoClient.connect(process.env[environmentVariable.MONGO_CONNECTION], { useNewUrlParser: true })
        const database = connection.db(process.env[environmentVariable.DATABASE_NAME])
        this.seeds(database)
        const mainRoutes: MainRoutes = new MainRoutes(database)
        this.express.use('/api', mainRoutes.router)
    }

    private environmentVariableConfig(): void {
        dotenv.config()
    }
    private buildMiddleware(): void {
        this.express.use(bodyParser.urlencoded({ extended: true }))
        this.express.use(bodyParser.json())
        this.express.use(morgan('dev'))
    }
    private async seeds(database: Db) {
        await new Seeds(database)
    }
}

export default new Startup().express