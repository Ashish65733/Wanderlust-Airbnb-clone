if (process.env.NODE_ENV !== "production") {
  import("dotenv").then((dotenv) => {
    dotenv.config();
  });
}

import express from "express";
const app = express();

import mongoose from "mongoose";

import path from "path";
import methodOverride from "method-override";

import ExpressError from "./utils/ExpressError.js";
import session from "express-session";

import MongoStore from "connect-mongo";

import flash from "connect-flash";
import passport from "passport";
import LocalStrategy from "passport-local";

import User from "./models/user.model.js";
import listingRouter from "./routes/listing.route.js";
import reviewRouter from "./routes/review.route.js";
import userRouter from "./routes/user.route.js";
import { fileURLToPath } from 'url';
import config from "./config/config.js";
import { sessionOptions } from "./config/sessionConfig.js";
import configurePassport from "./config/passportConfig.js";

import { notFoundHandler, globalErrorHandler } from "./middlewares/errorHandler.js"

// Reconstruct __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(session(sessionOptions));
app.use(flash());

configurePassport(app);

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "fakeuser@example.com",
//     username: "fakeuser",
//   });
//   let registeredUser = await User.register(fakeUser, "fakepassword");
//   console.log(registeredUser);
//   res.send("Demo user created successfully");
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title : "My New Villa",
//         description : "By the beach",
//         price: 1200,
//         location : "Calangute, Goa",
//         country : "India"
//     });

//     await sampleListing.save();
//     console.log("sample was saved to database");
//     res.send("Listing saved successfully");
// });

// app.all("/:path(*)", (req, res, next) => { // Since I'm on Express 5.2.1, It not working (path-to-regexp v6).
//   next(new ExpressError(404, "Page Not Found!"));
// });

app.get("/", (req, res) => {
  res.send("Hi, i'm root");
});

app.use(notFoundHandler);
app.use(globalErrorHandler);


export default app;


