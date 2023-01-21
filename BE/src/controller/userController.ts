import Routers from "./routerController";
import Users from "../model/Users";
import bcrypt from "bcrypt";
import { Request , Response } from "express";
import Verify from "../middleware/verify";


class UserController extends Routers{

    model = new Users;
    verify = new Verify;

    constructor(){
        super();
        this.router.get("/user" , this.getAll.bind(this));
        this.router.get("/user/:id" , this.getAllById.bind(this));
        this.router.post("/user", this.createUser.bind(this));
        this.router.post("/user/:id",this.verify.veriftToken , this.updateUser.bind(this));
        this.router.delete("/user/:id",this.verify.veriftToken , this.deleteUser.bind(this));
    }

    async getAll(req:Request , res:Response) {
        try {
            const user = await this.model.getAll();
            res.status(200).json({user});
        } catch (error) {  
            res.status(500).json({msg: "SERVER ERROR"});
        }
    }

    async getAllById(req:Request , res:Response) {
        try {
            const id = req.params.id;
            const user = await this.model.getAllById(id);
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json({msg: "SERVER ERROR"});
        }
    }

    async createUser(req:Request , res:Response) {
        try {
            const {nip , nama , password, confPassword} = req.body;

            if(password != confPassword) return res.status(400).json({msg: "Password Tidak Cocok"});

            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password , salt);

            const user = await this.model.createUser(nip , nama , hashPassword);
            res.status(200).json({msg: "Succes Create"});
        } catch (error) {
            res.status(500).json({msg: "SERVER ERROR"});
        }
    }

    async updateUser(req:Request , res:Response) {
        try {
            const id = req.params.id;
            const {nip , nama , password, confPassword} = req.body;

            let hashPassword;

            const user = await this.model.getAllById(id);

            if(!user.length) return res.status(400).json({msg: "Tidak Ada User"});

            if(password != confPassword) return res.status(400).json({msg: "Password Tidak Cocok"});

            if(password === "" && confPassword === null){
                hashPassword = user[0].password;
            }else {
                const salt = await bcrypt.genSalt();
                hashPassword = await bcrypt.hash(password , salt);
            }

            const users = await this.model.updateUser(nip , nama , hashPassword , id);
            res.status(200).json({msg: "Succes Update"});
        } catch (error) {
            res.status(500).json({msg: "SERVER ERROR"});
        }
    }
    
    async deleteUser(req:Request , res:Response) {
        try {
            const id = req.params.id;

            const userId = await this.model.getAllById(id);

            if(!userId.length) return res.status(400).json({msg: "Tidak Ada User"});

            const user = await this.model.deleteUser(id);
            res.status(200).json({msg: "Succes Delete"});

        } catch (error) {
            res.status(500).json({msg: "SERVER ERROR"});
        }
    }

    
}

export default UserController;