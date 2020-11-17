const db = require("../db");
const partialUpdate = require("../helpers/partialUpdate");


class LikedResource {
    static async getAllLikedResources(user) {
        const result = await db.query(`
        SELECT * FROM liked_resource WHERE username = $1
        `, [user])
        return result.rows

    }

    static async getAllLikedVids(user) {
        const result = await db.query(`
        SELECT * FROM liked_resource WHERE username = $1
        `, [user])
        return result.rows

    }

    static async addLikedResource(resource){
        const result = await db.query(`
        INSERT INTO liked_resource 
        (username, resource_id, rating)
         VALUES ($1, $2, $3)
         RETURNING id, username, resource_id, rating
        `, [resource.username, resource.resource_id, resource.rating])

        return result.rows[0]
    }

    static async deleteLikedResource(data){
        const result = await db.query(`
         DELETE FROM liked_resource 
         WHERE resource_id = $1 AND username=$2
        `, [data.id, data.username])
    }

    static async addLikedVid(vid){
        const result = await db.query(`
        INSERT INTO liked_vid 
        (username, youtube_url)
         VALUES ($1, $2)
         RETURNING id, username, youtube_url
        `, [vid.username, vid.youtube_url])

        return result.rows[0]
    }

    static async deleteLikedVid(id){
        const result = await db.query(`
         DELETE FROM liked_vid 
         WHERE id = $1
        `, [id])
    }

    static async addLikedLang(lang){
        const result = await db.query(`
        INSERT INTO user_language
        (username, lang_name)
         VALUES ($1, $2)
         RETURNING id, username, lang_name
        `, [lang.username, lang.lang_name])

        return result.rows[0]
    }

    static async deleteLikedLang(data){
        const result = await db.query(`
         DELETE FROM user_language
         WHERE username=$1 AND lang_name=$2
        `, [data.username, data.lang_name])
    }
}


module.exports = LikedResource;