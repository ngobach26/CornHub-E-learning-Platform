const express = require('express');
const app = express();
const db = require('./database');
const path = require('path')
const cors = require('cors');
require("dotenv").config();

app.use(cors({
  origin: "http://localhost:5173"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRouter = require("./routes/Auth")
app.use("/api/auth", authRouter);

const courseRouter = require("./routes/Instructor")
app.use("/api/instructor", courseRouter);

const userRouter = require("./routes/User")
app.use("/api/user", userRouter);

const cartRouter = require("./routes/Cart")
app.use("/api/cart", cartRouter);

const searchRouter = require("./routes/Search")
app.use("/api/course", searchRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
    db();
  });
