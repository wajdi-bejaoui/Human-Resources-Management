const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

exports.addEmployee = async (req, res) => {
  try {
    const user = req.user;  // The authenticated user from the middleware

    // Ensure only "rh" role can add an employee
    if (user.role !== 'rh') {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unauthorized' });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email already exists' });
    }

    console.log(req.body)

    // Create a new employee record
    const newEmployee = await User.create({
      email: req.body.email,
      password: req.body.password,  // Ensure password is hashed
      fullname: req.body.fullname,
      role: 'employee',
      imageUrl: req.file ? `/uploads/images/${req.file.filename}` : null  // Store image path if uploaded
    });

    res.status(StatusCodes.CREATED).json({ message: 'Employee added successfully', employee: newEmployee });
  } catch (error) {
    console.error('Error during employee registration:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};
