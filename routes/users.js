/** Routes for users. */

const express = require("express");
const router = express.Router();

const { ensureCorrectUser, authRequired } = require("../middleware/auth");

const User = require("../models/user");
const { validate } = require("jsonschema");

const { userNewSchema, userUpdateSchema } = require("../schemas");

const createToken = require("../helpers/createToken");

/** GET / => {users: [user, ...]} */

router.get("/", authRequired, async function(req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

/** GET /[username] => {user: user} */

router.get("/:username",  async function(req, res, next) {
  try {
    const user = await User.findOne(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** POST / {userdata}  => {token: token} */

router.post("/register", async function(req, res, next) {
  try {
    delete req.body._token;
    const validation = validate(req.body, userNewSchema);

    if (!validation.valid) {
      return next({
        status: 400,
        message: validation.errors.map(e => e.stack)
      });
    }

    const newUser = await User.register(req.body);
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (e) {
    return next(e);
  }
});

/** PATCH /[handle] {userData} => {user: updatedUser} */


router.patch("/:username", ensureCorrectUser,  async function(req, res, next) {
  try {
    if ("username" in req.body || "is_admin" in req.body) {
      return next({ status: 400, message: "Not allowed" });
    }
    await User.authenticate({
      username: req.params.username,
      password: req.body.password
    });
    delete req.body.password;
    const validation = validate(req.body, userUpdateSchema);
    if (!validation.valid) {
      return next({
        status: 400,
        message: validation.errors.map(e => e.stack)
      });
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  {message: "User deleted"}  */

router.delete("/:username", ensureCorrectUser, async function(req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ message: "User deleted" });
  } catch (err) {
    return next(err);
  }
});

router.get('/:username/languages', async (req, res, next) =>{
  try {
      let languages = await User.getLikedLanguages(req.params.username)
      return res.json({languages})
  } catch (error) {
    return next(err)
  }

})

router.get('/:username/resources', async (req, res, next) =>{
  try {
    let resources = await User.getLikedResources(req.params.username)
    return res.json({resources})
  } catch (error) {
    return next(err)
  }

})

router.get('/:username/videos', async (req, res, next) =>{
  try {
    let videos = await User.getLikedVids(req.params.username)
    return res.json({videos})
  } catch (error) {
    return next(error)
  }

})



module.exports = router;
