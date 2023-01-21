import { RowDataPacket } from "mysql2";
import Database from "../config/database";

class Users {

    getAll = async () => {
        const Query = `SELECT * FROM users`;
        const [row] = await Database.DB!.execute(Query);
        return row as RowDataPacket[];
    }

    getAllById = async (id:String) => {
        const Query = `SELECT * FROM users WHERE id = '${id}'`;
        const [rows] =  await Database.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    createUser = async (nip:String , nama:String , password:String) => {
        const Query = `INSERT INTO users SET nip = '${nip}', nama = '${nama}' , password = '${password}'`;
        const [rows] = await Database.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    updateUser = async (nip:String , nama:String , password:String, id:String) => {
        const Query = `UPDATE users SET nip = '${nip}', nama = '${nama}' , password = '${password}' WHERE id = '${id}'`;
        const [rows] = await Database.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    deleteUser = async (id:String) => {
        const Query = `DELETE FROM users WHERE id = '${id}'`;
        const [rows] =  await Database.DB!.execute(Query);
        return rows as RowDataPacket[];
    }
} 

export default Users;