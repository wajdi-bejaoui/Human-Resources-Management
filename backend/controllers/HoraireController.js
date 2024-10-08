const Horaire = require('../models/Horairee');
const User = require('../models/User'); // Assuming User model contains the role information





// Create a new horaire (employer submits working hours)
exports.createHoraire = async (req, res) => {
  try {
    const horaireData = req.body;
    const horaire = await Horaire.create(horaireData);
    res.status(201).send({ message: 'Horaire added...', horaire });
  } catch (err) {
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
    const horaires = await Horaire.findAll();
    res.status(200).send(horaires);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};