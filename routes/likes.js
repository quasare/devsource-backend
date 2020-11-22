const express = require("express");
const router = express.Router({mergeParams: true});

const { ensureCorrectUser, authRequired} = require("../middleware/auth");

const LikedResource = require("../models/like");


router.post('/resource', authRequired, async (req, res, next) => {
    let {username, resource_id, rating} = req.body
    try {
        let liked_resource = await LikedResource.addLikedResource({username, resource_id, rating})
        return res.json({liked_resource})
    } catch (error) {
        return next(error)
    }   
})

router.delete('/resource', authRequired, async (req, res, next) => {
    
    let {username, resource_id} = req.query
    try {
       let resource = await LikedResource.deleteLikedResource({username, resource_id}) 
       return res.json('Like Removed')
    } catch (error) {
        return next(error)
    }
})

router.post('/video', authRequired, async (req, res, next) => {
    let {username, youtube_url} = req.body
    try {
        let liked_video = await LikedResource.addLikedVid({username, youtube_url})
        return res.json({liked_video})
    } catch (error) {
        return next(error)
    }   
})

router.delete('/video/:id', authRequired, async (req, res, next) => {
    let {username, youtube_url} = req.query
    try {
       let video = await LikedResource.deleteLikedVid({username, youtube_url}) 
       return res.json('Like Removed')
    } catch (error) {
        return next(error)
    }
})

router.post('/lang', authRequired, async (req, res, next) => {
   
    let {username, language_name} = req.body
    try {
        let liked_lang = await LikedResource.addLikedLang({username, language_name})
        return res.json({liked_lang})
    } catch (error) {
        return next(error)
    }   
})

router.delete('/lang', authRequired, async (req, res, next) => {
    let {username, language_name} = req.query
    try {
       let lang = await LikedResource.deleteLikedLang({username, language_name}) 
       return res.json('Like Removed')
    } catch (error) {
        return next(error)
    }
})

module.exports = router