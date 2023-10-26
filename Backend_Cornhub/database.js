const mongoose = require("mongoose");

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from database");
});


module.exports = async function connectMongoDb() {
  try {
    mongoose.connect(process.env.DATABASE_PORT, {
      useNewUrlParser: true, useUnifiedTopology: true
    })
  } catch (err) {
    console.log(err);
  }
};
