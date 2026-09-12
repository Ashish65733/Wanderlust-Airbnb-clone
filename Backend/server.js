import app from "./src/app.js";
import connectDB from "./src/config/database.js";

connectDB();

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
