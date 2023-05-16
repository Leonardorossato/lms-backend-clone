const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoConnection = require("./config/mongo.config");
require("dotenv").config();
const PORT = process.env.PORT;
const userRouter = require("./routes/user.router");
const authRouter = require("./routes/auth.router");
const adminRouter = require("./routes/admin.router");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

app.listen(mongoConnection);
app.listen(PORT, () => {
  console.log(`Server is running at port: http://localhost:${PORT}`);
});
