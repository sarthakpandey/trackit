const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const passport = require("./config/passport");
const authRouter = require("./routes/api/authRouter");
const userRouter = require("./routes/api/userRouter");
const profileRouter = require("./routes/api/profileRouter");

const app = express();

const keys = require("./config/keys");

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => {
    console.log("Database not connected");

    console.error(err);
  });

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    unset: "destroy",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: "nahi bataunga main"
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
