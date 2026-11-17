const express = require('express');
const router = express.Router();
const controller = require('./users.controller');
const { authenticate, authorizeRole } = require('../../middleware/authMiddleware');

router.get('/', authenticate, controller.getAll);
router.get('/:id', authenticate, controller.getById);
router.put('/:id', authenticate, authorizeRole('admin'), controller.update);
router.delete('/:id', authenticate, authorizeRole('admin'), controller.remove);

module.exports = router;
