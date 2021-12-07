DROP TABLE IF EXISTS mpg;

CREATE TABLE mpg (
  mpgId SERIAL PRIMARY KEY,
  miles_pg INT,
  gallons INT,
  miles INT,
  car TEXT
);