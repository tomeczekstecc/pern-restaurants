const express = require('express');
const router = express.Router();

const { addReview, deleteReview } = require('../controllers/reviews');

router.route('/:id/addReview').post(addReview);
router.route('/deleteReview/:id').delete(deleteReview);

module.exports = router;
