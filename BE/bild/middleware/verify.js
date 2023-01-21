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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth_1 = __importDefault(require("../model/Auth"));
class Verify {
    constructor() {
        this.model = new Auth_1.default;
    }
    veriftToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHaders = req.headers['authorization'];
                const token = authHaders && authHaders.split(' ')[1];
                if (token == null)
                    return res.status(401);
                jsonwebtoken_1.default.verify(token, "U3C32RKIM9C329C9MERIJDF9UCM4M9UTSCIW092UU4DNFDN9JDJDJF", (err, decoded) => {
                    if (err)
                        return res.json({ msg: 'Token Expaied' });
                    req.body.nip = decoded;
                    next();
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "SERVER ERROR" });
            }
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies.refreshToken;
                if (!refreshToken)
                    return res.status(401);
                const user = yield this.model.refreshToken(refreshToken);
                if (!user[0])
                    return res.status(403);
                jsonwebtoken_1.default.verify(refreshToken, "KDMKFMSDMFPK203I23NPJJV4I5IDF37H5HHHICJEWKMFCCIRIR3R23", (err, decoded) => {
                    if (err)
                        return res.status(403);
                    const nip = user[0].nip;
                    const nama = user[0].nama;
                    const accessToken = jsonwebtoken_1.default.sign({ nip, nama }, "U3C32RKIM9C329C9MERIJDF9UCM4M9UTSCIW092UU4DNFDN9JDJDJF", {
                        expiresIn: '15s'
                    });
                    res.json({ accessToken });
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "SERVER ERROR" });
            }
        });
    }
}
exports.default = Verify;
