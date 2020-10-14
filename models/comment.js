const db = require("../db");
const partialUpdate = require("../helpers/partialUpdate");


class Comment {
    static async findAll() {
        const result = await db.query(
            `SELECT *
              FROM comments
              ORDER BY id`);
        return result.rows;
      }


}

export default Comment;