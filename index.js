const express = require('express');
const app = express();
const request = require('https');
const fs = require('fs');
const mysql = require('mysql');
app.use(express.json());


const credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
const connection = mysql.createConnection(credentials);

app.use((request, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

connection.connect((error) => {
  if (error) {
    console.error("error");
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

app.patch('/memories/:mpgId', (request, response) => {

    const parameters = [
      request.body.miles_pg,
      request.body.gallons,
      request.body.miles,
      request.body.car,
      parseInt(request.params.mpgId),
    ];

  const query =
    'UPDATE mpg SET miles_pg = ?, gallons = ?, miles = ?, car = ? WHERE id = ?';
  connection.query(query, parameters, (error, result) => {
    if (error) {
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
  if (
    request.body.hasOwnProperty('miles_pg') &&
    request.body.hasOwnProperty('gallons') &&
    request.body.hasOwnProperty('miles') &&
    request.body.hasOwnProperty('car')
  ) {
    const parameters = [
      request.body.miles_pg,
      request.body.gallons,
      request.body.miles,
      request.body.car,
    ];

    const query =
      'INSERT INTO mpg(miles_pg, gallons, miles, car) VALUES (?, ?, ?, ?)';
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
          results: result.insertId,
        });
      }
    });
  } else {
    response.status(400);
    response.json({
      ok: false,
      results: 'Incomplete mpg info.',
    });
  }
});

//ALL info
app.get('/all', (request, response) => {
  const query = 'SELECT * FROM mpg WHERE mpgId >= 0';
  connection.query(query, (error, rows) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      const info = rows.map(rowToMemory);
      response.json({
        ok: true,
        results: rows.map(rowToMemory),
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

app.get('/report.html', (req, res) => {
  res.sendFile(__dirname + '/report.html');
});

const port = 5001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
