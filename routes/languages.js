/** Routes for technologies */

const express = require("express");
const router = express.Router();

const { ensureCorrectUser, authRequired, adminRequired } = require("../middleware/auth");

const Language = require("../models/language");
const { validate } = require("jsonschema");

const {  } = require("../schemas");

/** Language Routes */

// Get all lang
router.get('/', async (req, res, next) =>{
    try {
        let lang = await Language.getAll()
        return res.json({lang})
    } catch (error) {
        return next(error)
    }
})
// Get one lang
router.get('/:lang_name', async (req,res, next) => {
    let lang_name = req.params.lang_name
    try {
        let lang = await Language.getLanguage(lang_name)
        return res.json({lang})
    } catch (error) {
        return next(error)
    }
})

// Edit Lang detail
router.patch('/:lang_name', async(req, res, next) => {
    try {
        let lang = await Language.update(req.params.lang_name, req.body)
        return res.json({lang})
    } catch (error) {
        return next(error)
    }
    
})

// Create Lang if admin
router.post('/', async(req, res, next) => {
    try {
        const lang = await Language.create(req.body)
        return res.status(201).json({lang})
    } catch (error) {
        return next(error)
    }
})

// Delete lang if admin
router.delete('/:lang_name', async(req, res, next) => {
    try {
        await Language.delete(req.params.lang_name)
        return res.json({message: 'Language Deleted'})
    } catch (error) {
        return next(error)
    }
})

module.exports = router