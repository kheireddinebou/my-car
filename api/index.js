const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const carRouter = require("./routes/car");

const port = process.env.PORT;

app.use(cors());

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB_CONNECTED"))
  .catch(err => console.log(err));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/car", carRouter);

app.listen(port, () => {
  console.log(`app is reninig on http://localhost:${port}`);
});
