const express = require('express');
const app = express();
const db = require('./database');
const cors = require('cors');
require("dotenv").config();

app.use(cors({
  origin: "http://localhost:5173"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/user");
app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
    db();
  });

