import mysql from "mysql"

export const db = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: 'inventorysystem',
})

export const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: 'inventorysystem',
})