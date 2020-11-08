require('dotenv').config()
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1/restaurants', require('./routes/restaurants'));
app.use('/api/v1/restaurants', require('./routes/reviews'));

app.use(morgan('dev'));

console.log(process.env.PGHOST);
console.log(process.env.NODE_ENV);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Server is up and listening on port ${PORT}`)
);
