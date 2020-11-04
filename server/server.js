require('dotenv').config();
const morgan = require('morgan');
const db = require('./db');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM restaurants');

    return res.status(200).json({
      status: 'success',
      message: 'These are restaurants',
      count: results.rowCount,
      data: results.rows,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'failed - 500', error: error.message });
  }
});

app.get('/api/v1/restaurants/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const results = await db.query(
      // narażone na sql injection
      // `SELECT * FROM restaurants WHERE id = ${id}`
      `SELECT * FROM restaurants WHERE id = $1`,
      [id]
    );
    if (results.rowCount === 0) {
      throw Error(
        "The query finished with no results - change query's parameters!"
      );
    }

    return res.status(200).json({
      status: 'success',
      message: 'These is the restaurant',
      count: results.rowCount,
      data: results.rows[0],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'failed - 500', error: error.message });
  }
});

//create
app.post('/api/v1/restaurants', async (req, res) => {
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
});

//edit
app.put('/api/v1/restaurants/:id', async (req, res) => {
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
});

//delete
app.delete('/api/v1/restaurants/:id', async (req, res) => {
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
});

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server is up and listening on port ${PORT}`)
);
