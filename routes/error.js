const errorRouter = require('express').Router();

// import controllers
const errorPage = require('../controllers/errorPage');

errorRouter.get('/', errorPage);

module.exports = errorRouter;
