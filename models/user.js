const db = require("../db");
const bcrypt = require("bcrypt");
const partialUpdate = require("../helpers/partialUpdate");

const BCRYPT_WORK_FACTOR = 10;


/** Related functions for users. */

class User {

  /** authenticate user with username, password. Returns user or throws err. */

  static async authenticate(data) {
    // try to find the user first
    const result = await db.query(
        `SELECT username, 
                password, 
                first_name, 
                last_name, 
                email, 
                photo_url, 
                is_admin
          FROM users 
          WHERE username = $1`,
        [data.username]
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(data.password, user.password);
      if (isValid) {
        return user;
      }
    }

    const invalidPass = new Error("Invalid Credentials");
    invalidPass.status = 401;
    throw invalidPass;
  }

  /** Register user with data. Returns new user data. */

  static async register(data) {
    const duplicateCheck = await db.query(
        `SELECT username 
            FROM users 
            WHERE username = $1`,
        [data.username]
    );

    if (duplicateCheck.rows[0]) {
      const err = new Error(
          `There already exists a user with username '${data.username}`);
      err.status = 409;
      throw err;
    }
    
    const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
        `INSERT INTO users 
            (username, password, first_name, last_name, email, photo_url, is_admin) 
          VALUES ($1, $2, $3, $4, $5, $6, $7) 
          RETURNING username, password, first_name, last_name, email, photo_url, is_admin`,
        [
          data.username,
          hashedPassword,
          data.first_name,
          data.last_name,
          data.email,
          data.photo_url,
          data.is_admin
        ]);

    return result.rows[0];
  }

  /** Find all users. */

  static async findAll() {
    const result = await db.query(
        `SELECT username, first_name, last_name, email
          FROM users
          ORDER BY username`);

    return result.rows;
  }

  /** Given a username, return data about user. */

  static async findOne(username) {
    const userRes = await db.query(
        `SELECT username, first_name, last_name, email, photo_url 
            FROM users 
            WHERE username = $1`,
        [username]);

    // const user = userRes.rows[0];

    if (!userRes) {
      const error = new Error(`There exists no user '${username}'`);
      error.status = 404;   // 404 NOT FOUND
      throw error;
    }

    // const userLanguages = await db.query();

  
    return userRes.rows[0];
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Return data for changed user.
   *
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    let {query, values} = partialUpdate(
        "users",
        data,
        "username",
        username
    );

    const result = await db.query(query, values);
    const user = result.rows[0];

    if (!user) {
      let notFound = new Error(`There exists no user '${username}`);
      notFound.status = 404;
      throw notFound;
    }

    delete user.password;
    delete user.is_admin;

    return result.rows[0];
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
      let result = await db.query(
              `DELETE FROM users 
                WHERE username = $1
                RETURNING username`,
              [username]);

    if (result.rows.length === 0) {
      let notFound = new Error(`There exists no user '${username}'`);
      notFound.status = 404;
      throw notFound;
    }
  }

  static async getLikedResources(username) {
    let result = await db.query(`
    SELECT resource_name, website FROM liked_resource  
    JOIN resources on 
    liked_resource.resource_id = resources.id WHERE username=$1 ORDER BY date_added DESC;
    `, [username])
    return result.rows
  }

  static async getLikedLanguages(username) {
    let result = await db.query(`
    SELECT language_name, website FROM user_language 
   JOIN languages ON user_language.language_name = languages.lang_name WHERE username=$1;
    `, [username])
    return result.rows
  }
  
  static async getLikedVids(username) {
    let result = await db.query(`
    SELECT youtube_url FROM liked_vid WHERE username = $1;
    `, [username])
    return result.rows
  }
  
  
}


module.exports = User;
