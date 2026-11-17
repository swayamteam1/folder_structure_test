const express = require('express');
const router = express.Router();
const controller = require('./permissions.controller');
const { authenticate } = require('../../middleware/authMiddleware');

router.get('/', authenticate, controller.getAll);

module.exports = router;
