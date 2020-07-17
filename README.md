# RethinkDB Backup

Simple tool to backup RethinkDB tables.

## Installation

Install dependencies:

```
npm i
```

Define environment variables with connection parameters:

```
RETHINKDB_HOST=hostname.com
RETHINKDB_PORT=29015
RETHINKDB_USER=username
RETHINKDB_PASSWORD=password
RETHINKDB_DATABASE=my_database
RETHINKDB_CERT="-----BEGIN CERTIFICATE-----\n...."
```

RETHINKDB_CERT is optional but required by most RethinkDB hosted services.

## Execution

```
node backup tablename
```

Output can easily be written to file:

```
node backup [tablename] > backup.json
```
