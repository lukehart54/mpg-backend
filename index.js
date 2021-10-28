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

function rowToMemory(row) {
  return {
    mpgId: row.mpgId,
    miles_pg: row.miles_pg,
    gallons: row.gallons,
    miles: row.miles,
    car: row.car,
  };
}

app.listen(port, () => {
  console.log(`We're live on port ${port}!`);
});

// let carNextId = 1;
// const mpg = {
//   [carNextId]: {
//     mpgId: carNextId++,
//     miles_pg: 30,
//     gallons: 13,
//     miles: 200,
//     car: 'Honda Civic',
//   },
//   [carNextId]: {
//     mpgId: carNextId++,
//     miles_pg: 15,
//     gallons: 18,
//     miles: 140,
//     car: 'Ford Mustang',
//   },
// };

//POST
app.post('/mpg', (request, response) => {
  const parameters = [
    request.body.mpgId,
    request.body.miles_pg,
    request.body.gallons,
    request.body.miles,
    request.body.car
  ];

  const query = 'INSERT INTO mpg(mpgID, miles_pg, gallons, miles, car) VALUES (?, ?, ?, ?, ?)';
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
        results: 'It worked!',
      });
    }
  });
});

//DELETE
app.delete('/mpg/:mpgId', (request, response) => {
  const parameter = request.params.mpgId;

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

app.post('/mpg', (request, response) => {
  const parameters = [
    request.body.mpgId,
    request.body.miles_pg,
    request.body.gallons,
    request.body.car,
  ];

  const query =
    'INSERT INTO mpg(mpgId, miles_pg, gallons, miles, car) VALUES (?, ?, ?, ?, ?)';
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

//GET
app.get('/mpg/:mpgId', (request, response) => {
  const parameters = request.params.mpgId;

  const query = 'SELECT * FROM mpg WHERE mpgId = ?';
  connection.query(query, parameters, (error, rows) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      const data = rows.map(rowToMemory);
      response.json({
        ok: true,
        results: rows.map(rowToMemory),
      });
    }
  });
});
