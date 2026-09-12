import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/user.model.js";

const configurePassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure the local strategy
  passport.use(new LocalStrategy(User.authenticate()));

  // Serialize and deserialize user instances to and from the session
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};

export default configurePassport;