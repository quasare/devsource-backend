
const express = require("express");
const router = express.Router({mergeParams: true});

const { ensureCorrectUser, authRequired, adminRequired } = require("../middleware/auth");

const Comment = require("../models/comment");
const { validate } = require("jsonschema");

const {  } = require("../schemas");


/** Comment Routes */

// Get comments for lang
router.get('/language/:lang_name', async (req, res, next) =>{
    let lang = req.params.lang_name
    try {
        let comments = await Comment.findAllByLang(lang)
        return res.json({comments})
    } catch (error) {
        return next(error)
    }
})

// Get comments for resource
router.get('/resource/:id', async (req, res, next) =>{
    let resource = req.params.id
    try {
        let comments = await Comment.findAllByResource(resource)
        return res.json({comments})
    } catch (error) {
        return next(error)
    }
})


// Get comments for user
router.get('/user/:username', async (req, res, next) => {
    let user = req.params.username
    try {
        let comments = await Comment.getUserComment(user)
        return res.json({comments})
    } catch (error) {
        return next(error)
    }
})

// Add comment for lang need user
router.post('/lang', async (req, res, next) => {
    try {
        let comment = await Comment.addCommentLang(req.body)
        return res.json({comment})
    } catch (error) {
        return next(error)
    }
})


// Add comment for resource need user
router.post('/resource', async (req, res, next) => {
    try {
        let comment = await Comment.addCommentResource(req.body)
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

