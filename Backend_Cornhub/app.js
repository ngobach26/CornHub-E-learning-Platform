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

const authRouter = require("./routes/Auth")
app.use("/api/auth", authRouter);

const courseRouter = require("./routes/Instructor")
app.use("/api/instructor", courseRouter);

const userRouter = require("./routes/User")
app.use("/api/user", userRouter);

const cartRouter = require("./routes/Cart")
app.use("/api/cart", cartRouter);

const adminRouter = require("./routes/Admin")
app.use("/api/admin", adminRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
    db();
  });
