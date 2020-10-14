
const express = require("express");
const router = express.Router({mergeParams: true});

const { ensureCorrectUser, authRequired, adminRequired } = require("../middleware/auth");

const Comment = require("../models/comment");
const { validate } = require("jsonschema");

const {  } = require("../schemas");


/** Resource Routes */

// Get comments for lang
router.get('/', async (req, res, next) =>{
    let lang = req.params.lang_name
    try {
        let comments = await Comment.findAllByLang(lang)
        return res.json({comments})
    } catch (error) {
        return next(error)
    }
})

// Get comments for user
// Get comments for resource

// Add comment for lang need user
// Add comment for resource need user
// Delete comment for lang need user
// Delete comment for resource need user

module.exports = router