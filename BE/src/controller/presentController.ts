import Routers from "./routerController";
import Present from "../model/Presents";
import { Request, Response } from "express";
import Verify from "../middleware/verify";


class PresentController extends Routers{

    model = new Present;
    verify = new Verify;

    constructor() {
        super();
        this.router.post('/checkin',this.checkin.bind(this));
        this.router.post('/checkout', this.checkout.bind(this));
        this.router.post('/status', this.status.bind(this));
        this.router.post('/present', this.getPresentByID.bind(this));
        this.router.get('/date', this.getDateByID.bind(this));
    }

    async checkin (req:Request , res:Response){
        try {
            const {users_nip} = req.body;
            
            const present = await this.model.checkIn(users_nip);
            res.status(200).json({msg: "Berhasil CheckIn", respons: "in" , metadata: present});
        } catch (error) {
            res.status(500).json({msg: "SERVER ERROR"});
        }
        
    }

    async checkout (req:Request , res:Response){
        try {
            const {users_nip} = req.body;
            const present = await this.model.checkOut(users_nip);
            res.status(200).json({msg: "Berhasil CheckOut", respons: "out"  , metadata: present});
        } catch (error) {
            res.status(500).json({msg: "SERVER ERROR"});
        }
    }

    async status (req:Request , res:Response){
        try {
            const {users_nip} = req.body;
            const checkStatus = await this.model.status(users_nip);
            const SudahCheckin = checkStatus.length && checkStatus[0].status === "in";
            res.status(200).json({msg:'ini Status' , payload: !!SudahCheckin});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "SERVER ERROR"});
        }
    }

    async getPresentByID (req:Request , res:Response){
    try {
            const {users_nip} = req.body;
            const row = await this.model.getPresentById(users_nip);
            res.status(200).json(row);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "SERVER ERROR"});
        }
    }

    async getDateByID (req:Request , res:Response){
        try {
                const {users_nip} = req.body;
                const row = await this.model.getDateById(users_nip);
                res.status(200).json({row});
            } catch (error) {
                console.log(error);
                res.status(500).json({msg: "SERVER ERROR"});
            }
        }
    

}

export default PresentController;