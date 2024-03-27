const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const multer = require("multer");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const joinNowUsersRoute = require("./routes/joinNowUsers");
const donateRoute = require("./routes/donate");
const contactUsRoute = require("./routes/contactUs");
const feedbackRoute = require("./routes/feedback");

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
app.use("/", feedbackRoute);
app.use('/images', express.static('images'))

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
}).single("myImage");
app.post("/upload-images", (req, res) => {
  upload(req, res, (err) => {
    console.log("Request file ---", req.file);
    if (!err) {
      return res.status(200).send(req.file);
    } else {
      console.error("Error during image upload:", err);
      return res.status(500).send("Error during image upload").end();
    }
  });
});

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
