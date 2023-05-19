const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const mongoConnection = require("./config/mongo.config");
const mongoStore = require("connect-mongo");
require("dotenv").config();
const PORT = process.env.PORT;
const secret = process.env.SESSION_SECRET;
const userRouter = require("./routes/user.router");
const authRouter = require("./routes/auth.router");
const adminRouter = require("./routes/admin.router");
const googleRouter = require("./routes/google.router");
const passportStrategy = require("./strategy/passport.strategy");

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send(`<a href="http://localhost:7000/google">Login with Google</a>`);
});
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "my-secret",
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 12 * 60 * 60,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/", googleRouter);

app.listen(mongoConnection);
app.listen(PORT, () => {
  console.log(`Server is running at port: http://localhost:${PORT}`);
});
