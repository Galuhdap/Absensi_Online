import { RowDataPacket } from "mysql2";
import Database from "../config/database";


class Auth {

    login = async (nip:String) =>{
        const Query = `SELECT * FROM users WHERE nip = '${nip}'`;
        const [rows] = await Database.DB!.execute(Query);
        return rows as RowDataPacket[]; 
    }

    updateToken = async (refresh_token:String , nip:String) => {
        const Query = `UPDATE users SET refresh_token = '${refresh_token}' WHERE nip = '${nip}'`;
        const [rows] = await Database.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    logout = async (refresh_token:Text) => {
        const Query =  `SELECT * FROM users WHERE refresh_token = '${refresh_token}'`;
        const [rows] = await Database.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    clearToken = async (nip:String ) => {
        const Query =  `UPDATE users SET refresh_token = NULL WHERE nip = '${nip}'`;
        const [rows] = await Database.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    refreshToken = async (refresh_token:Text) => {
        const Query =  `SELECT * FROM users WHERE refresh_token = '${refresh_token}'`;
        const [rows] = await Database.DB!.execute(Query);
        return rows as RowDataPacket[];
    }
    
}

export default Auth;