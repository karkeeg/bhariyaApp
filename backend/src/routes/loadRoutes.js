const express = require('express');
const router = express.Router();
const loadController = require('../controllers/loadController');

router.get('/', loadController.getLoads);
router.patch('/:id/accept', loadController.acceptLoad);

module.exports = router;
