const db = require("../db");
const partialUpdate = require("../helpers/partialUpdate");


class Resource {
    static async getResourcebyLang(lang){
        let result = await db.query(`
            SELECT * FROM resources WHERE lang = $1
        `, [lang])

        return result.rows
    }

    // Get one per lang
    static async getOneByName(id){
        let result = await db.query(`
            SELECT * FROM resources 
            WHERE id = $1
        `, [id])

        return result.rows[0]
    }
// Edit resourc detail if admin

    static async update(id, data){
        let {query, values} = partialUpdate('resources', data,
         'id',id );

        const result = await db.query(query, values);
        const resource = result.rows[0]

        return resource
    }

// Create resourc if admin
    static async create(data) {
    const duplicateCheck = await db.query(`
      SELECT resource_name FROM resources WHERE lang = $1 and resource_name = $2
    `, [data.resource_name, data.lang]);

    if (duplicateCheck.rows[0]){
      let duplicateError = new Error(
        `There already exists a language with name '${data.resource_name}`);
        duplicateError.status = 409; // 409 Conflict
        throw duplicateError
    }


    const result = await db.query(
      `
      INSERT INTO resources
      (lang, resource_name, website, detail, date_added) 
      VALUES ($1, $2, $3, $4, current_timestamp) 
      RETURNING id, lang, resource_name, website, detail, date_added
      `, 
      [data.lang, data.resource_name, data.website, data.detail]
    )
    return result.rows[0]
  }
// Delete resourc if admin
  static async delete(id){
    const result = await db.query(
        `DELETE FROM resources
        WHERE id = $1`, 
        [id]
      );
  }
}

module.exports = Resource;


