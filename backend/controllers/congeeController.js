const Congee = require('../models/Congee');
const User = require('../models/User');


exports.createCongee = async (req, res) => {
  try {
    const congeeData = req.body;
    const congee = await Congee.create(congeeData);
    res.status(201).send({ message: 'Congee added...', congee });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getCongees = async (req, res) => {
  try {
    // First, create a test user
// const user = await User.create({
//   fullname: 'John Doe',
//   email: 'john.doe@example.com',
//   password :'123',
//   role:'RH'
// });

// // Now, create a congee record and associate it with the user
// await Congee.create({
//   debut: '2024-01-01',
//   fin: '2024-01-10',
//   typeCongee: 'Paid Leave',
//   nbJour: 10,
//   userId: user.id // Associate this congee with the created user
// });
    const congees = await Congee.findAll({
      include: [{
        model: User,
        attributes: ['fullname', 'email'], // Include only the fields you need
        // required: true, // Ensures only congees with associated users are returned

      }]
    });

    console.log(JSON.stringify(congees, null, 2)); // Check if User data is included

    
    // Format the response to include user info with each congee
    const response = congees.map(congee => ({
      id: congee.id,
      debut: congee.debut,
      fin: congee.fin,
      typeCongee: congee.typeCongee,
      nbJour: congee.nbJour,
      user: {
        fullname: congee.User.fullname, // Assuming your user model has a fullname
        email: congee.User.email,
      }
    }));

    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getCongeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const congee = await Congee.findByPk(id);
    if (!congee) {
      res.status(404).send({ message: 'Congee not found' });
    } else {
      res.status(200).send(congee);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateCongee = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Congee.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedCongee = await Congee.findByPk(id);
      res.status(200).send({ message: 'Congee updated...', congee: updatedCongee });
    } else {
      res.status(404).send({ message: 'Congee not found' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteCongee = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Congee.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).send({ message: 'Congee deleted...' });
    } else {
      res.status(404).send({ message: 'Congee not found' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
