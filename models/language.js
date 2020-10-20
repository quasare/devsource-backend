const db = require("../db");
const sqlForPartialUpdate = require("../helpers/partialUpdate");
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
          return result.rows[0]
      }

      static async update(name, data){
        let {query, values} = sqlForPartialUpdate('languages', data,
         'lang_name', name);

        const result = await db.query(query, values);
        const language = result.rows[0]

        return language
      }

      static async create(lang) {
        const duplicateCheck = await db.query(`
          SELECT lang_name FROM languages WHERE lang_name = $1
        `, [lang.lang_name]);

        if (duplicateCheck.rows[0]){
          let duplicateError = new Error(
            `There already exists a language with name '${lang.lang_name}`);
            duplicateError.status = 409; // 409 Conflict
            throw duplicateError
        }

        const result = await db.query(
          `
          INSERT INTO languages
          (lang_name, lang_code, docs, website, logo_url) 
          VALUES ($1, $2, $3, $4, $5) 
          RETURNING lang_name, lang_code, docs, website, logo_url
          `, 
          [lang.lang_name, lang.lang_code, lang.docs, lang.website, lang.logo_url]
        )
        return result.rows[0]
      }

      static async delete(lang) {
        const result = await db.query(
          `DELETE FROM languages
          WHERE lang_name = $1`, 
          [lang]
        );
        // if(result.rows.length === 0){
        //   let notFound = new Error(`There exists no language ${lang}`);
        //   notFound.status = 404
        //   throw notFound;
        // }

      }
}

module.exports = Language;