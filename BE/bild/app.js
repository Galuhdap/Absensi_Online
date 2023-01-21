"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./config/database"));
const userController_1 = __importDefault(require("./controller/userController"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("dotenv/config"));
const presentController_1 = __importDefault(require("./controller/presentController"));
const authController_1 = __importDefault(require("./controller/authController"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const port = 3200;
    config_1.default;
    app.use(express_1.default.json());
    app.use(body_parser_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use(new userController_1.default().router);
    app.use(new presentController_1.default().router);
    app.use(new authController_1.default().router);
    yield database_1.default.init();
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}))();
