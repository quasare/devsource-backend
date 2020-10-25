
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
router.get('/:username', async (req, res, next) => {
    let user = req.params.username
    try {
        let comments = await Comment.getUserComment(user)
        return res.json({comments})
    } catch (error) {
        return next(error)
    }
})

// Add comment for lang need user
router.post('/', async (req, res, next) => {
    try {
        let comment = await Comment.addComment(req.body)
        return res.json({comment})
    } catch (error) {
        return next(error)
    }
})

// Delete comment for lang need user
router.delete('/:id', async (req, res, next) => {
    try {
        let comment = await Comment.delete(req.params.id)
        return res.json('Comment Deleted')
    } catch (error) {
        return next(error)
    }
})

module.exports = router;

// Get comments for resource
// Add comment for resource need user
// Delete comment for resource need user