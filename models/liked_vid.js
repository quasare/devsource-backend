const db = require("../db");
const partialUpdate = require("../helpers/partialUpdate");


class LikedVid {
    static async getAll(user) {
        let vid = await db.query(`
        SELECT * FROM liked_vid WHERE username = $1
        `,
        [user])
        return vid.rows
    }


}

module.exports = LikedVid;