const db = require("../db");
const partialUpdate = require("../helpers/partialUpdate");

class Technology {  
    static async findAll() {
        const result = await db.query(
            `SELECT *
              FROM languages
              ORDER BY lang_name`);
        return result.rows;
      }

      static async getLanguage(lang_name) {
        const result = await db.query(`SELECT * FROM languages WHERE
            lang_name = $1
          `, [lang_name])
      }

}

export default Technology