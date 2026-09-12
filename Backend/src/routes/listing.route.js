import express from "express";
const router = express.Router();
import Listing from "../models/listing.model.js";
import wrapAsync from "../utils/wrapAsync.js";
import * as listingController from "../controllers/listings.controller.js";
import { isLoggedIn, isOwner, validateListing } from "../middlewares/middleware.js";

import multer from "multer";
import { storage } from "../config/cloudConfig.js";
// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage });

// INDEX Route - get
// Create Route - post
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.createListing),
  );
  // .post(upload.single("listing[image]"), (req, res) => {
  //   res.send(req.file);
  // });

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// SHOW Route - get
// Update Route - put
// Delete Route - delete
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

export default router;
