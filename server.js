const express = require("express");
const cors = require("cors");

const apiRouter = require('./src/api');

const app = express()
const PORT = 3000;

// Allows put/post requests to be parsed to objects/strings respectively
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allows request from website to be made to other website
app.use(cors());

// Defining router for api
app.use('/api', apiRouter);

// Local error handler
app.use((req, res) => res.status(404).send('This page does not exist.'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;