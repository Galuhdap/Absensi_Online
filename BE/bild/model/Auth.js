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
const database_1 = __importDefault(require("../config/database"));
class Auth {
    constructor() {
        this.login = (nip) => __awaiter(this, void 0, void 0, function* () {
            const Query = `SELECT * FROM users WHERE nip = '${nip}'`;
            const [rows] = yield database_1.default.DB.execute(Query);
            return rows;
        });
        this.updateToken = (refresh_token, nip) => __awaiter(this, void 0, void 0, function* () {
            const Query = `UPDATE users SET refresh_token = '${refresh_token}' WHERE nip = '${nip}'`;
            const [rows] = yield database_1.default.DB.execute(Query);
            return rows;
        });
        this.logout = (refresh_token) => __awaiter(this, void 0, void 0, function* () {
            const Query = `SELECT * FROM users WHERE refresh_token = '${refresh_token}'`;
            const [rows] = yield database_1.default.DB.execute(Query);
            return rows;
        });
        this.clearToken = (nip) => __awaiter(this, void 0, void 0, function* () {
            const Query = `UPDATE users SET refresh_token = NULL WHERE nip = '${nip}'`;
            const [rows] = yield database_1.default.DB.execute(Query);
            return rows;
        });
        this.refreshToken = (refresh_token) => __awaiter(this, void 0, void 0, function* () {
            const Query = `SELECT * FROM users WHERE refresh_token = '${refresh_token}'`;
            const [rows] = yield database_1.default.DB.execute(Query);
            return rows;
        });
    }
}
exports.default = Auth;
