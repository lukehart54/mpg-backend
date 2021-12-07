DROP TABLE IF EXISTS mpg;

CREATE TABLE mpg (
  mpgId SERIAL PRIMARY KEY,
  miles_pg INT,
  gallons INT,
  miles INT,
  car TEXT
);

INSERT INTO mpg(mpgId, miles_pg, gallons, miles, car)
VALUES (1, 30, 10, 300, "Honda Civic");