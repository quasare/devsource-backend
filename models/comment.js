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

      // Get all comments for user sort by date
      static async getUserComment(username){
        const result = await db.query(`SELECT * FROM comments WHERE username = $1`
        , [username])
        return result.rows
      }
      
      
      // Add comment for lang need user
      static async addComment(comment){
        const result = await db.query(
          `
          INSERT INTO comments
          (username, lang_name, comment, created_at) 
          VALUES ($1, $2, $3, current_timestamp) 
          RETURNING username, lang_name, comment, created_at
          `, 
          [comment.username, comment.lang_name, comment.comment]
        )
        return result.rows[0]
      }
      
      //delete comment
      static async delete(id){
        const result = await db.query(
          `DELETE FROM comments 
          WHERE id = $1`,
          [id]
        )
      }


      // Get comments for resource -- to add later
      // Add comment for resource need user - to add later
}

module.exports = Comment;