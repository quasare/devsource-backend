const express = require("express");
const router = express.Router({mergeParams: true});

const { ensureCorrectUser, authRequired, adminRequired } = require("../middleware/auth");

const UserLang = require("../models/user_language");
const { validate } = require("jsonschema");

const {  } = require("../schemas");


router.get('/', async (req, res, next) => {
    let user = req.params.username
    try {
        let lang = await UserLang.getAll(user)
        return res.json({lang})
    } catch (error) {
        return next(error)
    }
})

module.exports = router;