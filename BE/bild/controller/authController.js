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
const Auth_1 = __importDefault(require("../model/Auth"));
const routerController_1 = __importDefault(require("./routerController"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController extends routerController_1.default {
    constructor() {
        super();
        this.model = new Auth_1.default();
        this.router.post('/login', this.login.bind(this));
        this.router.delete('/logout', this.logout.bind(this));
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                const { nip, password } = req.body;
                const user = yield this.model.login(nip);
                const match = yield bcrypt_1.default.compare(password, user[0].password);
                if (!match)
                    return res.status(400).json("Password Salah");
                const nip_user = user[0].nip;
                const nama = user[0].nama;
                const accesToken = jsonwebtoken_1.default.sign({ nip_user, nama }, "U3C32RKIM9C329C9MERIJDF9UCM4M9UTSCIW092UU4DNFDN9JDJDJF", {
                    expiresIn: "20s"
                });
                const refreshToken = jsonwebtoken_1.default.sign({ nip_user, nama }, "KDMKFMSDMFPK203I23NPJJV4I5IDF37H5HHHICJEWKMFCCIRIR3R23", {
                    expiresIn: "1d"
                });
                const updateToken = yield this.model.updateToken(refreshToken, nip);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                });
                res.json({ berhasil: accesToken.length > 0, accesToken });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "SERVER ERROR!!" });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies.refreshToken;
                if (!refreshToken)
                    return res.status(402);
                const user = yield this.model.logout(refreshToken);
                const nip = user[0].nip;
                const clear = yield this.model.clearToken(nip);
                res.clearCookie("refreshToken");
                return res.status(200).json({
                    msg: "Succes Logout",
                });
            }
            catch (error) {
                res.status(500).json({ msg: "SERVER ERROR!!" });
            }
        });
    }
}
exports.default = AuthController;
