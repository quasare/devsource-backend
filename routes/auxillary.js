const express = require("express");
const router = express.Router();
const { ensureCorrectUser, authRequired } = require("../middleware/auth");
const {joke} = require('../external_apis/Jokes')
const {gh} = require('../external_apis/language')
const {quote} = require('../external_apis/quotes')
const {vid} = require('../external_apis/video')



// Joke api route
router.get('/joke', async (req, res, next) => {
    try {
        let result = await joke()
        return res.json({joke: result})
    } catch (error) {
        return next(error)
    }
})

// Quote api route
router.get('/quote', async (req, res, next) => {
    try {
        let result = await quote()
        return res.json({ result})
    } catch (error) {
        return next(error)
    }
})

// Vid api route
router.get('/vid/:lang', async (req, res, next) => {
    try {
        let vids = await vid(req.params.lang)
        return res.json({vids})
    } catch (error) {
        return next(error)
    }
})

// Gh api route
router.get('/gh/:lang', async (req, res, next) => {
    try {
        let lang = await gh(req.params.lang)
        return res.json({lang})
    } catch (error) {
        return next(error)
    }
})

module.exports = router;