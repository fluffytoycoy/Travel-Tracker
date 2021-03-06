const jwt = require('jsonwebtoken');

// Middleware to handle requests for non-existant routes
const notFound = (req, res, next) => {
  const error = new Error("This isn't a route dummy");
  res.status(404);
  next(error);
};

// Middleware to handle status code errors
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const err = { error: { error, message: error.message } };
  res.status(statusCode).json(err);
};


// Middleware to handle authChecking
const auth = async (req, res, next) => {
  // Store the Tokens
  const test = req.url;
  console.log(test)
  console.log(req.headers['access-token'])
  const accessToken = req.headers['access-token'] && req.headers['access-token'].split(' ')[1];
  console.log(accessToken, 'token')
  console.log(req.body.username)
  // If either are null not logged in
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      res.status(401);
      return next(new Error('Not logged In'));
    }
    req.body.user_id = user.id;
    return next();
  });
};

module.exports = {
  notFound,
  errorHandler,
  auth,
};
