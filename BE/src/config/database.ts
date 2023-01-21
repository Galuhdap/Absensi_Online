import mysql from "mysql2/promise"

class Database {

    static DB?:mysql.Connection;

    static async init() {
        this.DB = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'absensi'
        });
    }
}

export default Database;