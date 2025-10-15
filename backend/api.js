import express from "express";
import mysql from "mysql2/promise";
const app = express();
const port = 4300;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// class Customer {
//   constructor({ ID = 0, name, email, created_at = "" }) {
//     this.ID = ID;
//     this.name = name;
//     this.email = email;
//     this.created_at = created_at;
//   }
// }

class HabitManager {
  constructor() {
    this.db = mysql.createConnection({
      socketPath: "/tmp/habittracker/mysql.socket",
      user: "jfh",
      database: "habittracker",
    });
    this.__connectDatabase();
    this.__query(
      "CREATE TABLE IF NOT EXISTS comments(ID SERIAL PRIMARY KEY, text VARCHAR(500), created_at TIMESTAMP DEFAULT now())"
    );
    this.__query(
      "INSERT IGNORE INTO comments(ID,text) VALUES (1,'Hallo! Schöne Seite!')"
    );

    this.getAllComments.then((msg) => {
      console.log(msg[0]);
    });
  }

  async __connectDatabase() {
    await this.db.then(
      (db) => {
        try {
          db.connect();
          console.log("connected to database...");
        } catch (err) {
          console.error(err);
        }
      }
      // db.connect(function (error, results, fields) {
      //   try {
      //     if (error) throw error;
      //     console.log("connected to mysql...");
      //   } catch (error) {
      //     console.log(error.code);
      //     console.log(error.fatal);
      //   }
      // })
    );
  }

  async __query(request) {
    console.log("//request: ", request);
    const response = await this.db.then((db) => db.query(request));
    return response[0];
  }

  get getTime() {
    let response = this.__query("SELECT NOW()", (results) => {
      return results;
    });
    return response;
  }

  get getAllComments() {
    let response = this.__query("SELECT ID,text from comments");
    return response;
  }

  //   getId(ID) {
  //     let response = this.__query(
  //       "SELECT ID,name,email,created_at from customers WHERE ID =" + ID
  //     );
  //     return response;
  //   }

  //   new(customer) {
  //     let response = this.__query(
  //       "INSERT INTO customers(name,email) VALUES ('" +
  //         customer.name +
  //         "','" +
  //         customer.email +
  //         "') RETURNING ID"
  //     );
  //     return response;
  //   }

  //   update(customer) {
  //     const query = {
  //       text: "UPDATE customers SET name = $1, email = $2 WHERE ID = $3 RETURNING *",
  //       values: [customer.name, customer.email, customer.ID],
  //     };
  //     let response = this.__query(query);
  //     return response;
  //   }

  //   delete(ID) {
  //     let response = this.__query(
  //       "DELETE FROM customers WHERE ID = " + ID + " RETURNING *"
  //     );
  //     return response;
  //   }
}

const habitmanager = new HabitManager();

// app.get("/customer/:ID", (req, res) => {
//   const customerid = req.params["ID"];
//   console.log("asking for customer: " + customerid);
//   let response = customermanager.getId(customerid);
//   response.then((value) => res.status(200).send(value.rows));
// });

// app.put("/customer/:ID", (req, res) => {
//   const customer = new Customer({
//     ID: req.params["ID"],
//     name: req.body.name,
//     email: req.body.email,
//   });

//   let response = customermanager.update(customer);
//   response.then((value) => res.status(200).send(value.rows));
// });

app.get("/comments", (req, res) => {
  let response = habitmanager.getAllComments;
  response.then((rows) => res.status(200).send(rows));
});

// app.post("/customers", (req, res) => {
//   const customer = new Customer({ name: req.body.name, email: req.body.email });
//   let response = customermanager.new(customer);
//   response.then((value) => res.status(200).send(value.rows[0].id));
// });

app.get("/time", (req, res) => {
  let response = habitmanager.getTime;
  response.then((rows) => res.status(200).send(rows[0]["NOW()"]));
});

// app.delete("/customer/:ID", (req, res) => {
//   let response = customermanager.delete(req.params["ID"]);
//   response.then((value) => res.status(200).send(value.rows));
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
