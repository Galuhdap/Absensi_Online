import { Request, Response } from "express";
import Auth from "../model/Auth";
import Routers from "./routerController";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


class AuthController extends Routers {

    model = new Auth();

    constructor() {
        super();

        this.router.post('/login', this.login.bind(this));
        this.router.delete('/logout', this.logout.bind(this));
    }

    async login(req: Request, res: Response) {

        try {
            const { nip, password } = req.body;

            const user = await this.model.login(nip);
            const match = await bcrypt.compare(password, user[0].password);

            if (!match) return res.status(400).json({ berhasil: false, data: "aaaaa" });

            const nip_user = user[0].nip;
            const nama = user[0].nama;

            const accesToken = jwt.sign({ nip_user, nama }, "U3C32RKIM9C329C9MERIJDF9UCM4M9UTSCIW092UU4DNFDN9JDJDJF", {
                expiresIn: "20s"
            })

            const refreshToken = jwt.sign({ nip_user, nama }, "KDMKFMSDMFPK203I23NPJJV4I5IDF37H5HHHICJEWKMFCCIRIR3R23", {
                expiresIn: "1d"
            })

            const updateToken = await this.model.updateToken(refreshToken, nip);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            })

            res.json({ berhasil: accesToken.length > 0, data: accesToken });


        } catch (error) {

            res.status(500).json({ msg: "SERVER ERROR!!" });
        }

    }

    async logout(req: Request, res: Response) {
        try {
            // const refreshToken = req.cookies.refreshToken;
            // if(!refreshToken) return res.status(402);
            // const user = await this.model.logout(refreshToken);

            // const nip = user[0].nip;
            const { nip } = req.body;

            const clear = await this.model.clearToken(nip);

            // res.clearCookie("refreshToken");
            res.status(200).json({ msg: "Succes Logout" });
        } catch (error) {
            res.status(500).json({ msg: "SERVER ERROR!!" });
        }
    }

}

export default AuthController;