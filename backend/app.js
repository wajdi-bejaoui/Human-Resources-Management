require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const sequelize = require('./config/db');
const passport = require('passport');
const User = require('./models/User');
const Congee = require('./models/Congee');
require('./config/passport')(passport); // Import Passport configuration


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize Passport middleware
app.use(passport.initialize());

app.use('/uploads', express.static('uploads'));



// Sync models in the correct order
const syncDatabase = async () => {
  try {
    // Drop the Congee table first
    await sequelize.query("DROP TABLE IF EXISTS `congees`");
    // Then drop the User table
    await sequelize.query("DROP TABLE IF EXISTS `users`");
    // First sync User model
    await User.sync({ force: true }); // Adjust if you want to keep data
    // Then sync Congee model
    await Congee.sync({ force: true }); // Adjust if you want to keep data
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};
syncDatabase(); // Call the sync function


const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const congeeRoutes = require('./routes/congeeRoutes');
const employeeRoutes = require('./routes/employeeRoutes');



// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/congees', congeeRoutes);
app.use('/api/employees', employeeRoutes);


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
