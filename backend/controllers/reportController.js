const Congee = require('../models/Congee');
const Horairee = require('../models/Horairee');
const Evaluation = require('../models/Evaluation');
const { Op } = require('sequelize');


const sequelize = require('sequelize');

const User = require('../models/User');



exports.getReportByUserId = async (req, res) => {
  try {
      
      const userId = req.params.id;
      
      console.log(userId)
    const conges = await Congee.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('id')), 'totalConges'], 
          [sequelize.fn('SUM', sequelize.col('nbJour')), 'totalDays'] 
        ],
        where: { userId: userId }, 
        group: ['userId']
      });

      console.log(conges)

      const heures = await Horairee.findAll({
        attributes: [
          [sequelize.fn('SUM', sequelize.fn('TIMESTAMPDIFF', sequelize.literal('SECOND'), sequelize.col('startTime'), sequelize.col('endTime'))), 'totalSeconds']
        ],
        where: { userId: userId } 
      });

      // Convert total seconds to hours (optional)
    if (heures[0] && heures[0].dataValues.totalSeconds) {
        heures[0].dataValues.totalHours = heures[0].dataValues.totalSeconds / 3600;
      }

      console.log(heures)


      const evaluations = await Evaluation.findAll({
        attributes: [
          'year', 
          [sequelize.fn('AVG', sequelize.col('rate')), 'averageRate']
        ],
        where: { userId: userId },
        group: ['userId', 'year'] 
      });

      console.log(evaluations)

    


    res.status(200).send({conges,heures,evaluations});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


