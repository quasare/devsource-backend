const db = require("../db");
const partialUpdate = require("../helpers/partialUpdate");


class LikedResource {
    static async getAll(user) {
        const result = await db.query(`
        SELECT * FROM liked_resource WHERE username = $1
        `, [user])
        return result.rows

    }
}


module.exports = LikedResource;