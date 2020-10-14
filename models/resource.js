const db = require("../db");
const partialUpdate = require("../helpers/partialUpdate");


class Resource {
    static async getResourcebyLang(lang){
        let result = await db.query(`
            SELECT * FROM resources WHERE lang_name = $1
        `, [lang])

        return result.rows
    }


}

module.exports = Resource;


