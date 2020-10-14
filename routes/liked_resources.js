const express = require("express");
const router = express.Router({mergeParams: true});

const { ensureCorrectUser, authRequired, adminRequired } = require("../middleware/auth");

const LikedResource = require("../models/liked_resource");
const { validate } = require("jsonschema");

const {  } = require("../schemas");

router.get('/', async (req, res, next) => {
    let user = req.params.username
    try {
        console.log(user);
        let resource = await LikedResource.getAll(user)
        return res.json({resource})
    } catch (error) {
        return next(error)
    }   
})

module.exports = router