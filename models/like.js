const db = require("../db");
const partialUpdate = require("../helpers/partialUpdate");


class LikedResource {
    static async getAll(user) {
        const result = await db.query(`
        SELECT * FROM liked_resource WHERE username = $1
        `, [user])
        return result.rows

    }

    static async add(resource){
        const result = await db.query(`
        INSERT INTO liked_resource 
        (username, resource_id, rating)
         VALUES ($1, $2, $3)
         RETURNING username, resource_id, rating
        `, [resource.username, resource.resource_id, resource.rating])

        return result.rows[0]
    }

    static async delete(resource){
        const result = await db.query(`
         DELETE FROM liked_resource 
         WHERE username = $1 and resource_id = $1
        `, [resource.username, resource.resource_id])
    }
}


module.exports = LikedResource;