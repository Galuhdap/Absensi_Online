import { RowDataPacket } from "mysql2";
import Database from "../config/database";

class Present {

    checkIn = async (nip:String) => {
        const Query = `INSERT INTO absensis SET users_nip = '${nip}' , status = 'in' `;
        const [rows] = await Database.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    checkOut = async (nip:Number) => {
        const Query = `INSERT INTO absensis SET users_nip = '${nip}', status = 'out' `;
        const [rows] = await Database.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    status = async (nip:String) => {
        const Query =  `SELECT * FROM absensis WHERE users_nip = '${nip}' ORDER BY users_nip DESC LIMIT 1`;
        const [rows] = await Database.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    getPresentById = async (users_nip:String) => {
        const Query = `SELECT * FROM absensis WHERE users_nip = '${users_nip}' `;
        const [rows] =  await Database.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    getDateById = async (users_nip:String) => {
        const Query = `SELECT DATE_FORMAT(createdAt, '%d - %m - %Y') FROM absensis WHERE users_nip = '${users_nip}'`;
        const [rows] =  await Database.DB!.execute(Query);
        return rows as RowDataPacket[];
    }
}

export default Present;