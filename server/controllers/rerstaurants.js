const db = require('../db')

exports.getAllRestaurants =
  // '/api/v1/restaurants',
  async (req, res) => {
    try {
      // const results = await db.query('SELECT * FROM restaurants');
      const restaurantRatingData = await db.query(`
        select r.*, trunc(avg(rating),2) as rating_avg, count(v.id) as ratings_nr
        from restaurants r
        left join reviews v on v.restaurant_id = r.id
        group by r.id;
`);
      return res.status(200).json({
        status: 'success',
        message: 'These are restaurants',
        count: restaurantRatingData.rowCount,
        data: restaurantRatingData.rows,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 'failed - 500', error: error.message });
    }
  };

exports.getOneRestaurant =
  // '/api/v1/restaurants/:id',
  async (req, res) => {
    const { id } = req.params;
    try {
      const restaurant = await db.query(
        // narażone na sql injection
        // `SELECT * FROM restaurants WHERE id = ${id}`
        `select r.*, trunc(avg(rating),2) as rating_avg, count(v.id) as ratings_nr
        from restaurants r
        left join reviews v on v.restaurant_id = r.id
        where r. id = $1
        group by r.id;`,
        [id]
      );
      const reviews = await db.query(
        // narażone na sql injection
        // `SELECT * FROM restaurants WHERE id = ${id}`
        `SELECT * FROM reviews WHERE restaurant_id = $1`,
        [id]
      );

      return res.status(200).json({
        status: 'success',
        message: 'These is the restaurant',
        // count: results.rowCount,
        data: { restaurant: restaurant.rows[0], reviews: reviews.rows },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 'failed - 500', error: error.message });
    }
  }


//create
exports.createRestaurant=
  // '/api/v1/restaurants',
  async (req, res) => {
    const { name, location, price_range } = req.body;
    try {
      const results = await db.query(
        `INSERT INTO restaurants (name,location,price_range)
            VALUES ($1, $2, $3) returning *
      `,
        [name, location, price_range]
      );
      return res.status(201).json({
        message: 'success',
        new_entries: results.rowCount,
        data: results.rows,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 'failed - 500', error: error.message });
    }
  }


//edit
exports.updateRestaurant=
  // '/api/v1/restaurants/:id',
  async (req, res) => {
    const { id } = req.params;
    const { name, location, price_range } = req.body;

    try {
      const results = await db.query(
        `UPDATE restaurants SET name =$1, location = $2, price_range = $3 WHERE id = $4 returning *;`,
        [name, location, price_range, id]
      );

      return res.status(200).json({
        status: 'success',
        count: results.rowCount,
        data: results.rows[0],
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 'failed - 500', error: error.message });
    }
  }


//delete
exports.deleteRestaurant=
  // '/api/v1/restaurants/:id',
  async (req, res) => {
    const { id } = req.params;
    try {
      const results = await db.query(
        `
DELETE
FROM
  restaurants
WHERE
 id = $1 returning *;
  `,
        [id]
      );

      return res.status(200).json({
        status: 'success',
        count: results.rowCount,
        data: results.rows,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 'failed - 500', error: error.message });
    }
  }

