const express = require("express");
const path = require('path');
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const joinNowUsersRoute = require("./routes/joinNowUsers");
const donateRoute = require("./routes/donate");
const contactUsRoute = require("./routes/contactUs");

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "build")));

app.use("/", userRoute);
app.use("/", authRoute);
app.use("/", joinNowUsersRoute);
app.use("/", donateRoute);
app.use("/", contactUsRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to the MongoDB database");
  })
  .catch((err) => {
    console.error("Error while connecting to the database", err);
  });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
