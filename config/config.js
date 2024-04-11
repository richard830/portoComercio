const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}


const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue) {
    return stringValue;
});

const databaseConfig = {
   // 'host': 'localhost',
    //'port': 5432,
    //'database': 'portocomercio',
    //'user': 'postgres',
    //'password': '12345'

      'host': 'cb4l59cdg4fg1k.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
      'port': 5432,
      'database': 'd9amegu3taci9b',
      'user': 'uekcp4knocn67k',
      'password': 'pe09eef409e0d26397fb2cecf7f61ce800d64e76b125c85a0ff2dbc3309bb9d48', 
       ssl: true,
       dialect: 'postgres',
      dialectOptions: {
      "ssl": {"require":true }
      },

     /* rejectUnauthorized: false,
        requestCert: true,
        agent: false   */


};

const db = pgp(databaseConfig);
module.exports = db;
