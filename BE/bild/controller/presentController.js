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
const Presents_1 = __importDefault(require("../model/Presents"));
const verify_1 = __importDefault(require("../middleware/verify"));
class PresentController extends routerController_1.default {
    constructor() {
        super();
        this.model = new Presents_1.default;
        this.verify = new verify_1.default;
        this.router.post('/checkin', this.verify.veriftToken, this.checkin.bind(this));
        this.router.post('/checkout', this.verify.veriftToken, this.checkout.bind(this));
    }
    checkin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { users_nip } = req.body;
                const present = yield this.model.checkIn(users_nip);
                res.status(200).json({ msg: "Berhasil CheckIn", metadata: present });
            }
            catch (error) {
                res.status(500).json({ msg: "SERVER ERROR" });
            }
        });
    }
    checkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { users_nip } = req.body;
                const present = yield this.model.checkOut(users_nip);
                res.status(200).json({ msg: "Berhasil CheckOut", metadata: present });
            }
            catch (error) {
                res.status(500).json({ msg: "SERVER ERROR" });
            }
        });
    }
}
exports.default = PresentController;
