const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const payment = require("./routes/api/payment");
const clients = require("./routes/api/clients");

const app = express();

// Body Parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//Connect to Mongodb
mongoose
  .connect(db)
  .then(() => console.log("mongo db connected hooray!!!"))
  .catch(err => console.log(err));

// app.get("/", (req, res) => {
//   res.send("Hello nIhaoma");
// });

app.use(passport.initialize());

require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/payment", payment);
app.use("/api/clients", clients);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
