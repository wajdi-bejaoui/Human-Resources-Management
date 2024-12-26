const Congee = require('../models/Congee');
const User = require('../models/User');


exports.createCongee = async (req, res) => {
  try {
    const congeeData = req.body;
    // Calculate the number of days
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(congeeData.debut);
    const secondDate = new Date(congeeData.fin);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay)) + 1; // Add 1 to include both start and end dates
    console.log(congeeData.diffDays)
    console.log("congeedata",congeeData)


    congeeData.nbJour =diffDays

    // Create the congee record
    // const congee = await Congee.create({ 
    //   ...congeeData, 
    //   nbJour: diffDays 
    // });
    console.log(congeeData.nbJour)
    const congee = await Congee.create(congeeData);
    res.status(201).send({ message: 'Congee added...', congee });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.addMyCongee = async (req, res) => {
  try {

    const user = req.user;
    const congeeData = req.body;
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(congeeData.debut);
    const secondDate = new Date(congeeData.fin);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay)) + 1; // Add 1 to include both start and end dates
    console.log(congeeData.diffDays)
    console.log("congeedata",congeeData)


    congeeData.nbJour =diffDays
    congeeData.userId = user.id;
    congeeData.status = "pending";
    const congee = await Congee.create(congeeData);
    res.status(201).send({ message: 'Congee added...', congee });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getMyCongees = async (req, res) => {
  try {
    const userId = req.user.id; // Get the logged-in user's ID
    const congees = await Congee.findAll({ where: { userId } }); // Find congees that belong to the user
    if (!congees) {
      res.status(404).send({ message: 'Congee not found' });
    } else {
      res.status(200).send(congees);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getCongees = async (req, res) => {
  try {

    // Extract filter parameters from the request query
    const { status, typeCongee, startDate, endDate } = req.query;

    console.log("query",req.query)

    // Initialize where clause for filtering
    let whereClause = {};

    // Add filters dynamically based on provided query parameters
    if (status) {
      whereClause.status = status;
    }

    if (typeCongee) {
      whereClause.typeCongee = typeCongee;
    }

    // Optional: Add date range filtering for 'debut' (start date)
    if (startDate && endDate) {
      whereClause.debut = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }


    const congees = await Congee.findAll({
      where: whereClause, // Apply filters
      include: [{
        model: User,
        attributes: ['fullname', 'email'], // Include only the fields you need
        // required: true, // Ensures only congees with associated users are returned
      }]
    });

    
    // Format the response to include user info with each congee
    const response = congees.map(congee => ({
      id: congee.id,
      debut: congee.debut,
      fin: congee.fin,
      typeCongee: congee.typeCongee,
      nbJour: congee.nbJour,
      file: congee.file,
      status: congee.status,
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

exports.acceptCongee = async (req, res) => {
  try {
    const id = req.params.id;
    const congee = {status : "approved"};

    const [updated] = await Congee.update(congee, {
      where: { id: id }
    });
    if (updated) {
      const updatedCongee = await Congee.findByPk(id);
      res.status(200).send({ message: 'Congee approved...', congee: updatedCongee });
    } else {
      res.status(404).send({ message: 'Congee not found' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.refuseCongee = async (req, res) => {
  try {
    const id = req.params.id;
    const congee = {status : "refused"};

    const [updated] = await Congee.update(congee, {
      where: { id: id }
    });
    if (updated) {
      const updatedCongee = await Congee.findByPk(id);
      res.status(200).send({ message: 'Congee accepted...', congee: updatedCongee });
    } else {
      res.status(404).send({ message: 'Congee not found' });
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

exports.deleteMyCongee = async (req, res) => {
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
