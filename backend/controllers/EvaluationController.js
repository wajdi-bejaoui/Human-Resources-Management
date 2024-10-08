const Evaluation = require('../models/Evaluation');
const User = require('../models/User'); // Assuming User model contains the role information

exports.createEvaluation = async (req, res) => {
  try {
    const { role } = req.user; // Assuming req.user contains authenticated user's data
    if (role !== 'RH') {
      return res.status(403).send({ message: 'Only RH can evaluate users.' });
    }

    const evaluationData = req.body;
    const evaluation = await Evaluation.create(evaluationData);
    res.status(201).send({ message: 'Evaluation created...', evaluation });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll();
    res.status(200).send(evaluations);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getEvaluationById = async (req, res) => {
  try {
    const id = req.params.id;
    const evaluation = await Evaluation.findByPk(id);
    if (!evaluation) {
      res.status(404).send({ message: 'Evaluation not found' });
    } else {
      res.status(200).send(evaluation);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateEvaluation = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Evaluation.update(req.body, { where: { id } });
    if (updated) {
      const updatedEvaluation = await Evaluation.findByPk(id);
      res.status(200).send({ message: 'Evaluation updated...', evaluation: updatedEvaluation });
    } else {
      res.status(404).send({ message: 'Evaluation not found' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteEvaluation = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Evaluation.destroy({ where: { id } });
    if (deleted) {
      res.status(200).send({ message: 'Evaluation deleted...' });
    } else {
      res.status(404).send({ message: 'Evaluation not found' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
