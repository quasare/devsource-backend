const express = require("express");
const router = express.Router({mergeParams: true});

const { authRequired, adminRequired } = require("../middleware/auth");

const Resource = require("../models/resource");
const { validate } = require("jsonschema");

const { newResource, updateResource } = require("../schemas");


// Get all resouces for lang
router.get('/:lang_name', authRequired, async (req, res, next) => {
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
router.get('/detail/:id',authRequired, async (req, res, next) => {
    console.log(req.params.id);
    try {
        let resource = await Resource.getOneByName(req.params.id)
        return res.json({resource})
    } catch (error) {
        return next(error)
    }
})

// Edit resource detail if admin
router.patch('/:id', authRequired, async (req, res, next) => {
    try {
    const validation = validate(req.body, updateResource);
    if (!validation.valid) {
      return next({
        status: 400,
        message: validation.errors.map(e => e.stack)
      })};
        let resource = await Resource.update(req.params.id, req.body)
        return res.json({resource})
    } catch (error) {
        return next(error)
    }
})
// Create resource if admin
router.post('/', adminRequired, async (req, res, next) => {
    try {
        const validation = validate(req.body, newResource);
    if (!validation.valid) {
      return next({
        status: 400,
        message: validation.errors.map(e => e.stack)
      })};
        let resource = await Resource.create(req.body)
        return res.json({resource})
    } catch (error) {
        return next(error)
    }
})

// Delete resource if admin
router.delete('/:id', adminRequired, async (req, res, next) => {
    try {
        await Resource.delete(req.params.id)
        return res.json({message: 'Resource Deleted'})
    } catch (error) {
        return next(error)
    }
})

module.exports = router;