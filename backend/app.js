const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const { DB_URL } = require("./config.json");
const collectionsRouter = require("./routers/collectionsRouter");
const usersRouter = require("./routers/usersRouter");
const { checkToken } = require("./middlewares/checkToken");

const app = express();
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB connected`))
  .catch(() => console.log(`Error connecting DB`));

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes

//app.use("/collections", checkToken, collectionsRouter);
app.use("/collections", collectionsRouter);
app.use("/users", usersRouter);

app.all("*", (req, res, next) => {
  next(new Error("Route not found"));
});
app.use(function (err, req, res, next) {
  res.status(500).json({ success: false, data: err.message });
});
app.listen(3000, () => console.log("server listen on 3000"));
