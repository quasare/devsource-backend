const express = require("express");
const router = express.Router({mergeParams: true});

const { ensureCorrectUser, authRequired } = require("../middleware/auth");

const Resource = require("../models/resource");
const { validate } = require("jsonschema");

// Get all resouces for lang
router.get('/', async (req, res, next) => {
    let lang = req.params.lang_name
    try {
        console.log('ping', lang);
        let resource = await Resource.getResourcebyLang(lang)
        return res.json({resource})
    } catch (error) {
        return next(error)
    }
})

/** Resource Routes */


// Get one per lang
// Edit resourc detail if admin
// Create resourc if admin
// Delete resourc if admin

module.exports = router;