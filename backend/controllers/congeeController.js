const Congee = require('../models/Congee');

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
    const congees = await Congee.findAll();
    res.status(200).send(congees);
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
