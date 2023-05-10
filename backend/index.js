const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");
const File = require("./model/fileSchema");

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Mongo URI
const mongouri = "mongodb://localhost:27017/fileUploadTest";

//Connecting to the database

const conn = mongoose.createConnection(mongouri);

mongoose
  .connect(mongouri)
  .then(() => console.log("Connected successfully"))
  .catch((error) => console.log("Failed to connect", error));

//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};

//Calling the "multer" Function
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

app.use(express.static(path.join(__dirname, "../ims-client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../ims-client/build"));
});

// app.get("/", (req, res) => {
//   res.render("index");
// });

// @route POST /upload
// @desc Uploads file to DB

app.post("/api/upload", upload.single("file"), async (req, res) => {
  // console.log(req.file);

  try {
    const payload = JSON.parse(req.body.payload);
    console.log(payload);
    const newFile = await File.create({
      name: req.file.filename,
      payload: payload,
    });
    res.status(200).json({
      status: "success",
      message: "File created successfully!!",
      //   payload: req.body.payload,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

app.get("/api/getFiles", async (req, res) => {
  try {
    const files = await File.find();
    console.log(files);
    res.status(200).json({
      status: "success",
      files,
    });
  } catch (error) {
    res.json({
      status: "Fail",
      error,
    });
  }
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
