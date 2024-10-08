const User = require('../models/User');
const transporter = require('../config/mailer');    // Adjust the path if necessary


exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await User.create(userData);
    res.status(201).send({ message: 'User added...', user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUsersByRole = async (req, res) => {
  try {
    console.log("here", req.params.role)
    const role = req.params.role;
    const users = await User.findAll({ where: { role } });

    if (users.length === 0) {
      return res.status(404).send({ message: 'No users found with the specified role' });
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await User.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.status(200).send({ message: 'User updated...', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await User.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).send({ message: 'User deleted...' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};



// RH create a employer  
// Function to generate a random password

const generateRandomPassword = (length) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

exports.createUserbyRH = async (req, res) => {
  try {
    const userData = req.body;
    const password = generateRandomPassword(12); // Generate a random password
    userData.password = password; // Assign the generated password to user data

    const user = await User.create(userData);

    // Send email with the user's credentials
    const mailOptions = {
      from: process.env.EMAIL_USER, // Use the loaded environment variable
      to: userData.email,
      subject: 'Your Account Credentials',
      text: `Hello ${userData.name},\n\nYour account has been created.\n\nEmail: ${userData.email}\nPassword: ${password}\n\nPlease change your password after logging in.\n\nBest regards,\nYour HR Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send({ message: 'User created, but failed to send email.' });
      }
      res.status(201).send({ message: 'User added...', user });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};