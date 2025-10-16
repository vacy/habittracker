import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const port = 4300;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(cookieParser());

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

  grantLogin(credentials) {
    console.log(credentials.user);
    console.log(credentials.password);
    if (credentials.user != "god" && credentials.password != "god") {
      return true;
    } else {
      return false;
    }
  }

  get getAllComments() {
    let response = this.__query(
      "SELECT ID,text from comments ORDER BY ID DESC LIMIT 15"
    );
    return response;
  }

  //   getId(ID) {
  //     let response = this.__query(
  //       "SELECT ID,name,email,created_at from customers WHERE ID =" + ID
  //     );
  //     return response;
  //   }

  newComment(text) {
    let response = this.__query(
      "INSERT INTO comments(text) VALUES ('" + text + "')"
    );
  }

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

app.get("/isLoggedin", (req, res) => {
  const token = "abcd.123456.xyz";
  console.log(req.headers.cookie);
  if (token === req.cookies.token) {
    console.log("your are authed");
    res.status(200).send();
  } else {
    console.log("your are not authed");
    res.status(401).send();
  }
});

app.post("/login", (req, res) => {
  // Our `token` cookie will be parsed into `req.cookies.token`
  console.log("🍪", req.cookies);

  // Configure the `token` HTTPOnly cookie
  let options = {
    maxAge: 1000 * 60 * 60 * 10, // expire after 15 minutes
    httpOnly: true, // Cookie will not be exposed to client side code
    sameSite: "none", // If client and server origins are different
    secure: true, // dont care about https
  };

  const token = "abcd.123456.xyz"; // dummy JWT token
  let response;
  response = habitmanager.grantLogin(req.body);
  if (response == true) {
    // console.log("access granted for " + req.body.user);
    res.cookie("token", token, options);
    res.status(200).send("Cookie has been set!");
  } else {
    console.log("access forbidden for god");
    res.status(401).send();
  }
});

app.get("/comments", (req, res) => {
  let response = habitmanager.getAllComments;
  response.then((rows) => res.status(200).send(rows));
});

app.post("/comments", (req, res) => {
  console.log(req.body.text);
  let response = habitmanager.newComment(req.body.text);
  res.status(201);
});

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
