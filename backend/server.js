import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import cookieParser from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";
import sqlstring from "sqlstring";
const app = express();
const port = 4300;
const frontend = "healthifyme-red.vercel.app";
const jwtsecret = "secretkeyappearshere"; //hardcoded for the exam, isnt any good for a real product, i would rather fetch that from an environment file upon CI/CD

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: frontend, credentials: true }));
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
      host: "healthifyme-healthifyme.e.aivencloud.com",
      port: "28091",
      user: "avnadmin",
      password: process.env.DB_PASS,
      database: "defaultdb",
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
    await this.db.then((db) => {
      try {
        db.connect();
        console.log("connected to database...");
      } catch (err) {
        console.error(err);
      }
    });
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
    if (credentials.user == "florian" && credentials.password == "password") {
      const token = jsonwebtoken.sign(
        {
          user: credentials.user,
        },
        jwtsecret,
        { expiresIn: "24h" }
      );
      return token;
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
    const sanitizedInput = sqlstring.escape(text);
    console.log(sanitizedInput);
    let response = this.__query(
      "INSERT INTO comments(text) VALUES (" + sanitizedInput + ")"
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

// app.delete("/customer/:ID", (req, res) => {
//   let response = customermanager.delete(req.params["ID"]);
//   response.then((value) => res.status(200).send(value.rows));
// });

const habitmanager = new HabitManager();

app.get("/isLoggedin", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, jwtsecret);
      if (decodedToken.user == "florian") {
        console.log("your are authed as", decodedToken.user);
        res.status(200).send("is logged in");
        return;
      }
    } catch ({ name, message }) {
      if (name == "TokenExpiredError") {
        console.log("user has been logged in, but token expired");
      }
    }
  }
  console.log("your are not authed");
  res.status(401).send("not logged in");
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

  let token;
  token = habitmanager.grantLogin(req.body);
  if (token != false) {
    // console.log("access granted for " + req.body.user);
    res.cookie("token", token, options);
    res.status(200).send("Cookie has been set!");
  } else {
    console.log("access forbidden");
    res.status(401).send();
  }
});

app.get("/comments", (req, res) => {
  let response = habitmanager.getAllComments;
  response.then((rows) => res.status(200).send(rows));
});

app.post("/comments", (req, res) => {
  const comment = req.body.text;
  if (comment.length > 500) {
    console.log(
      "posted comment is too long: ",
      comment.length,
      " chars, while 500 allowed"
    );
    res.status(413).send("Payload too large");
  }

  let response = habitmanager.newComment(req.body.text);
  res.status(201);
});

app.get("/time", (req, res) => {
  let response = habitmanager.getTime;
  response.then((rows) => res.status(200).send(rows[0]["NOW()"]));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
