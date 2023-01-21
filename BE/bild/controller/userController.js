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
const routerController_1 = __importDefault(require("./routerController"));
const Users_1 = __importDefault(require("../model/Users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const verify_1 = __importDefault(require("../middleware/verify"));
class UserController extends routerController_1.default {
    constructor() {
        super();
        this.model = new Users_1.default;
        this.verify = new verify_1.default;
        this.router.get("/user", this.getAll.bind(this));
        this.router.get("/user/:id", this.verify.veriftToken, this.getAllById.bind(this));
        this.router.post("/user", this.verify.veriftToken, this.createUser.bind(this));
        this.router.post("/user/:id", this.verify.veriftToken, this.updateUser.bind(this));
        this.router.delete("/user/:id", this.verify.veriftToken, this.deleteUser.bind(this));
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.model.getAll();
                res.status(200).json({ user });
            }
            catch (error) {
                res.status(500).json({ msg: "SERVER ERROR" });
            }
        });
    }
    getAllById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield this.model.getAllById(id);
                res.status(200).json({ user });
            }
            catch (error) {
                res.status(500).json({ msg: "SERVER ERROR" });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nip, nama, password, confPassword } = req.body;
                if (password != confPassword)
                    return res.status(400).json({ msg: "Password Tidak Cocok" });
                const salt = yield bcrypt_1.default.genSalt();
                const hashPassword = yield bcrypt_1.default.hash(password, salt);
                const user = yield this.model.createUser(nip, nama, hashPassword);
                res.status(200).json({ msg: "Succes Create" });
            }
            catch (error) {
                res.status(500).json({ msg: "SERVER ERROR" });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { nip, nama, password, confPassword } = req.body;
                let hashPassword;
                const user = yield this.model.getAllById(id);
                if (!user.length)
                    return res.status(400).json({ msg: "Tidak Ada User" });
                if (password != confPassword)
                    return res.status(400).json({ msg: "Password Tidak Cocok" });
                if (password === "" && confPassword === null) {
                    hashPassword = user[0].password;
                }
                else {
                    const salt = yield bcrypt_1.default.genSalt();
                    hashPassword = yield bcrypt_1.default.hash(password, salt);
                }
                const users = yield this.model.updateUser(nip, nama, hashPassword, id);
                res.status(200).json({ msg: "Succes Update" });
            }
            catch (error) {
                res.status(500).json({ msg: "SERVER ERROR" });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const userId = yield this.model.getAllById(id);
                if (!userId.length)
                    return res.status(400).json({ msg: "Tidak Ada User" });
                const user = yield this.model.deleteUser(id);
                res.status(200).json({ msg: "Succes Delete" });
            }
            catch (error) {
                res.status(500).json({ msg: "SERVER ERROR" });
            }
        });
    }
}
exports.default = UserController;
