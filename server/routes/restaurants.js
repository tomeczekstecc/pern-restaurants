const express = require('express');
const router = express.Router();

const {
  getAllRestaurants,
  getOneRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require('../controllers/rerstaurants');


router.route('/').get(getAllRestaurants);
router.route('/:id').get(getOneRestaurant);
router.route('/').post(createRestaurant);
router.route('/:id').put(updateRestaurant);
router.route('/:id').delete(deleteRestaurant);

module.exports = router;
