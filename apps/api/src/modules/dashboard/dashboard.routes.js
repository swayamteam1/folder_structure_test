const express = require('express');
const router = express.Router();
const controller = require('./dashboard.controller');
const { authenticate } = require('../../middleware/authMiddleware');

router.get('/stats', authenticate, controller.getStats);

module.exports = router;
