const express = require('express');
const controller = require('./comics');

const router = express.Router();

router.get('/', controller.get);

module.exports = router;
