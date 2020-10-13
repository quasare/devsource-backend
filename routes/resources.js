const express = require("express");
const router = express.Router();

const { ensureCorrectUser, authRequired } = require("../middleware/auth");

const Resource = require("../models/resource");
const { validate } = require("jsonschema");


router.get

/** Resource Routes */

// Get all resouces for lang
// Get one per lang
// Edit resourc detail if admin
// Create resourc if admin
// Delete resourc if admin