const db = require("../db");
const partialUpdate = require("../helpers/partialUpdate");

class Language {  
    static async getAll() {
      console.log('ping 2');
        const result = await db.query(
            `SELECT lang_name, lang_code, docs, website, logo_url
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

module.exports = Language;