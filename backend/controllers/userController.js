const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');


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
      return res.status(200).send({ users : [], message: 'No users found with the specified role' });
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
