import session from "express-session";
import MongoStore from "connect-mongo";

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  }
});

export default sessionConfig;