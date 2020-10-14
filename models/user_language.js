const db = require("../db");
const partialUpdate = require("../helpers/partialUpdate");


class UserLang {
    static async getAll(user){
        let result = await db.query(`
            SELECT * FROM user_language WHERE username = $1
        `, [user])
        return result.rows;
    }

}

module.exports = UserLang;