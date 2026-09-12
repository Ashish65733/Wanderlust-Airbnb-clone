import ExpressError from "../utils/ExpressError.js";

// Middleware to catch 404 errors (Route not found)
export const notFoundHandler = (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
};

// Global Error Handler to render the error page
export const globalErrorHandler = (err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
};