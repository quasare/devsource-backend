/** Routes for technologies */

const express = require("express");
const router = express.Router();

const { ensureCorrectUser, authRequired, adminRequired } = require("../middleware/auth");

const User = require("../models/languages");
const { validate } = require("jsonschema");

const {  } = require("../schemas");