const express = require('express');
const app = express();
const request = require('https');
app.use(express.json());
const fs = require('fs');
const mysql = require('mysql');

const json = fs.readFileSync('credentials.json', 'utf8');
const credentials = JSON.parse(json);

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

const connection = mysql.createConnection(credentials);
connection.connect((error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  } else {
    console.log("Success!");
  }
});


function rowToMemory(row) {
  return {
    mpgId: row.mpgId,
    miles_pg: row.miles_pg,
    gallons: row.gallons,
    miles: row.miles,
    car: row.car,
  };
}


//DELETE
app.delete('/mpg/:mpgId', (request, response) => {
  const parameter = request.params.mpgId;

  const deleteQuery = 'DELETE FROM mpg WHERE miles_pg = ?';
  connection.query(deleteQuery, parameter, (error, result) => {
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

// POST
app.post('/mpg', (request, response) => {
  const parameters = [
    request.body.mpgId,
    request.body.miles_pg,
    request.body.gallons,
    request.body.car,
  ];

  const insertQuery =
    'INSERT INTO mpg(mpgId, miles_pg, gallons, miles, car) VALUES (?, ?, ?, ?, ?)';
  connection.query(insertQuery, parameters, (error, result) => {
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

const port = 5001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
