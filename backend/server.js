import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import cookieParser from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";
import sqlstring from "sqlstring";
const app = express();
const port = 4300;
const FRONTENDHOST = process.env.FRONTENDHOST;
const JWTSECRET = process.env.JWTSECRET;
const DB_PASS = process.env.DB_PASS;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: FRONTENDHOST, credentials: true }));
app.use(cookieParser());

console.log("frontendhost:", FRONTENDHOST);
console.log("JWTSECRET:", JWTSECRET);
console.log("DB_PASS: ", DB_PASS);

class HabitManager {
  constructor() {
    this.db = mysql.createConnection({
      host: "healthifyme-healthifyme.e.aivencloud.com",
      port: "28091",
      user: "avnadmin",
      password: DB_PASS,
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
        JWTSECRET,
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

  newComment(text) {
    const sanitizedInput = sqlstring.escape(text);
    console.log(sanitizedInput);
    let response = this.__query(
      "INSERT INTO comments(text) VALUES (" + sanitizedInput + ")"
    );
  }
}

const habitmanager = new HabitManager();

app.get("/isLoggedin", (req, res) => {
  let token = req.cookies.token;
  if (!token) {
    token = req.query.token;
  }
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, JWTSECRET);
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
    maxAge: 1000 * 60 * 60 * 10, // expire after 10 hours
    httpOnly: true, // Cookie will not be exposed to client side code
    sameSite: "None", // If client and server origins are different
    secure: true, // care about https
  };

  let token;
  token = habitmanager.grantLogin(req.body);
  if (token != false) {
    // console.log("access granted for " + req.body.user);
    res.cookie("token", token, options);
    res.header("X-bearer-token", token).status(200).send(token);
  } else {
    console.log("access forbidden");
    res.status(401).send();
  }
});

app.get("logout", (req, res) => {
  let options = {
    maxAge: 0, // expire after 10 hours
    httpOnly: true, // Cookie will not be exposed to client side code
    sameSite: "None", // If client and server origins are different
    secure: true, // care about https
  };
  res.cookie("token", "invalid", options);
  res.status(200).send();
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
