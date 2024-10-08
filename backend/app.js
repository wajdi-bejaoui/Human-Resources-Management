require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const sequelize = require('./config/db');
const passport = require('passport');
require('./config/passport')(passport); // Import Passport configuration


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize Passport middleware
app.use(passport.initialize());

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const congeeRoutes = require('./routes/congeeRoutes');
const horaireRoutes = require('./routes/HoraireRoutes');  // Import horaire routes
const evaluationRoutes = require('./routes/EvaluationRoutes');  // Import horaire routes



// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/congees', congeeRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/horaire', horaireRoutes);


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
