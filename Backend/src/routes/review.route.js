import express from "express";
const router = express.Router({ mergeParams: true });
import wrapAsync from "../utils/wrapAsync.js";
import * as reviewController from "../controllers/reviews.controller.js";
import { isLoggedIn, isReviewAuthor, validateReview } from "../middlewares/middleware.js";
import Review from "../models/review.model.js";

// Review Post Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview),
);

// Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview),
);

export default router;
