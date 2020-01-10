# Videos-API-with-Graphql-Postgres
Videos API with GraphQL, PostgreSQL, and Massive package

### Import Database
Make sure you had **postgreSQL** first. Then, type the following command and replace USERNAME with your username and DBNAME with the name of the database that you want to import the data into (i used 'videos' insteed for the name of database):

```js
psql -U USERNAME DBNAME < dbexport.pgsql
```

### Install Dependency
Make sure you have `npm` or `yarn` on your device. Type this command for `npm` install all dependecies:

```js
npm install
```

> Additonally i used `nodemon` too for server reverse

### Run
Run **index.js** file with `node`:

```js
node index.js
```

Run **index.js** file with 'nodemon':

```js
nodemon index.js
```

Additionally you can run with `npm start` on the terminal while changes the script in **package.json** like this:

```js
  "scripts": {
    "start": "nodemon index.js"
  }
```

If the server and postgreSQL was running, open the browser with URL: http://localhost:5678/graphql
