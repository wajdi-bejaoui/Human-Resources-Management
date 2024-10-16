const Horaire = require('../models/Horairee');
const User = require('../models/User'); // Assuming User model contains the role information
const Sequelize = require('sequelize');

const { Op } = require('sequelize'); 




// Create a new horaire (employer submits working hours)
exports.createHoraire = async (req, res) => {
  try {
    const horaireData = req.body;
    horaireData.userId = req.user.id
    const horaire = await Horaire.create(horaireData);
    res.status(201).send({ message: 'Horaire added...', horaire });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getMyHoraires = async (req, res) => {
  try {
    // Extract filter parameters from the request query
    const { month } = req.query;

    console.log("query",req.query)

     // Initialize where clause for filtering
     let whereClause = { userId: req.user.id }; // Start with the userId filter

     // Add month filter if provided
     if (month) {
      whereClause.date = {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), month),
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), new Date().getFullYear()), // Optionally filter by current year
        ],
      };
    }
 
     const horaires = await Horaire.findAll({ where: whereClause });
    res.status(200).send(horaires);
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message });
  }
};

// Get all horaires for a specific user (e.g., employer's horaires)
exports.getHorairesByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const horaires = await Horaire.findAll({ where: { userId } });
    res.status(200).send(horaires);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Confirm a specific horaire (RH confirms the working hours)
exports.confirmHoraire = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Horaire.update({ status: 'confirmed' }, {
      where: { id },
    });

    if (updated) {
      const updatedHoraire = await Horaire.findByPk(id);
      res.status(200).send({ message: 'Horaire confirmed...', horaire: updatedHoraire });
    } else {
      res.status(404).send({ message: 'Horaire not found' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Reject a specific horaire (RH rejects the working hours)
exports.rejectHoraire = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Horaire.update({ status: 'rejected' }, {
      where: { id },
    });

    if (updated) {
      const updatedHoraire = await Horaire.findByPk(id);
      res.status(200).send({ message: 'Horaire rejected...', horaire: updatedHoraire });
    } else {
      res.status(404).send({ message: 'Horaire not found' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all horaires (for RH to see all working hours submitted by users)
exports.getAllHoraires = async (req, res) => {
  try {
    const horaires = await Horaire.findAll({
      include: [{
        model: User,
        attributes: ['fullname', 'email'], // Include only the fields you need
        // required: true, // Ensures only evaluations with associated users are returned
      }]
    });
    res.status(200).send(horaires);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};