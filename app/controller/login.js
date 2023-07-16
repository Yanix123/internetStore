const userModel = require('../models/userModel');
const { generateAccessToken, generateRefreshToken } = require('../service/generateTokens');
const bcrypt = require('bcrypt');

async function loginUser(req, res, next) {
    try {
      const { userEmail, userPassword } = req.body;
      
      // Check user requests
      if (!userEmail || !userPassword) {
        return res.status(405).send({ message: "Please provide valid user data" });
      }
      
      // Validate user in the database
      const searchedUser = await userModel.findOne({ email: userEmail }).select({ email: 1, password: 1, _id: 1, refreshToken:1}).lean();
      if (!searchedUser) {
        return res.status(406).send({ message: "Invalid email or password" });
      }
      
      // Compare passwords
      const isPasswordMatched = await bcrypt.compare(userPassword, searchedUser.password);
      if (!isPasswordMatched) {
        return res.status(407).send({ message: "Invalid email or password" });
      }
  
      // Store user ID in session
      req.session.userId = searchedUser._id;
  
      // Generate tokens
      const payload = {
        userId: searchedUser._id,
      };
      
      const refreshToken = generateRefreshToken(payload);
      const accessToken = generateAccessToken(payload);
  
      // Store the tokens in cookies
      req.session.accessToken = accessToken;
      req.session.refreshToken = refreshToken;
  
      return res.status(200).json({ accessToken, refreshToken });
      
    } catch (error) {
      return res.status(500).send({ message: error.message || "Internal server error" });
    }
  }
  

module.exports = {
  loginUser
};