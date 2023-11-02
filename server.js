const express = require('express');
const db = require('./config/connection'); // Import your database connection
const routes = require('./routes'); // Import your defined routes

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Social Media API server is running on port ${PORT}`);
  });
});
