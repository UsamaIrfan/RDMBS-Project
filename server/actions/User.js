import { db } from "../config/index.js"

export const verifyUser = (userName, res) => {
    const sqlGetUser =
        `SELECT * FROM inventorysystem.users WHERE user_email = "${userName}" LIMIT 1`

    db.query(sqlGetUser, (err, user) => {
        if (err) {
            return res.json({ msg: "User Not Found. " })
        }
        if (user.length) {
            res.send({
                userExist: true,
                userId: user[0].user_id,
                email: user[0].user_email,
            })
        }
    })

}