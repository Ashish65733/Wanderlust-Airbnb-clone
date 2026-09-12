import express from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsync.js";
import passport from "passport";
import { saveRedirectUrl } from "../middlewares/middleware.js";

import * as userController from "../controllers/users.controller.js";

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

// router.get("/signup", userController.renderSignupForm);
// router.post(
//   "/signup",
//   wrapAsync(userController.signup),
// );

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login,
  );

// router.get("/login", userController.renderLoginForm);
// router.post(
//   "/login",
//   saveRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   userController.login,
// );

router.get("/logout", userController.logout);

export default router;
