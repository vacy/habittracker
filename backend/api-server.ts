import express from 'express';

const app = express();
const port = 4300;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'jfh',
  socketPath: '/run/user/1000/akonadi/mysql.socket',
  database: 'habittracker-dev',
});

db.connect((err: any) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

app.get('/habits', (req, res): void => {
  db.query('SELECT ID FROM Habit', (err: any, rows: any, fields: any) => {
    if (err) throw err;
    console.log('The content is: ', rows);
    res.send(rows);
  });
});

app.get('/habit/:ID', (req, res): void => {
  const ID: number = req.params['ID'] as unknown as number;
  db.query(
    'SELECT * FROM Habit WHERE ID=' + ID,
    (err: any, rows: any, fields: any) => {
      if (err) throw err;
      console.log('The content is: ', rows);
      res.send(rows);
    }
  );
});

app.post('/habit', (req, res) => {
  console.log(req.body.title);
  const title: string = req.body.title as string;
  console.log(title);
  res.send('Create a new habit:' + title);
});

app.put('/habit/:ID', (req, res): void => {
  const ID: number = req.params['ID'] as unknown as number;
  db.query(
    'SELECT * FROM Habit WHERE ID=' + ID,
    (err: any, rows: any, fields: any) => {
      if (err) throw err;
      console.log('The content is: ', rows);
      res.send(rows);
    }
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
