import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Auth from "../model/Auth";


class Verify {

    model = new Auth;

    async veriftToken (req:Request , res:Response , next:NextFunction) {
        try {
            const authHaders = req.headers['authorization'];
            const token = authHaders && authHaders.split(' ')[1];
            if(token == null) return res.status(401);
            jwt.verify(token , "U3C32RKIM9C329C9MERIJDF9UCM4M9UTSCIW092UU4DNFDN9JDJDJF" , (err , decoded) => {
            if(err) return res.json({msg : 'Token Expaied'});
            req.body.nip = decoded;
            next();
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "SERVER ERROR"});
        }
        
    }

   async refreshToken (req:Request , res:Response ) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if(!refreshToken) return res.status(401);
            
            const user = await this.model.refreshToken(refreshToken);
            if(!user[0]) return res.status(403);
            
            jwt.verify(refreshToken , "KDMKFMSDMFPK203I23NPJJV4I5IDF37H5HHHICJEWKMFCCIRIR3R23" , (err:any , decoded:any) => {
            if(err) return res.status(403);
            const nip = user[0].nip;
            const nama = user[0].nama;
            
            const accessToken = jwt.sign({nip , nama} , "U3C32RKIM9C329C9MERIJDF9UCM4M9UTSCIW092UU4DNFDN9JDJDJF", {
                expiresIn: '15s'
            });
            res.json({accessToken});
        })
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "SERVER ERROR"});
        }
    }
}

export default Verify;