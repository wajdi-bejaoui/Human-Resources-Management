require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const sequelize = require('./config/db');
const passport = require('passport');
const User = require('./models/User');
const Congee = require('./models/Congee');
const Evaluation = require('./models/Evaluation');
const Horaire = require('./models/Horairee');


require('./config/passport')(passport); // Import Passport configuration


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize Passport middleware
app.use(passport.initialize());

app.use('/uploads', express.static('uploads'));

// Define associations
const defineAssociations = () => {
// Horaire belongs to a User
Horaire.belongsTo(User, {
  foreignKey: 'userId', // Foreign key in the Horaire table
  targetKey: 'id',      // Primary key in the User table
});

  // Congee belongs to a User
  Congee.belongsTo(User, {
    foreignKey: 'userId', // Foreign key in the Congee table
    targetKey: 'id',      // Primary key in the User table
  });

    // Evaluation belongs to a User
  Evaluation.belongsTo(User, {
    foreignKey: 'userId', // Foreign key in the Evaluation table
    targetKey: 'id',      // Primary key in the User table
  });

  // User has many Horaire
  User.hasMany(Horaire, {
    foreignKey: 'userId', // Foreign key in the Horaire table
    sourceKey: 'id',      // Primary key in the User table
  });

  // User has many Congees
  User.hasMany(Congee, {
    foreignKey: 'userId', // Foreign key in the Congee table
    sourceKey: 'id',      // Primary key in the User table
  });

  // User has many Evaluation
  User.hasMany(Evaluation, {
    foreignKey: 'userId', // Foreign key in the Evaluation table
    sourceKey: 'id',      // Primary key in the User table
  });
};

// Call the function to define associations
defineAssociations();

sequelize.sync({ alter: true })
  .then(() => console.log('Database synchronized'))
  .catch(err => console.log('Error synchronizing the database', err));

// // Sync models in the correct order
// const syncDatabase = async () => {
//   try {
//     // Drop the Congee table first
//     // await sequelize.query("DROP TABLE IF EXISTS `congees`");
//     // Then drop the User table
//     // await sequelize.query("DROP TABLE IF EXISTS `users`");
//     // First sync User model
//     await User.sync(); // Adjust if you want to keep data
//     // Then sync Congee model
//     await Congee.sync(); // Adjust if you want to keep data
//     // model.sync({ force: true }): This creates the table by dropping it if the same table exists already.
//     console.log('Database & tables created!');
//   } catch (error) {
//     console.error('Error syncing database:', error);
//   }
// };
// syncDatabase(); // Call the sync function


const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const congeeRoutes = require('./routes/congeeRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const horaireRoutes = require('./routes/HoraireRoutes');  // Import horaire routes
const evaluationRoutes = require('./routes/EvaluationRoutes');  // Import horaire routes



// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/congees', congeeRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/horaires', horaireRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Sync database and start server
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
