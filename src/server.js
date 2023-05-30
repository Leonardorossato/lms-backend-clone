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
const tutorialCategoryRouter = require("./routes/tutorial.category.router");
const tutorialRouter = require("./routes/tutorial.router");
const newLettersRouter = require("./routes/news.letter.router");
const reviewRouter = require("./routes/review.router");
const contactRouter = require("./routes/contact.router");
const videoRouter = require("./routes/video.router");
const documentRouter = require("./routes/document.router");
const documentCategoryRouter = require("./routes/document.caterory.router");
const blogRouter = require("./routes/blog.router");
const passportStrategy = require("./strategy/passport.strategy");

app.use(express.json());
app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(
    `<a href="http://localhost:${PORT}/google">Login with Google Account</a>`
  );
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
app.use("/api/tutorial-category", tutorialCategoryRouter);
app.use("/api/tutorial", tutorialRouter);
app.use("/api/newsletters", newLettersRouter);
app.use("/api/review", reviewRouter);
app.use("/api/contact", contactRouter);
app.use("/api/video", videoRouter);
app.use("/api/document", documentRouter);
app.use("/api/document-category", documentCategoryRouter);
app.use("/api/blog", blogRouter);
app.use("/", googleRouter);

app.listen(mongoConnection);
app.listen(PORT, () => {
  console.log(`Server is running at port: http://localhost:${PORT}`);
});
