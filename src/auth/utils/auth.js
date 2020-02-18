const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });

const generateRefreshToken = (user) => jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5d' });

const checkForExistingUsers = (users, username) => {
  if (users.length) {
    const error = new Error();
    if (users.length === 2) {
      error.message = 'username and email used';
    } else if (users[0].username === username) {
      error.message = 'username taken';
    } else {
      error.message = 'email is already in use';
    }
    return error;
  }
  return undefined;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  checkForExistingUsers,
};
