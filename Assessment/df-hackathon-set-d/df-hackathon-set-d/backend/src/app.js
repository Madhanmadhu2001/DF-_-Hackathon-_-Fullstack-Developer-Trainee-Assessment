const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');
const { User, Item } = require('./models');

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('DB connected and synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to DB:', err);
  }
})();
