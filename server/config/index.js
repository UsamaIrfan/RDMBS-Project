import mysql from "mysql"

export const db = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: 'inventorysystem',
})

export const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: 'inventorysystem',
})