'use strict';
//https://medium.com/dailyjs/how-to-build-a-node-js-api-using-postgres-lambda-and-api-gateway-3211a4570cea

const Pool = require('pg-pool'); //require in pg-pool packages
const config = require('./config.json');
const {host, database, table, user, password, port, idleTimeoutMillis} = config; //object destructuring
const Client = new Pool ({ //creating template
  host,
  database,
  user,
  password,
  port,
  idleTimeoutMillis : 1000
});


module.exports.post = (event, context, callback) => {
  console.log("hello", event.body);
  let {name, job, date} = JSON.parse(event.body);
  console.log(name, job, date);

  let addMovies = "INSERT INTO " + table + " VALUES(default, $1, $2, $3)"

  console.log("Event", event); //event.body
  Client.connect() //connect to database
    .then(client => {
      console.log('connected to DB ' + Client.options.database + ' ready to POST')
      client.release();
      return client.query(addMovies, [name, job, date]);
    })
    .then(res => {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(res)
      }
      callback(null, response);
    })
    .catch(err => {
      console.log(err.stack);
      const response = {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(err.stack)
      }
      callback(null, response);
    })
};
