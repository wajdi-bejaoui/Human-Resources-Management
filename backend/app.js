require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const sequelize = require('./config/db');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');


// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

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
