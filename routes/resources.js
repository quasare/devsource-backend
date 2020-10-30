const express = require("express");
const router = express.Router({mergeParams: true});

const { ensureCorrectUser, authRequired } = require("../middleware/auth");

const Resource = require("../models/resource");
const { validate } = require("jsonschema");
const { request } = require("../app");

// Get all resouces for lang
router.get('/:lang_name', async (req, res, next) => {
    let lang = req.params.lang_name
    try {
        let resources = await Resource.getResourcebyLang(lang)
        return res.json({resources})
    } catch (error) {
        return next(error)
    }
})

/** Resource Routes */


// Get one per lang
router.get('/detail/:id', async (req, res, next) => {
    console.log(req.params.id);
    try {
        let resource = await Resource.getOneByName(req.params.id)
        return res.json({resource})
    } catch (error) {
        return next(error)
    }
})

// Edit resource detail if admin
router.patch('/:id', async (req, res, next) => {
    try {
        let resource = await Resource.update(req.params.id, req.body)
        return res.json({resource})
    } catch (error) {
        return next(error)
    }
})
// Create resource if admin
router.post('/', async (req, res, next) => {
    try {
        let resource = await Resource.create(req.body)
        return res.json({resource})
    } catch (error) {
        return next(error)
    }
})

// Delete resource if admin
router.delete('/:id', async (req, res, next) => {
    try {
        await Resource.delete(req.params.id)
        return res.json({message: 'Resource Deleted'})
    } catch (error) {
        return next(error)
    }
})

module.exports = router;