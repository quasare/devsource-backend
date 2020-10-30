/** Express app for jobly. */


const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// add logging system

const morgan = require("morgan");
app.use(morgan("tiny"));


const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const langRoutes = require("./routes/languages")
const resourceRoutes = require("./routes/resources")
const CommentRoutes = require('./routes/comments')
const likeRoutes = require('./routes/likes')
const userLangRoutes = require('./routes/user_languages')



app.use("/lang", langRoutes);
app.use("/users", usersRoutes);
app.use("/", authRoutes);
app.use('/resources', resourceRoutes)
app.use('/comments', CommentRoutes)
app.use('/likes', likeRoutes)
app.use('/:username/language', userLangRoutes)

/** 404 handler */

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  if (err.stack) console.log(err.stack);

  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;
