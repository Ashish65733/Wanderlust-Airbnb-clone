import MongoStore from "connect-mongo";
import config from "./config.js";

const store = MongoStore.create({
  mongoUrl: config.MONGO_URI,
  crypto: { secret: config.SECRET },
  touchAfter: 24 * 3600,
});

export const sessionOptions = {
  store,
  secret: config.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};