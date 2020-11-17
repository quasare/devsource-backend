const express = require("express");
const router = express.Router({mergeParams: true});

const { ensureCorrectUser, authRequired, adminRequired } = require("../middleware/auth");

const LikedResource = require("../models/like");
const { validate } = require("jsonschema");

const {  } = require("../schemas");

router.post('/resource', async (req, res, next) => {
    let {username, resource_id, rating} = req.body
    try {
        let liked_resource = await LikedResource.addLikedResource({username, resource_id, rating})
        return res.json({liked_resource})
    } catch (error) {
        return next(error)
    }   
})

router.delete('/resource', async (req, res, next) => {
    try {
       let resource = await LikedResource.deleteLikedResource(req.body) 
       return res.json('Like Removed')
    } catch (error) {
        return next(error)
    }
})

router.post('/video', async (req, res, next) => {
    let {username, youtube_url} = req.body
    try {
        let liked_video = await LikedResource.addLikedVid({username, youtube_url})
        return res.json({liked_video})
    } catch (error) {
        return next(error)
    }   
})

router.delete('/video/:id', async (req, res, next) => {
    try {
       let video = await LikedResource.deleteLikedVid(req.params.id) 
       return res.json('Like Removed')
    } catch (error) {
        return next(error)
    }
})

router.post('/lang', async (req, res, next) => {
    let {username, lang_name} = req.body
    try {
        let liked_lang = await LikedResource.addLikedLang({username, lang_name})
        return res.json({liked_lang})
    } catch (error) {
        return next(error)
    }   
})

router.delete('/lang', async (req, res, next) => {
    try {
       let lang = await LikedResource.deleteLikedLang(req.body) 
       return res.json('Like Removed')
    } catch (error) {
        return next(error)
    }
})

module.exports = router