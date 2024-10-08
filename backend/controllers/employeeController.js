const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');


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


exports.getEmployeeById = async (req, res) => {
    try {
      const id = req.params.id;
      const employee = await User.findByPk(id);
      if (!employee) {
        res.status(404).send({ message: 'Employee not found' });
      } else {
        res.status(200).send(employee);
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };


exports.updateEmployee = async (req, res) => {
    try {
        console.log("in update")
      const id = req.params.id;
      console.log("id"+id)
      console.log("body",req.body)
      const employee = await User.findByPk(id);

      if (!employee) {
        console.log("employee dont  exist")
        res.status(404).send({ message: 'Employee not found' });
      }

      // Check if the password is being updated
    if (req.body.password) {
        const saltRounds = 10;
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      }

      const [updated] = await User.update(req.body, {
        where: { id: id }
      });
      console.log(updated)
      if (updated) {
        const updatedEmployee = await User.findByPk(id);
        res.status(200).send({ message: 'Employee updated...', user: updatedEmployee });
      } else {
        res.status(StatusCodes.BAD_REQUEST).send({ message: 'try again ...' });


      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  
  exports.deleteEmployee = async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await User.destroy({
        where: { id: id }
      });
      if (deleted) {
        res.status(200).send({ message: 'Employee deleted...' });
      } else {
        res.status(404).send({ message: 'Employee not found' });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  
