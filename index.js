const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

const fs = require('fs');
const mysql = require('mysql');

const json = fs.readFileSync('credentials.json', 'utf8');
const credentials = JSON.parse(json);

const connection = mysql.createConnection(credentials);
connection.connect((error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});

connection.end();

app.listen(port, () => {
  console.log(`We're live on port ${port}!`);
});

let carNextId = 1;
const cars = {
  [carNextId]: {
    mpgId: carNextId++,
    miles_pg: 30,
    gallons: 13,
    car: 'Honda Civic',
  },
  [carNextId]: {
    mpgId: carNextId++,
    miles_pg: 15,
    gallons: 18,
    car: 'Ford Mustang',
  },
};

app.post('/cars', (req, resp) => {
  const { mpgId, miles_pg, gallons, car } = req.body;
  humans[humanNextId] = {
    mpgId: mpgId,
    miles_pg: miles_pg,
    gallons: gallons,
    car: car,
  };
  resp.json({
    ok: true,
    result: cars[carNextId++],
  });
});

app.get('/cars/:id', (req, resp) => {
  resp.json(cars[req.params.id]);
});

//DELETE
app.delete('/cars/:miles_pg', (request, response) => {
  const parameter = request.params.miles_pg;

  const query = 'DELETE FROM mpg WHERE miles_pg = ?';
  connection.query(query, parameter, (error, result) => {
    if (error) {
      console.log('Delete Error');
      response.status(404);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      response.json({
        ok: true,
      });
    }
  });
});

app.post('/car', (request, response) => {
  const parameters = [
    request.body.mpgId,
    request.body.miles_pg,
    request.body.gallons,
    request.body.car,
  ];

  const query =
    'INSERT INTO mpg(mpgId, miles_pg, gallons, car) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, parameters, (error, result) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      response.json({
        ok: true,
        results: 'Complete',
      });
    }
  });
});
