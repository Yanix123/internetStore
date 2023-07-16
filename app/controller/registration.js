// controller.js
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const validator = require('email-validator');
const uuid = require('uuid');
const { sendConfirmationEmail } = require('../service/emailSendler');
const saltRounds = 10;

async function registrateUser(req, res, next) {
  try {
    const { userFirstName, userSecondName, userPassword, userEmail } = req.body;

    // Validate requests
    if (!userFirstName || !userSecondName || !userPassword || !userEmail) {
      return res.status(500).send({ message: 'Please provide all user data' });
    }

    // Check if user exists
    const user = await userModel.findOne({ email: userEmail }).select({ email: 1 });
    if (user) {
      return res.status(305).send({ message: 'User with this email has already been created' });
    }

    // Validate user email
    const isValidEmail = validator.validate(userEmail);
    if (!isValidEmail) {
      return res.status(404).send({ message: 'Please provide a valid email' });
    }

    // Generate confirmation token
    const confirmationToken = uuid.v4();

    // Send confirmation email to the user
    sendConfirmationEmail(userEmail, confirmationToken);

    // Hash user password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedUserPass = await bcrypt.hash(userPassword, salt);

    // Save user to the database
    const newUser = await userModel.create({
      firstName: userFirstName,
      secondName: userSecondName,
      email: userEmail,
      password: hashedUserPass,
      confirmationToken: confirmationToken
    });

    return res.status(200).send({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}

module.exports = {
  registrateUser
};

async function confirmUserEmail(req, res) {
  try {
    const { token } = req.query;

    // Find the user based on the token in the database
    const user = await userModel.findOne({ confirmationToken: token });

    // If the user doesn't exist or the token is invalid, handle the appropriate response
    if (!user) {
      return res.status(404).send({ message: 'Invalid confirmation token' });
    }

    // Update the user's email confirmation status or perform other necessary actions
    user.isActivated = true;
    user.confirmationToken = undefined; // Clear the confirmation token
    await user.save();

    return res.status(200).send({ message: 'Email confirmed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}

module.exports = {
  registrateUser,
  confirmUserEmail,
};