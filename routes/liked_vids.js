const express = require("express");
const router = express.Router({mergeParams: true});

const { ensureCorrectUser, authRequired, adminRequired } = require("../middleware/auth");

const LikedVid = require("../models/liked_vid");
const { validate } = require("jsonschema");

const {  } = require("../schemas");


router.get('/', async (req, res, next) =>{
    let user = req.params.username
    try {
        let vid = await LikedVid.getAll(user)
        return res.json({vid})
    } catch (error) {
        return next(error) 
    }
})


module.exports = router;