const db = require('../db');
exports.addReview =
  //  '/api/v1/restaurants/:id/addReview',
  async (req, res) => {
    const { id } = req.params;
    const { review, name, rating } = req.body;
    try {
      const results = await db.query(
        `INSERT INTO reviews (restaurant_id, name, review,rating) values ($1, $2, $3 ,$4) returning *`,
        [id, name, review, rating]
      );
      return res.status(201).json({
        status: 'success',
        count: results.rowCount,
        data: results.rows[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

exports.deleteReview =
  //  '/api/v1/restaurants/deleteReview/:v_id',
  async (req, res) => {
    const { id } = req.params;
    try {
      const results = await db.query(
        `DELETE from reviews where id = $1 returning *`,
        [id]
      );
      return res.status(201).json({
        status: 'success',
        count: results.rowCount,
        data: results.rows[0],
      });
    } catch (error) {
      console.log(error);
    }
  };
