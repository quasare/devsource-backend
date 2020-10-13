
const express = require("express");
const router = express.Router();

const { ensureCorrectUser, authRequired, adminRequired } = require("../middleware/auth");

const Comments = require("../models/comment");
const { validate } = require("jsonschema");

const {  } = require("../schemas");


/** Resource Routes */

// Get comments for user
// Get comments for resource
// Get comments for lang
// Add comment for lang need user
// Add comment for resource need user
// Delete comment for lang need user
// Delete comment for resource need user