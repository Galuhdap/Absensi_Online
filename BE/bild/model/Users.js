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
class Users {
    constructor() {
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const Query = `SELECT * FROM users`;
            const [row] = yield database_1.default.DB.execute(Query);
            return row;
        });
        this.getAllById = (id) => __awaiter(this, void 0, void 0, function* () {
            const Query = `SELECT * FROM users WHERE id = '${id}'`;
            const [rows] = yield database_1.default.DB.execute(Query);
            return rows;
        });
        this.createUser = (nip, nama, password) => __awaiter(this, void 0, void 0, function* () {
            const Query = `INSERT INTO users SET nip = '${nip}', nama = '${nama}' , password = '${password}'`;
            const [rows] = yield database_1.default.DB.execute(Query);
            return rows;
        });
        this.updateUser = (nip, nama, password, id) => __awaiter(this, void 0, void 0, function* () {
            const Query = `UPDATE users SET nip = '${nip}', nama = '${nama}' , password = '${password}' WHERE id = '${id}'`;
            const [rows] = yield database_1.default.DB.execute(Query);
            return rows;
        });
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const Query = `DELETE FROM users WHERE id = '${id}'`;
            const [rows] = yield database_1.default.DB.execute(Query);
            return rows;
        });
    }
}
exports.default = Users;
