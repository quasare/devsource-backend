const db = require("../db");
const partialUpdate = require("../helpers/partialUpdate");

class Technology {  
    static async findAll() {
        const result = await db.query(
            `SELECT username, first_name, last_name, email
              FROM users
              ORDER BY username`);
    
        return result.rows;
      }

}

export default Technology