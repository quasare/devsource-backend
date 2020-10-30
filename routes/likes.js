const express = require("express");
const router = express.Router({mergeParams: true});

const { ensureCorrectUser, authRequired, adminRequired } = require("../middleware/auth");

const LikedResource = require("../models/like");
const { validate } = require("jsonschema");

const {  } = require("../schemas");

router.get('/', async (req, res, next) => {
    let user = req.params.username
    try {
        let resource = await LikedResource.getAll(user)
        return res.json({resource})
    } catch (error) {
        return next(error)
    }   
})

router.post('/', async (req, res, next) => {
    try {
       let resource = await LikedResource.add(req.body) 
       return res.json({resource})
    } catch (error) {
        return next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
})

module.exports = router