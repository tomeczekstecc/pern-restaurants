require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

app.get('/api/v1/restaurants', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'These are restaurants',
    data: { restaurants: ['wendys', 'mcdonalds'] },
  });
});

app.get('/api/v1/restaurants/:id', (req, res) => {
  return res.status(200).send(req.params);
});
app.post('/api/v1/restaurants', (req, res) => {
res.json({message:"success",data:req.body})
});



const PORT = process.env.PORT || 3005;

app.listen(PORT, () =>
  console.log(`Server is up and listening on port ${PORT}`)
);
