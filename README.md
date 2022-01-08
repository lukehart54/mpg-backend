# MPG Database

This database is intended to show information about vehicles, including the name of the car, how many miles driven, how many gallons filled, and most importantly the MPG of the vehicle.

# Curl Commands:
I have been having issues getting my database running again on my domain after an error with my digital ocean VM caused me to switch to google cloud. However, if you download the files and run on your local machine it will work fine.

## GET
In the terminal type ```curl http://localhost:5001/mpg/(number)``` to get the information about the car that has the ID you entered for the number.

## ALL
In the terminal type ```curl http://localhost:5001/all``` to get the information about all of the cars in the database.

## POST/INSERT
In the terminal type 
```
  curl --header 'Content-Type: application/json' \
  --data '{"miles_pg": #, "gallons": #, "miles": #, "name": "{Car name here}"}' \
  http://localhost:5001/mpg
  ```
  
  ## DELETE
  To delete a vehicle type
  ```
  curl --request DELETE \
  http://localhost:5001/mpg/{mpgId}
  ```
  ## PATCH/UPDATE
  ```
  curl --header 'Content-Type: application/json' \
  --request PATCH \
  --data '{"miles_pg": #, "gallons": #, "miles": #, "name": "{Car name here}"}' \
  http://localhost:5001/mpg/{mpgId}
  ```
  
  



