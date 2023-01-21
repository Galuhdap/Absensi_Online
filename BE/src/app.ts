import express, { Application } from 'express'
import bodyParser from 'body-parser'
import Database from './config/database'
import UserController from './controller/userController'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv/config'
import PresentController from './controller/presentController'
import AuthController from './controller/authController'


(async () => {

    const app: Application = express();
    const port = 3200;

    dotenv;

    app.use(express.json());
    app.use(bodyParser.json());
    app.use(cookieParser());


    app.use(new UserController().router);
    app.use(new PresentController().router);
    app.use(new AuthController().router);

    await Database.init();
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})()
