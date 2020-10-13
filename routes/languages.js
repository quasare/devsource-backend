/** Routes for technologies */

const express = require("express");
const router = express.Router();

const { ensureCorrectUser, authRequired, adminRequired } = require("../middleware/auth");

const Language = require("../models/language");
const { validate } = require("jsonschema");

const {  } = require("../schemas");

/** Language Routes */

// Get all lang
// Get one lang
// Edit Lang detail
// Create Lang if admin
// Delete lang if admin