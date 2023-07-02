const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/verification", require("./routes/veification"));
app.use("/student", require("./routes/student"));

// No Route
app.get("*", (req, res) => {
  res.send({ Message: "No page found!" });
});

// Server and Database
app.listen(process.env.PORT || 8000, () => console.log(`Server started on port 8000`));
mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
