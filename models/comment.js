const db = require("../db");
const partialUpdate = require("../helpers/partialUpdate");


class Comment {
    static async findAllByLang(lang) {
        const result = await db.query(
            `SELECT *
              FROM comments
              WHERE lang_name = $1 ORDER BY id`, [lang]);
        return result.rows;
      }


}

module.exports = Comment;