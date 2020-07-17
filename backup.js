'use strict';
require('dotenv').config();
const r = require('rethinkdb');

//Check params
if (process.argv.length !== 3) {
  console.error('Please, specify tablename.');
  console.error('Usage: npm start [tablename]');
  process.exit();
}

//Build configuration
const config = {
  host: process.env.RETHINKDB_HOST,
  port: process.env.RETHINKDB_PORT,
  user: process.env.RETHINKDB_USER,
  password: process.env.RETHINKDB_PASSWORD,
};

if (process.env.RETHINKDB_CERT) {
  config.ssl = {
    ca: process.env.RETHINKDB_CERT,
  };
}

//Connect
r.connect(config)
  .then(connection => {
    connection.use(process.env.RETHINKDB_DATABASE);

    //Start array
    console.log('[');

    return r
      .table(process.argv[2])
      .run(connection)
      .then(cursor => {
        let started = false;

        cursor.each(
          (err, row) => {
            //Output json to console
            if (!err) {
              if (started) {
                console.log(',');
              }
              console.log(JSON.stringify(row));
              started = true;
            } else {
              console.error(err);
              process.exit();
            }
          },
          () => {
            //Close array
            console.log(']');
            process.exit();
          }
        );
      })
      .catch(console.log);
  })
  .catch(e => {
    console.error("Can't connect with RethinkDB Server: ", e.message);
  });
