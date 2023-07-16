const jwt = require('jsonwebtoken');

// Function to generate a refresh token
function generateRefreshToken(payload) {
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
  return refreshToken;
}

// Function to generate an access token
function generateAccessToken(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACESS_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
  return accessToken;
}

module.exports = {
  generateRefreshToken,
  generateAccessToken
};